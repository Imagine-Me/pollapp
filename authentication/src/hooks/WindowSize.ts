import { useEffect, useState } from "react";

type WindowSize = "small" | "large";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>("large");
  useEffect(() => {
    const resizeListener = () => {
      const width = window.innerWidth;
      setWindowSize(width < 1020 ? "small" : "large");
    };
    resizeListener();
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  return windowSize;
};
