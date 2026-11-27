import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type Photo = {
  /** File name in public/photos without the extension. */
  file: string;
  width: number;
  height: number;
  caption: string;
  /** Real camera settings only, e.g. "400mm · f/5.6 · 1/1000s · ISO 800". Shown when set. */
  settings?: string;
};

type Box = { left: number; top: number; width: number; height: number };

const gridSrc = (p: Photo) => `/photos/grid/${p.file}.jpg`;
const fullSrc = (p: Photo) => `/photos/${p.file}.jpeg`;
const pad = (n: number) => String(n).padStart(2, "0");

// Justified rows: fill each row until its height drops to the target, then scale
// the row so it spans the full width exactly. Photos keep their aspect ratio.
function justify(photos: Photo[], width: number): { boxes: Box[]; height: number } {
  const narrow = width < 520;
  const target = narrow ? 120 : 230;
  const gap = narrow ? 6 : 8;
  const ratio = (p: Photo) => p.width / p.height;
  const boxes: Box[] = [];
  let top = 0;
  let row: number[] = [];

  const placeRow = (indices: number[], rowHeight: number) => {
    let left = 0;
    for (const i of indices) {
      const w = ratio(photos[i]) * rowHeight;
      boxes[i] = { left, top, width: w, height: rowHeight };
      left += w + gap;
    }
    top += rowHeight + gap;
  };
  const fitHeight = (indices: number[]) =>
    (width - gap * (indices.length - 1)) / indices.reduce((sum, i) => sum + ratio(photos[i]), 0);

  photos.forEach((_, i) => {
    row.push(i);
    const h = fitHeight(row);
    if (h <= target) {
      placeRow(row, h);
      row = [];
    }
  });
  // Last row: fill the width unless that would make it much taller than the others.
  if (row.length) placeRow(row, Math.min(fitHeight(row), target * 1.25));

  return { boxes, height: Math.max(0, top - gap) };
}

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

const iconButton =
  "inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border/70 bg-background/60 text-muted-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const PhotoCollage = ({ photos }: { photos: Photo[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastOpen = useRef(0);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  if (open !== null) lastOpen.current = open;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { boxes, height } = width ? justify(photos, width) : { boxes: [], height: 0 };
  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  // Preload the neighbours so the arrows feel instant in the full-size view.
  useEffect(() => {
    if (open === null) return;
    for (const d of [-1, 1]) {
      const img = new Image();
      img.src = fullSrc(photos[(open + d + photos.length) % photos.length]);
    }
  }, [open, photos]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <div ref={containerRef} className="collage relative w-full" style={{ height }}>
        {width > 0 &&
          photos.map((photo, i) => (
            <button
              key={photo.file}
              ref={(el) => (tileRefs.current[i] = el)}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open ${photo.caption}`}
              className="collage-tile absolute overflow-hidden rounded bg-card cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={boxes[i]}
            >
              <img src={gridSrc(photo)} alt={photo.caption} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <span className="collage-caption absolute left-2.5 bottom-2 right-2.5 text-left text-xs text-white">
                {photo.caption}
                {photo.settings && <span className="block text-primary">{photo.settings}</span>}
              </span>
            </button>
          ))}
      </div>
      <p className="text-muted-foreground text-xs mt-4">
        {photos.length} photos · click any photo to open it
      </p>

      <DialogPrimitive.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            ref={contentRef}
            aria-describedby={undefined}
            // Focus the view itself so no button shows a focus ring on open, and on close
            // return focus to the tile of the photo last shown.
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              contentRef.current?.focus();
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              tileRefs.current[lastOpen.current]?.focus({ preventScroll: true });
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 px-4 py-6 sm:p-10 font-mono focus:outline-none"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          >
            {current && (
              <>
                <DialogPrimitive.Title className="sr-only">{current.caption}</DialogPrimitive.Title>
                <img
                  key={current.file}
                  src={fullSrc(current)}
                  alt={current.caption}
                  className="max-w-full max-h-[calc(100dvh-9rem)] object-contain rounded"
                />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button type="button" className={iconButton} onClick={() => step(-1)} aria-label="Previous photo">
                    <Arrow dir="left" />
                  </button>
                  <div className="text-center min-w-[16ch]">
                    <span className="text-primary">{pad(open! + 1)}</span> / {pad(photos.length)}{" "}
                    <span className="text-foreground">{current.caption}</span>
                    {current.settings && <span className="block text-xs mt-1">{current.settings}</span>}
                  </div>
                  <button type="button" className={iconButton} onClick={() => step(1)} aria-label="Next photo">
                    <Arrow dir="right" />
                  </button>
                </div>
                <DialogPrimitive.Close className={`${iconButton} absolute top-4 right-4`} aria-label="Close">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </DialogPrimitive.Close>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default PhotoCollage;
