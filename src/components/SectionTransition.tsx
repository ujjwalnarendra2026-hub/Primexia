import { ReactNode } from "react";
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

const SectionTransition = ({ activeSection, direction, children }: SectionTransitionProps) => {
  return (
    <div className="fixed inset-0 top-14 overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeSection}
          custom={direction}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0 overflow-y-auto"
        >
          {children[activeSection]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SectionTransition;
