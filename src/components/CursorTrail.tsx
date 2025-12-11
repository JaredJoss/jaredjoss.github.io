import { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<Point[]>([]);

  useEffect(() => {
    let id = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        id: id++,
      };

      setTrail((prev) => [...prev.slice(-50), newPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up old points
    const cleanup = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 60);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <svg className="fixed inset-0 pointer-events-none z-40 w-full h-full">
      {trail.length > 1 && trail.map((point, index) => {
        if (index === 0) return null;
        
        const prevPoint = trail[index - 1];
        const opacity = (index / trail.length) * 0.3;
        const strokeWidth = 1 + (index / trail.length) * 1;
        
        return (
          <line
            key={point.id}
            x1={prevPoint.x}
            y1={prevPoint.y}
            x2={point.x}
            y2={point.y}
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth}
            strokeOpacity={opacity}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export default CursorTrail;

