import { useState, useEffect, useRef, useCallback } from "react";

interface CyclingScrambleTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const CyclingScrambleText = ({ texts, interval = 3000, className = "" }: CyclingScrambleTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleTo = useCallback((targetText: string) => {
    let iteration = 0;
    
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= targetText.length) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
        }
        setDisplayText(targetText);
      }
    }, 40);
  }, []);

  useEffect(() => {
    // Initial scramble animation on mount
    scrambleTo(texts[0]);
    
    cycleIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % texts.length;
        scrambleTo(texts[nextIndex]);
        return nextIndex;
      });
    }, interval);

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, [texts, interval, scrambleTo]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

export default CyclingScrambleText;
