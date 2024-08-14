import { useEffect, useState } from "react";

function useDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: innerWidth, height: innerHeight });

    window.addEventListener("resize", () => {
      setDimensions({ width: innerWidth, height: innerHeight });
    });
  }, []);

  return dimensions;
}

export default useDimensions;
