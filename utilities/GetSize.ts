import { useEffect, useState } from "react";

interface windows {
  innerWidth: number;
  innerHeight: number;
}
let innerWidth: number = 0;
let innerHeight: number = 0;

function getWindowSize(): windows {
  if (typeof window !== "undefined") {
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    return { innerWidth, innerHeight };
  }
  return { innerWidth, innerHeight };
}

export const GetSize = (): windows => {
  const [windowSize, setWindowSize] = useState<windows>(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return { innerWidth, innerHeight };
};
