import { useEffect, useState } from "react";

interface NoLightModePopupProps {
  open: boolean;
  onClose: () => void;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

const NoLightModePopup = ({ open, onClose }: NoLightModePopupProps) => {
  const [displayText, setDisplayText] = useState("no no, we don't do that here.");
  const targetText = "no no, we don't do that here.";

  useEffect(() => {
    if (!open) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "," || char === "'" || char === ".") return char;
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute top-full right-0 mt-2 whitespace-nowrap">
      <p className="text-foreground font-mono text-sm">
        {displayText}
      </p>
    </div>
  );
};

export default NoLightModePopup;
