import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedContentProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const AnimatedHeading = ({ children, delay = 0, className = "", y = 24 }: AnimatedContentProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedParagraph = ({ children, delay = 0.15, className = "", y = 16 }: AnimatedContentProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedButton = ({ children, delay = 0.3, className = "", y = 12 }: AnimatedContentProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AnimatedImage = ({ children, delay = 0.1, className = "" }: AnimatedContentProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.02 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
