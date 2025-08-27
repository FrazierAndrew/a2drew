import React, { useEffect, useRef, useState } from 'react';

function Home() {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [turtles, setTurtles] = useState([]);

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height) return;

    const SIZE = 36; // approximate emoji box
    const NUM = 10;

    const rand = (min, max) => Math.random() * (max - min) + min;

    const initial = Array.from({ length: NUM }).map(() => ({
      x: rand(0, Math.max(1, bounds.width - SIZE)),
      y: rand(0, Math.max(1, bounds.height - SIZE)),
      vx: rand(-1.5, 1.5) || 0.8,
      vy: rand(-1.5, 1.5) || -0.8,
      r: rand(0, 360),
    }));

    let turtlesState = initial;
    setTurtles(turtlesState);

    let rafId;
    const step = () => {
      turtlesState = turtlesState.map(t => {
        let { x, y, vx, vy, r } = t;
        const speed = 1.2; // base speed multiplier
        x += vx * speed;
        y += vy * speed;

        // bounce on walls
        if (x <= 0) { x = 0; vx = Math.abs(vx); }
        if (x >= bounds.width - SIZE) { x = bounds.width - SIZE; vx = -Math.abs(vx); }
        if (y <= 0) { y = 0; vy = Math.abs(vy); }
        if (y >= bounds.height - SIZE) { y = bounds.height - SIZE; vy = -Math.abs(vy); }

        // slight rotation for fun
        r = (r + 2) % 360;
        return { x, y, vx, vy, r };
      });
      setTurtles(turtlesState);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds.width, bounds.height]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      {turtles.map((t, idx) => (
        <span
          key={idx}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg)`,
            fontSize: 28,
            lineHeight: 1,
            userSelect: 'none',
            willChange: 'transform',
          }}
          aria-hidden
        >
          🐢
        </span>
      ))}
    </div>
  );
}

export default Home;