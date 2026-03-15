import { useEffect, useRef } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>/\\|{}[]!?=+-_~^";

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 12;

    // Per-column state
    let numCols = 0;
    let drops: number[] = [];   // fractional row position
    let speeds: number[] = [];  // rows-per-frame (0.3–0.7)
    let chars: string[] = [];   // current character per column

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      numCols = Math.floor(canvas.width / FONT_SIZE);

      drops = Array.from({ length: numCols }, () => -(Math.random() * 60));
      speeds = Array.from({ length: numCols }, () => 0.3 + Math.random() * 0.4);
      chars = Array.from(
        { length: numCols },
        () => CHARS[Math.floor(Math.random() * CHARS.length)],
      );

      // Clear canvas to background color so fade-in starts clean
      ctx.fillStyle = "rgba(17, 24, 39, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    init();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    let animId: number;

    function draw() {
      // Fade-trail overlay — low alpha = longer trails
      ctx.fillStyle = "rgba(17, 24, 39, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      for (let col = 0; col < numCols; col++) {
        const x = col * FONT_SIZE;
        const y = Math.floor(drops[col]) * FONT_SIZE;

        if (y >= 0) {
          // Refresh char occasionally for shimmer
          if (Math.random() < 0.08) {
            chars[col] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }

          // Leading character — bright near-white amber
          ctx.fillStyle = "rgba(255, 240, 200, 0.9)";
          ctx.fillText(chars[col], x, y);
        }

        // Advance drop
        drops[col] += speeds[col];

        // Reset when stream exits bottom — random chance so they don't all reset together
        const rows = Math.ceil(canvas.height / FONT_SIZE);
        if (drops[col] > rows && Math.random() > 0.975) {
          drops[col] = -(Math.random() * 40);
          speeds[col] = 0.3 + Math.random() * 0.4;
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity: 0.18 }}
      className="pointer-events-none fixed inset-0 block"
    />
  );
}
