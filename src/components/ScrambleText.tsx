import { useState, useCallback, useRef, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const ScrambleText = ({ text, className = "", as: Tag = "span" }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationRef = useRef(0);

  // Update displayText when text prop changes
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = useCallback(() => {
    iterationRef.current = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterationRef.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iterationRef.current += 1 / 3;

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
      }
    }, 30);
  }, [text]);

  const handleMouseEnter = () => {
    scramble();
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  };

  return (
    <Tag
      className={`cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </Tag>
  );
};

export default ScrambleText;
