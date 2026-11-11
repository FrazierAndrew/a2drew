import { useEffect, useRef } from "react";
import "./BallLanding.css";

const BIO = "andrew frazier builds software, makes music, and lives in san francisco. backend systems, small experiments & more";
const PALETTE = [
  ["#000000", "#ffffff"],
  ["#163cff", "#ffffff"],
  ["#ff3b30", "#ffffff"],
  ["#d7ff00", "#111111"],
  ["#7c3aed", "#ffffff"],
  ["#00d9ff", "#001018"],
  ["#ff6a00", "#ffffff"],
  ["#ff4fa3", "#19000c"],
];
const TAU = Math.PI * 2;
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
const font = (size) => `400 ${size}px "Helvetica Neue", Helvetica, Arial, sans-serif`;

export default function BallLanding({ onEnter }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ball = ballRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.body.classList.add("ball-landing-active");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points = 64;
    const shape = new Float32Array(points);
    const speed = new Float32Array(points);
    const pointers = new Map();
    let width, height, dpr, radius, outerRadius, fontSize, baseRadius;
    let x, y, vx = 0, vy = 0, rotation = Math.PI;
    let scale = 1, palette = 0, frame, lastTime = 0;
    let drag = null, pinch = null, pressure = null, squeezeSince = 0;
    let recovery = null;
    let particles = null, glyphs = [], horizontalScale = 1;
    let lastBounce = -1000;

    const changeColor = () => {
      palette = (palette + 1) % PALETTE.length;
      stage.style.backgroundColor = PALETTE[palette][0];
      stage.style.color = PALETTE[palette][1];
    };

    const measure = () => {
      fontSize = 26 * scale;
      radius = baseRadius * scale;
      outerRadius = radius + fontSize * 0.5;
      ctx.font = font(fontSize);
      const chars = Array.from(BIO);
      const gap = fontSize * 0.75;
      const available = TAU * radius - gap;
      const widths = chars.map((char) => ctx.measureText(char).width);
      const total = widths.reduce((sum, n) => sum + n, 0);
      horizontalScale = Math.min(1, available / total);
      const tracking = Math.max(0, (available - total * horizontalScale) / chars.length);
      let advance = gap / 2;
      glyphs = chars.map((char, i) => {
        const length = widths[i] * horizontalScale;
        const angle = (advance + length / 2) / radius;
        advance += length + tracking;
        return { char, angle };
      });
    };

    const constrain = () => {
      x = clamp(x, outerRadius, width - outerRadius);
      y = clamp(y, outerRadius, height - outerRadius);
    };

    const resize = () => {
      const oldWidth = width, oldHeight = height;
      width = stage.clientWidth;
      height = stage.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const size = Math.min(width, height * 469 / 852, height - 12);
      baseRadius = size * (width <= 700 ? 0.3125 : 0.425);
      scale = Math.min(scale, (Math.min(width, height) / 2 - 4) / (baseRadius + 13));
      measure();
      x = oldWidth ? x * width / oldWidth : width / 2;
      y = oldHeight ? y * height / oldHeight : height / 2;
      constrain();
      shape.fill(0);
      speed.fill(0);
      recovery = null;
    };

    const impact = (angle, velocity, time) => {
      const force = Math.min(radius * 0.18, Math.abs(velocity) * 0.022);
      for (let i = 0; i < points; i++) {
        const dot = Math.cos(i / points * TAU - angle);
        speed[i] -= force * Math.pow(Math.max(0, dot), 8);
        speed[i] += force * 0.18 * Math.pow(1 - Math.abs(dot), 4);
      }
      // A corner is one impact, and resting contact never flickers the palette.
      if (time - lastBounce > 90 && Math.abs(velocity) > 32) {
        changeColor();
        lastBounce = time;
      }
    };

    const pop = () => {
      particles = BIO.split(" ").map((word, i, words) => {
        const angle = rotation + i / words.length * TAU;
        return {
          word, x: x + Math.cos(angle) * radius,
          y: y + Math.sin(angle) * radius,
          vx: Math.cos(angle) * (140 + Math.random() * 160),
          vy: Math.sin(angle) * (140 + Math.random() * 160),
          angle: angle + Math.PI / 2, spin: (Math.random() - 0.5) * 3,
        };
      });
      pointers.clear();
      drag = null;
      pinch = null;
      pressure = null;
      squeezeSince = 0;
      recovery = null;
      ball.style.visibility = "hidden";
    };

    const restore = () => {
      particles = null;
      x = width / 2;
      y = height / 2;
      vx = vy = 0;
      shape.fill(0);
      speed.fill(0);
      ball.style.visibility = "visible";
    };

    const deformationAt = (angle) => {
      const sample = ((angle % TAU + TAU) % TAU) / TAU * points;
      const index = Math.floor(sample);
      const fraction = sample - index;
      return shape[index] * (1 - fraction) + shape[(index + 1) % points] * fraction;
    };

    const wallRadius = (angle) => {
      const cos = Math.cos(angle), sin = Math.sin(angle);
      const margin = fontSize * 0.5;
      return Math.min(
        cos < -0.001 ? (x - margin) / -cos : Infinity,
        cos > 0.001 ? (width - margin - x) / cos : Infinity,
        sin < -0.001 ? (y - margin) / -sin : Infinity,
        sin > 0.001 ? (height - margin - y) / sin : Infinity,
      );
    };
    const drawnRadius = (angle) => Math.min(
      radius + deformationAt(angle),
      pressure || recovery ? wallRadius(angle) : Infinity,
    );

    const draw = (time) => {
      const dt = lastTime ? Math.min(32, time - lastTime) : 0;
      lastTime = time;
      const seconds = dt / 1000;
      const step = dt / (1000 / 60);

      if (!particles && !document.hidden) {
        let settling = false;
        if (recovery) {
          const amount = clamp((time - recovery.time) / 180, 0, 1);
          const eased = 1 - Math.pow(1 - amount, 3);
          x = recovery.x + (recovery.targetX - recovery.x) * eased;
          y = recovery.y + (recovery.targetY - recovery.y) * eased;
          if (amount === 1) recovery = null;
          else settling = true;
        }
        if (!drag && !pinch && !settling && !motion.matches) {
          vy += 400 * seconds;
          x += vx * seconds;
          y += vy * seconds;
          if (x < outerRadius) {
            impact(Math.PI, vx, time);
            x = outerRadius;
            vx = Math.abs(vx) * 0.94;
          } else if (x > width - outerRadius) {
            impact(0, vx, time);
            x = width - outerRadius;
            vx = -Math.abs(vx) * 0.94;
          }
          if (y < outerRadius) {
            impact(-Math.PI / 2, vy, time);
            y = outerRadius;
            vy = Math.abs(vy) * 0.94;
          } else if (y > height - outerRadius) {
            impact(Math.PI / 2, vy, time);
            y = height - outerRadius;
            vy = Math.abs(vy) > 28 ? -Math.abs(vy) * 0.94 : 0;
            vx *= Math.pow(0.971, step);
          }
          vx *= Math.pow(0.999, step);
        }
        if (!motion.matches) rotation += seconds * TAU / 60;

        const accelerations = new Float32Array(points);
        for (let i = 0; i < points; i++) {
          const angle = i / points * TAU;
          let target = 0;
          if (pressure || recovery) target = Math.min(0, wallRadius(angle) - radius);
          const neighbors = shape[(i + points - 1) % points] + shape[(i + 1) % points] - 2 * shape[i];
          accelerations[i] = (target - shape[i]) * 0.14 + neighbors * 0.2;
        }
        for (let i = 0; i < points; i++) {
          speed[i] = (speed[i] + accelerations[i] * step) * Math.pow(0.78, step);
          shape[i] = clamp(shape[i] + speed[i] * step, -radius * 0.65, radius * 0.25);
        }
        if (squeezeSince && time - squeezeSince > 900 && !motion.matches) pop();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = PALETTE[palette][1];
      ctx.font = font(fontSize);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (particles) {
        for (const p of particles) {
          if (!document.hidden && !motion.matches) {
            p.vy += 220 * seconds;
            p.x += p.vx * seconds;
            p.y += p.vy * seconds;
            p.angle += p.spin * seconds;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillText(p.word, 0, 0);
          ctx.restore();
        }
      } else {
        for (const { char, angle: offset } of glyphs) {
          if (char === " ") continue;
          const angle = rotation + offset;
          const r = drawnRadius(angle);
          const slope = (drawnRadius(angle + 0.025) - drawnRadius(angle - 0.025)) / 0.05;
          ctx.save();
          ctx.translate(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
          ctx.rotate(angle + Math.PI / 2 - Math.atan2(slope, r));
          ctx.scale(horizontalScale, 1);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        }
      }
      ball.style.width = `${outerRadius * 2}px`;
      ball.style.height = `${outerRadius * 2}px`;
      ball.style.transform = `translate3d(${x - outerRadius}px, ${y - outerRadius}px, 0)`;
      frame = window.requestAnimationFrame(draw);
    };

    const beginDrag = (id, point) => {
      recovery = null;
      drag = { id, dx: point.x - x, dy: point.y - y,
        lastX: point.x, lastY: point.y, time: performance.now(), movedAt: 0 };
      vx = vy = 0;
    };
    const down = (event) => {
      if (event.button !== 0) return;
      ball.setPointerCapture(event.pointerId);
      const point = { x: event.clientX, y: event.clientY };
      pointers.set(event.pointerId, point);
      if (pointers.size === 1) beginDrag(event.pointerId, point);
      else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), scale };
        drag = null;
        pressure = null;
        squeezeSince = 0;
      }
    };
    const move = (event) => {
      if (!pointers.has(event.pointerId)) return;
      const point = { x: event.clientX, y: event.clientY };
      pointers.set(event.pointerId, point);
      if (pinch && pointers.size >= 2) {
        const [a, b] = [...pointers.values()];
        const maxScale = (Math.min(width, height) / 2 - 4) / (baseRadius + 13);
        scale = clamp(pinch.scale * Math.hypot(a.x - b.x, a.y - b.y) / pinch.distance, 0.4, maxScale);
        measure();
        x = (a.x + b.x) / 2;
        y = (a.y + b.y) / 2;
        constrain();
        return;
      }
      if (!drag || drag.id !== event.pointerId) return;
      const now = performance.now();
      const dt = Math.max(8, now - drag.time);
      const dx = point.x - drag.lastX, dy = point.y - drag.lastY;
      vx = clamp(dx / dt * 1000, -2400, 2400);
      vy = clamp(dy / dt * 1000, -2400, 2400);
      if (Math.hypot(dx, dy) > 0.5) drag.movedAt = now;
      const rawX = point.x - drag.dx, rawY = point.y - drag.dy;
      pressure = {
        left: Math.max(0, outerRadius - rawX),
        right: Math.max(0, rawX - (width - outerRadius)),
        top: Math.max(0, outerRadius - rawY),
        bottom: Math.max(0, rawY - (height - outerRadius)),
      };
      const pressing = Math.max(...Object.values(pressure));
      if (pressing > radius * 0.5) squeezeSince ||= now;
      else squeezeSince = 0;
      x = rawX;
      y = rawY;
      // Let the center approach a wall while its contact surface flattens.
      const compression = radius * 0.6;
      x = clamp(x, outerRadius - compression, width - outerRadius + compression);
      y = clamp(y, outerRadius - compression, height - outerRadius + compression);
      drag.lastX = point.x;
      drag.lastY = point.y;
      drag.time = now;
    };
    const release = (event) => {
      if (!pointers.delete(event.pointerId)) return;
      if (ball.hasPointerCapture(event.pointerId)) ball.releasePointerCapture(event.pointerId);
      if (pointers.size === 1) {
        const [id, point] = [...pointers.entries()][0];
        pinch = null;
        beginDrag(id, point);
      } else if (!pointers.size) {
        if (!drag || performance.now() - drag.movedAt > 100 || event.type === "pointercancel" || motion.matches) {
          vx = vy = 0;
        }
        const targetX = clamp(x, outerRadius, width - outerRadius);
        const targetY = clamp(y, outerRadius, height - outerRadius);
        if (targetX !== x || targetY !== y) {
          if (targetX > x) vx = Math.abs(vx) * 0.94;
          if (targetX < x) vx = -Math.abs(vx) * 0.94;
          if (targetY > y) vy = Math.abs(vy) * 0.94;
          if (targetY < y) vy = -Math.abs(vy) * 0.94;
          recovery = { x, y, targetX, targetY, time: performance.now() };
          if (motion.matches) {
            x = targetX;
            y = targetY;
            recovery = null;
          }
        }
        drag = pinch = pressure = null;
        squeezeSince = 0;
      }
    };
    const key = (event) => {
      const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (directions[event.key]) {
        event.preventDefault();
        const [dx, dy] = directions[event.key];
        if (motion.matches) {
          x += dx * 40;
          y += dy * 40;
          constrain();
          changeColor();
        } else {
          vx += dx * 450;
          vy += dy * 450;
        }
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        changeColor();
        if (!motion.matches) vy = -520;
      }
    };
    const stageDown = (event) => {
      if (particles && !event.target.closest(".click-me")) restore();
    };
    const visibility = () => { lastTime = 0; };

    resize();
    frame = window.requestAnimationFrame(draw);
    ball.addEventListener("pointerdown", down);
    ball.addEventListener("pointermove", move);
    ball.addEventListener("pointerup", release);
    ball.addEventListener("pointercancel", release);
    ball.addEventListener("lostpointercapture", release);
    ball.addEventListener("keydown", key);
    stage.addEventListener("pointerdown", stageDown);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.cancelAnimationFrame(frame);
      ball.removeEventListener("pointerdown", down);
      ball.removeEventListener("pointermove", move);
      ball.removeEventListener("pointerup", release);
      ball.removeEventListener("pointercancel", release);
      ball.removeEventListener("lostpointercapture", release);
      ball.removeEventListener("keydown", key);
      stage.removeEventListener("pointerdown", stageDown);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      document.body.classList.remove("ball-landing-active");
    };
  }, []);

  return (
    <main className="ball-landing" ref={stageRef} aria-label="Andrew Frazier home">
      <canvas ref={canvasRef} aria-hidden="true" />
      <button className="ball-hit-area" ref={ballRef} type="button"
        aria-label={BIO} aria-describedby="ball-instructions" />
      <p id="ball-instructions" className="ball-instructions">
        Drag and throw the circle. Its bounces change the background color.
        Use arrow keys to move it, or Space to bounce and change color.
        Choose click me to enter Andrew’s original website.
      </p>
      <button className="click-me" type="button" onClick={onEnter}>click me</button>
    </main>
  );
}
