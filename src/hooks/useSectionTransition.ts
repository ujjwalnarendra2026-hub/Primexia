import { useState, useCallback, useRef, useEffect } from "react";

interface UseSectionTransitionOptions {
  sectionCount: number;
  transitionDuration?: number;
  debounceDelay?: number;
}

export function useSectionTransition({
  sectionCount,
  transitionDuration = 900,
  debounceDelay = 100,
}: UseSectionTransitionOptions) {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const isAnimating = useRef(false);
  const wheelAccumulator = useRef(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback(
    (index: number) => {
      if (isAnimating.current || index === activeSection || index < 0 || index >= sectionCount) return;

      isAnimating.current = true;
      setDirection(index > activeSection ? "down" : "up");
      setActiveSection(index);

      setTimeout(() => {
        isAnimating.current = false;
      }, transitionDuration + 100);
    },
    [activeSection, sectionCount, transitionDuration]
  );

  const goNext = useCallback(() => {
    navigateTo(activeSection + 1);
  }, [activeSection, navigateTo]);

  const goPrev = useCallback(() => {
    navigateTo(activeSection - 1);
  }, [activeSection, navigateTo]);

  useEffect(() => {
    const threshold = 60;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      wheelAccumulator.current += e.deltaY;

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, debounceDelay);

      if (wheelAccumulator.current > threshold) {
        wheelAccumulator.current = 0;
        goNext();
      } else if (wheelAccumulator.current < -threshold) {
        wheelAccumulator.current = 0;
        goPrev();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, [goNext, goPrev, debounceDelay]);

  return { activeSection, direction, navigateTo, goNext, goPrev };
}
