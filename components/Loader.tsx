import { useRef } from "react";

import { motion } from "framer-motion";

import style from "../styles/Loader.module.css";

export const Loader = () => {
  const constraintsRef = useRef(null);
  return (
    <div
      className={`container mx-auto flex h-screen w-screen items-center justify-center overflow-hidden`}
      ref={constraintsRef}
    >
      <motion.div
        dragElastic={1}
        dragConstraints={constraintsRef}
        drag
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className={`${style.wheel_and_hamster}`}
      >
        <div className={`${style.wheel}`}></div>
        <div className={`${style.hamster}`}>
          <div className={`${style.hamster__body}`}>
            <div className={`${style.hamster__head}`}>
              <div className={`${style.hamster__ear}`}></div>
              <div className={`${style.hamster__eye}`}></div>
              <div className={`${style.hamster__nose}`}></div>
            </div>
            <div className={`${style.hamster__limb} ${style.hamster__limb__fr}`}></div>
            <div className={`${style.hamster__limb} ${style.hamster__limb__fl}`}></div>
            <div className={`${style.hamster__limb} ${style.hamster__limb__br}`}></div>
            <div className={`${style.hamster__limb} ${style.hamster__limb__bl}`}></div>
            <div className={`${style.hamster__tail}`}></div>
          </div>
        </div>
        <div className={`${style.spoke}`}></div>
      </motion.div>
    </div>
  );
};
