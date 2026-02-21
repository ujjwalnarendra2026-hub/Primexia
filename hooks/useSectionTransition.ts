"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseSectionTransitionOptions {
  sectionCount: number;
  transitionDuration?: number;
  debounceDelay?: number;
}

export function useSectionTransition({
  sectionCount,
  transitionDuration = 900,
  debounceDelay = 120,
}: UseSectionTransitionOptions) {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const isAnimating = useRef(false);
  const wheelAccumulator = useRef(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback(
    (index: number) => {
      if (isAnimating.current || index === activeSection || index < 0 || index >= sectionCount) {
        return;
      }

      isAnimating.current = true;
      setDirection(index > activeSection ? "down" : "up");
      setActiveSection(index);

      setTimeout(() => {
        isAnimating.current = false;
      }, transitionDuration + 100);
    },
    [activeSection, sectionCount, transitionDuration],
  );

  const goNext = useCallback(() => {
    navigateTo(activeSection + 1);
  }, [activeSection, navigateTo]);

  const goPrev = useCallback(() => {
    navigateTo(activeSection - 1);
  }, [activeSection, navigateTo]);

  useEffect(() => {
    const threshold = 60;
    const isMobileLike = () =>
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      if (isMobileLike()) return;

      const sectionScroller = document.getElementById("section-scroll-container");
      if (sectionScroller) {
        const canScrollDown =
          sectionScroller.scrollTop + sectionScroller.clientHeight < sectionScroller.scrollHeight - 1;
        const canScrollUp = sectionScroller.scrollTop > 0;

        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      e.preventDefault();

      wheelAccumulator.current += e.deltaY;

      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }

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
      if (isMobileLike()) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
    };
  }, [debounceDelay, goNext, goPrev]);

  return { activeSection, direction, navigateTo };
}
