import { useEffect, useState } from "react";

export const getScrollSize = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);
  };

  const isVisible = (heightToHideFrom: number) => {
    if (height > heightToHideFrom) {
      return false;
    } else {
      return true;
    }
  };

  return { height, isVisible };
};
