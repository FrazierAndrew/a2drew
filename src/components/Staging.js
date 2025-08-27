import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StagingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: radial-gradient(1200px 800px at 50% 0%, #0f1220, #090b14 60%, #05060d);
  @media (max-width: 767px) { padding: 10px; }
`;

const StagingContent = styled.div`
  width: 100%;
  max-width: 960px;
  background: rgba(10, 12, 20, 0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35), inset 0 0 80px rgba(0,255,255,0.04);
  overflow: hidden;
  backdrop-filter: blur(6px);
`;

const Header = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  color: #d5e6ff; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  h2 { margin: 0; font-weight: 700; font-size: 1.1rem; letter-spacing: .5px; }
  .meta { display: flex; gap: 12px; font-size: .95rem; opacity: .9; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #00e0ff; box-shadow: 0 0 12px #00e0ff; margin-right: 8px; display: inline-block; }
`;

const Controls = styled.div`
  display: flex; align-items: center; gap: 10px;
  button {
    background: linear-gradient(180deg, #1a2136, #12182a);
    color: #e6f0ff; border: 1px solid rgba(255,255,255,0.12);
    padding: 8px 14px; border-radius: 10px; cursor: pointer;
    font-weight: 600; letter-spacing: .3px;
    box-shadow: 0 6px 18px rgba(0,0,0,.25);
    transition: transform .08s ease, box-shadow .2s ease, border .2s ease;
  }
  button:hover { transform: translateY(-1px); border-color: rgba(0,224,255,.5); box-shadow: 0 10px 24px rgba(0,224,255,.08); }
  button.secondary { opacity: .85 }
`;

const CanvasWrap = styled.div`
  position: relative; width: 100%;
  aspect-ratio: 16 / 9;
  background: radial-gradient(800px 480px at 50% 30%, rgba(0, 238, 255, .06), transparent 50%),
              radial-gradient(1000px 600px at 20% 80%, rgba(255, 0, 153, .05), transparent 50%);
  canvas { display: block; width: 100%; height: 100%; }
`;

const Overlay = styled.div`
  position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none;
  .panel {
    pointer-events: auto;
    background: rgba(5,8,16,0.72);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 16px;
    padding: 22px 24px; text-align: center; color: #e8f4ff;
    box-shadow: 0 10px 30px rgba(0,0,0,.35), inset 0 0 120px rgba(0,224,255,0.04);
  }
  h3 { margin: 0 0 6px 0; font-size: 1.3rem; }
  p { margin: 6px 0 14px 0; opacity: .9 }
  .kbd { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #101524; border: 1px solid rgba(255,255,255,.12); padding: 2px 6px; border-radius: 6px; }
  .btn {
    display: inline-block; margin-top: 6px; background: linear-gradient(180deg,#00e0ff,#00b0cc);
    color: #001018; font-weight: 800; letter-spacing: .3px;
    padding: 10px 16px; border-radius: 12px; cursor: pointer; border: none;
    box-shadow: 0 10px 22px rgba(0,224,255,.25);
    transition: transform .06s ease;
  }
  .btn:active { transform: translateY(1px); }
`;

function Staging() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('neon-dodge-best') || 0));
  const [dead, setDead] = useState(false);

  // Resize canvas to device pixels for crispness
  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas.parentElement);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // --- Game state ---
    const keys = new Set();
    const player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: Math.max(12, canvas.width * 0.008),
      vx: 0, vy: 0, speed: Math.max(2.2, canvas.width * 0.0022),
      trail: []
    };
    let asteroids = [];
    let particles = [];
    let orbs = [];
    let last = performance.now();
    let t = 0;
    let spawnTimer = 0;
    let orbTimer = 0;
    let alive = true;
    let scoreLocal = 0;
    let difficulty = 1;

    const onKey = (e, down) => {
      const k = e.key.toLowerCase();
      if (['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' '].includes(k)) {
        e.preventDefault();
      }
      if (down) keys.add(k); else keys.delete(k);
    };
    window.addEventListener('keydown', e => onKey(e, true));
    window.addEventListener('keyup',   e => onKey(e, false));

    const rand = (a,b)=> a + Math.random()*(b-a);
    const addAsteroid = () => {
      const edge = Math.floor(Math.random()*4);
      const pad = 40;
      let x,y,angle;
      if (edge===0){ x=rand(-pad, 0); y=rand(0, canvas.height); angle=rand(-.2,.2); }
      else if (edge===1){ x=rand(canvas.width, canvas.width+pad); y=rand(0,canvas.height); angle=Math.PI+rand(-.2,.2); }
      else if (edge===2){ x=rand(0,canvas.width); y=rand(-pad, 0); angle=Math.PI/2+rand(-.2,.2); }
      else { x=rand(0,canvas.width); y=rand(canvas.height, canvas.height+pad); angle=-Math.PI/2+rand(-.2,.2); }
      const speed = rand(1.2, 2.6) * Math.min(2.3, 0.8 + difficulty*0.12);
      const r = rand(10, 22) * (1 + Math.min(difficulty*0.06, 0.8));
      const hue = Math.floor(rand(180, 320));
      asteroids.push({ x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, r, hue });
    };

    const addParticles = (x,y, count=8, hue=200) => {
      for (let i=0;i<count;i++){
        const a = rand(0, Math.PI*2);
        const sp = rand(.5, 2.2);
        particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp, life: rand(20,40), hue});
      }
    };

    const addOrb = () => {
      orbs.push({ x: rand(canvas.width*0.1, canvas.width*0.9),
                  y: rand(canvas.height*0.15, canvas.height*0.85),
                  r: Math.max(8, canvas.width*0.006),
                  hue: 180 + (t/10)%120 });
    };

    const collide = (a,b) => {
      const dx=a.x-b.x, dy=a.y-b.y, rr=(a.r+b.r); return dx*dx+dy*dy < rr*rr;
    };

    const update = (dt) => {
      t += dt;
      spawnTimer += dt;
      orbTimer += dt;
      difficulty = 1 + Math.min(5, t/10);
      scoreLocal += dt * (0.8 + difficulty*0.2);
      setScore(Math.floor(scoreLocal));

      // Input
      let ax=0, ay=0;
      if (keys.has('arrowleft')||keys.has('a')) ax -= 1;
      if (keys.has('arrowright')||keys.has('d')) ax += 1;
      if (keys.has('arrowup')||keys.has('w')) ay -= 1;
      if (keys.has('arrowdown')||keys.has('s')) ay += 1;
      const len = Math.hypot(ax,ay) || 1;
      player.vx += (ax/len) * player.speed * 0.6;
      player.vy += (ay/len) * player.speed * 0.6;
      // Friction
      player.vx *= 0.90; player.vy *= 0.90;

      player.x += player.vx;
      player.y += player.vy;
      // Screen clamp with soft bounce
      const margin = player.r;
      if (player.x < margin){ player.x=margin; player.vx*=-0.6; }
      if (player.x > canvas.width-margin){ player.x=canvas.width-margin; player.vx*=-0.6; }
      if (player.y < margin){ player.y=margin; player.vy*=-0.6; }
      if (player.y > canvas.height-margin){ player.y=canvas.height-margin; player.vy*=-0.6; }

      // Trail
      player.trail.push({x:player.x, y:player.y});
      if (player.trail.length > 18) player.trail.shift();

      // Spawns
      const spawnEvery = Math.max(220 - difficulty*20, 60);
      if (spawnTimer > spawnEvery){ spawnTimer = 0; for (let i=0;i<Math.ceil(difficulty);i++) addAsteroid(); }
      if (orbTimer > Math.max(2000 - difficulty*150, 800)){ orbTimer = 0; addOrb(); }

      // Asteroids
      asteroids.forEach(a => { a.x += a.vx; a.y += a.vy; });
      asteroids = asteroids.filter(a => a.x>-80 && a.x<canvas.width+80 && a.y>-80 && a.y<canvas.height+80);

      // Particles
      particles.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vx*=0.98; p.vy*=0.98; p.life--; });
      particles = particles.filter(p => p.life>0);

      // Orbs + collisions
      for (let i=orbs.length-1;i>=0;i--){
        const o = orbs[i];
        if (collide(player,o)){
          orbs.splice(i,1);
          scoreLocal += 50;
          addParticles(o.x, o.y, 18, 190+((t*2)%80));
        }
      }
      for (let i=0;i<asteroids.length;i++){
        if (collide(player, asteroids[i])){
          alive = false;
          break;
        }
      }
      if (!alive){
        setRunning(false);
        setDead(true);
        const newBest = Math.max(best, Math.floor(scoreLocal));
        setBest(newBest);
        localStorage.setItem('neon-dodge-best', String(newBest));
      }
    };

    const render = () => {
      // Clear with motion blur
      ctx.fillStyle = 'rgba(5, 8, 16, 0.35)';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      // Scanline glow
      const grad = ctx.createLinearGradient(0,0,canvas.width,0);
      grad.addColorStop(0,'rgba(0,224,255,0.05)');
      grad.addColorStop(1,'rgba(255,0,153,0.05)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,canvas.width,canvas.height);

      // Orbs
      orbs.forEach(o => {
        const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r*3);
        g.addColorStop(0, `hsla(${o.hue}, 100%, 65%, .9)`);
        g.addColorStop(1, `hsla(${o.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x,o.y,o.r*3,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = `hsla(${o.hue}, 100%, 70%, .95)`; ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2); ctx.fill();
      });

      // Asteroids
      asteroids.forEach(a => {
        ctx.shadowBlur = 20; ctx.shadowColor = `hsla(${a.hue},100%,60%,.8)`;
        ctx.strokeStyle = `hsla(${a.hue}, 100%, 60%, .9)`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,Math.PI*2); ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Player trail
      for (let i=1;i<player.trail.length;i++){
        const p0 = player.trail[i-1], p1 = player.trail[i];
        const alpha = i/player.trail.length;
        ctx.strokeStyle = `rgba(0,224,255,${alpha*0.6})`;
        ctx.lineWidth = Math.max(1, player.r*0.35*alpha);
        ctx.beginPath(); ctx.moveTo(p0.x,p0.y); ctx.lineTo(p1.x,p1.y); ctx.stroke();
      }

      // Player
      ctx.fillStyle = 'rgba(0, 224, 255, 0.16)';
      ctx.beginPath(); ctx.arc(player.x, player.y, player.r*2.2, 0, Math.PI*2); ctx.fill();

      ctx.shadowBlur = 25; ctx.shadowColor = 'rgba(0,224,255,.9)';
      ctx.fillStyle = '#00e0ff';
      ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;

      // HUD
      ctx.fillStyle = 'rgba(214,235,255,.9)';
      ctx.font = `${Math.max(14, canvas.width*0.018)}px Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
      ctx.fillText(`Score ${Math.floor(score)}`, 16, 28);
      ctx.fillStyle = 'rgba(150,200,255,.75)';
      ctx.fillText(`Best ${best}`, 16, 50);
    };

    const loop = (now) => {
      const dt = Math.min(50, now - last) / 1000 * 60; // normalize (~60fps units)
      last = now;
      update(dt);
      render();
      if (!dead && running) rafRef.current = requestAnimationFrame(loop);
    };
    last = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', e => onKey(e,true));
      window.removeEventListener('keyup', e => onKey(e,false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]); // restart loop on (re)start

  const start = () => { setScore(0); setDead(false); setRunning(true); };
  const pause = () => setRunning(false);
  const resume = () => setRunning(true);
  const restart = () => start();

  return (
    <StagingContainer>
      <StagingContent>
        <Header>
          <h2><span className="dot" />⚡ Neon Dodge — Staging</h2>
          <div className="meta">
            <div>Score: {score}</div>
            <div>Best: {best}</div>
            <Controls>
              {!running && !dead && <button onClick={start}>Start</button>}
              {running && <button className="secondary" onClick={pause}>Pause</button>}
              {!running && !dead && score>0 && <button onClick={resume}>Resume</button>}
              {dead && <button onClick={restart}>Restart</button>}
            </Controls>
          </div>
        </Header>

        <CanvasWrap ref={wrapRef}>
          <canvas ref={canvasRef} />
          {!running && !dead && (
            <Overlay>
              <div className="panel">
                <h3>Welcome to Neon Dodge</h3>
                <p>Move with <span className="kbd">WASD</span> / <span className="kbd">Arrow Keys</span>. Avoid the neon asteroids. Collect glowing orbs for bonus points.</p>
                <button className="btn" onClick={start}>Start Game</button>
              </div>
            </Overlay>
          )}
          {dead && (
            <Overlay>
              <div className="panel">
                <h3>Game Over</h3>
                <p>Your score: <strong>{score}</strong> · Best: <strong>{best}</strong></p>
                <button className="btn" onClick={restart}>Play Again</button>
              </div>
            </Overlay>
          )}
        </CanvasWrap>
      </StagingContent>
    </StagingContainer>
  );
}

export default Staging;
