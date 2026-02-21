"use client";

import { Children, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionTransitionProps {
  activeSection: number;
  direction: "up" | "down";
  children: ReactNode[];
}

const sectionVariants = {
  enter: (direction: "up" | "down") => ({
    y: direction === "down" ? 60 : -60,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: "up" | "down") => ({
    y: direction === "down" ? -40 : 40,
    opacity: 0,
    filter: "blur(2px)",
  }),
};

const transition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

export default function SectionTransition({ activeSection, direction, children }: SectionTransitionProps) {
  const sections = Children.toArray(children);
  const currentSection = sections[activeSection] ?? sections[0] ?? null;

  return (
    <div className="fixed inset-0 top-14 overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeSection}
          id="section-scroll-container"
          custom={direction}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0 overflow-y-auto pb-24 md:pb-0"
        >
          {currentSection}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
