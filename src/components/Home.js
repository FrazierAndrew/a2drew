import React, { useEffect, useRef, useState } from 'react';

function Home() {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [characters, setCharacters] = useState([]);

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
    const NUM_TURTLES = 14; // Reduced from 20 to 14 (removing 6)

    const rand = (min, max) => Math.random() * (max - min) + min;

    // Create turtles
    const initial = Array.from({ length: NUM_TURTLES }).map(() => ({
      x: rand(0, Math.max(1, bounds.width - SIZE)),
      y: rand(0, Math.max(1, bounds.height - SIZE)),
      vx: rand(-1.5, 1.5) || 0.8,
      vy: rand(-1.5, 1.5) || -0.8,
      r: rand(0, 360),
      type: 'turtle'
    }));
    let charactersState = initial;
    setCharacters(charactersState);

    let rafId;
    const step = () => {
      charactersState = charactersState.map(char => {
        let { x, y, vx, vy, r, type } = char;
        
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
        return { x, y, vx, vy, r, type };
      });

      setCharacters(charactersState);
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
        background: 'transparent',
      }}
    >
      {characters.map((char, idx) => (
        <span
          key={idx}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(${char.x}px, ${char.y}px) rotate(${char.r}deg)`,
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