import { motion } from "framer-motion";

interface Props {
  text: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.03 * i,
    },
  }),
};

const child = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: -20,
    y: -20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimateText = ({ text }: Props) => {
  const letters = Array.from(text);
  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", fontSize: "1em" }}
      variants={container}
      initial={"hidden"}
      animate={"visible"}
    >
      {letters.map((letter, index) => (
        <motion.span
          whileHover={{
            y: [-10, -5, 0],
            x: [10, 5, 0],
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            cursor: "default",
          }}
          variants={child}
          key={index}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimateText;
