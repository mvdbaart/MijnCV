import React, { useState, useEffect } from "react";

const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(251,191,36,0.04), transparent 70%)`,
      }}
    />
  );
};

export default CursorSpotlight;
