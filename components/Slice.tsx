import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { GetSize } from "../utilities";

interface Props {
  drawerState: boolean;
  toggleDrawerState: () => void;
}

export const Slice = ({ toggleDrawerState }: Props) => {
  const x = useMotionValue(0);
  const { innerWidth } = GetSize();
  const constraintsRef = useRef(null);

  interface info {
    delta: cord;
    offset: cord;
    point: cord;
    velocity: cord;
  }
  interface cord {
    x: number;
    y: number;
  }

  function onDragEnd(event: any, info: info) {
    const shouldClose: boolean = info.point.x >= innerWidth - 150;
    if (shouldClose) {
      toggleDrawerState();
    }
  }
  return (
    <motion.div ref={constraintsRef}>
      <motion.div
        onDragEnd={onDragEnd}
        dragElastic={{ right: 0.9, left: 0 }}
        drag="x"
        dragConstraints={constraintsRef}
        dragTransition={{ bounceStiffness: 50, bounceDamping: 10 }}
      >
        <FontAwesomeIcon
          className={`p-4 border-separate text-[#fff] border-spacing-4 rounded-full border-2 border-[#fff]`}
          icon={faArrowRight}
        />
      </motion.div>
    </motion.div>
  );
};
