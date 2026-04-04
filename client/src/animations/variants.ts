import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 0 rgba(255,153,0,0)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 12px 30px rgba(255,153,0,0.22)",
    transition: {
      duration: 0.25
    }
  }
};
