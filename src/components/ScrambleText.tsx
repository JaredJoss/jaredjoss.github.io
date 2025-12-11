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
  const hasAnimatedRef = useRef(false);
  const previousTextRef = useRef(text);

  const scramble = useCallback((isInitial = false) => {
    iterationRef.current = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Slower animation on initial load
    const speed = isInitial ? 50 : 30;
    const increment = isInitial ? 1 / 4 : 1 / 3;

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

      iterationRef.current += increment;

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
      }
    }, speed);
  }, [text]);

  // Update displayText when text prop changes - but don't scramble placeholders
  useEffect(() => {
    if (previousTextRef.current !== text && text !== "------") {
      previousTextRef.current = text;
      scramble(false);
    } else if (text === "------") {
      setDisplayText(text);
    }
  }, [text, scramble]);

  // Run scramble animation on mount (skip for placeholder text)
  useEffect(() => {
    if (!hasAnimatedRef.current && text !== "------") {
      hasAnimatedRef.current = true;
      // Add a small random delay to stagger animations
      const delay = Math.random() * 200;
      const timer = setTimeout(() => {
        scramble(true); // Pass true for slower initial animation
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [scramble, text]);

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
