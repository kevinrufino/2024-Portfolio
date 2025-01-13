import { HeroFillName } from "./HeroFillName.js";
import { HeroName } from "./HeroName.js";
import React, { useRef, useState, useEffect } from "react";

export const Hero = (props) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [numElements, setNumElements] = useState(1);

  const FullName = React.forwardRef((props, ref) => (
    <div ref={ref} className="w-screen">
      {/* <HeroFillName color="#3e3bf4" className="-mb-20" /> */}
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        // className="-mb-20"
      />
    </div>
  ));

  useEffect(() => {
    if (containerRef.current && elementRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const elementHeight = elementRef.current.clientHeight;
      const num = Math.ceil(containerHeight / (elementHeight - 20)); // Adjust for overlap
      setNumElements(num);
    }
  }, [containerRef, elementRef]);

  return (
    <div ref={containerRef} className="w-screen h-screen p-4" id="home">
      {Array.from({ length: numElements }).map((_, index) => (
        <FullName key={index} ref={elementRef} />
      ))}
    </div>
  );
};
