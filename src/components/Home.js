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
    const NUM_TURTLES = 7; // Cut in half from 14
    const NUM_PALM_TREES = 10;

    const rand = (min, max) => Math.random() * (max - min) + min;

    // Create turtles with random positions
    const turtles = Array.from({ length: NUM_TURTLES }).map(() => {
      return {
        x: rand(0, Math.max(1, bounds.width - SIZE)),
        y: rand(0, Math.max(1, bounds.height - SIZE)),
        vx: rand(-1.5, 1.5) || 0.8,
        vy: rand(-1.5, 1.5) || -0.8,
        r: rand(0, 360),
        type: 'turtle'
      };
    });

    // Create palm trees with random positions
    const palmTrees = Array.from({ length: NUM_PALM_TREES }).map(() => {
      return {
        x: rand(0, Math.max(1, bounds.width - SIZE)),
        y: rand(0, Math.max(1, bounds.height - SIZE)),
        vx: rand(-1.5, 1.5) || 0.8,
        vy: rand(-1.5, 1.5) || -0.8,
        r: rand(0, 360),
        type: 'palm'
      };
    });

    const initial = [...turtles, ...palmTrees];
    let charactersState = initial;
    setCharacters(charactersState);

    let rafId;
    const step = () => {
      charactersState = charactersState.map((char, i) => {
        let { x, y, vx, vy, r, type } = char;
        
        // Calculate repulsive forces from all other characters
        let forceX = 0;
        let forceY = 0;
        
        charactersState.forEach((otherChar, j) => {
          if (i === j) return; // Skip self
          
          const dx = (x + SIZE/2) - (otherChar.x + SIZE/2); // Distance between centers
          const dy = (y + SIZE/2) - (otherChar.y + SIZE/2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0 && distance < 120) { // Repulsion range
            const force = 300 / (distance * distance); // Inverse square law
            const angle = Math.atan2(dy, dx);
            
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force;
          }
        });
        
        // Apply repulsive forces to velocity with damping
        vx += forceX * 0.02;
        vy += forceY * 0.02;
        
        // Apply velocity damping to prevent infinite acceleration
        vx *= 0.98;
        vy *= 0.98;
        
        // Ensure minimum movement to prevent getting stuck
        const minSpeed = 0.3;
        const currentSpeed = Math.sqrt(vx * vx + vy * vy);
        if (currentSpeed < minSpeed) {
          const angle = Math.atan2(vy, vx);
          vx = Math.cos(angle) * minSpeed;
          vy = Math.sin(angle) * minSpeed;
        }
        
        // Limit maximum speed
        const maxSpeed = 3;
        if (currentSpeed > maxSpeed) {
          vx = (vx / currentSpeed) * maxSpeed;
          vy = (vy / currentSpeed) * maxSpeed;
        }
        
        const speed = 1.0; // reduced base speed since forces provide movement
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
        height: '100vh',
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
          {char.type === 'turtle' ? '🐢' : '🌴'}
        </span>
      ))}
    </div>
  );
}

export default Home;