import React from 'react';
import PropTypes from 'prop-types';
import LayeredName from './LayeredName.js';
import { useRef, useState, useEffect } from 'react';

export const Hero = ({ primaryColor, secondaryColor, setCursor }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const singleHeight = ref.current.offsetHeight;
      const vh = window.innerHeight;
      if (singleHeight > 0) {
        setCount(Math.ceil(vh / singleHeight));
      }
    }
  }, [ref.current, primaryColor, secondaryColor]);
  
  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full h-screen p-2" 
      onMouseEnter={() => {
        setCursor("");
      }}
      id="home"
    >
      {/* Hidden for measuring */}
      <div className="w-full invisible absolute top-0">
        <div className="w-full" ref={ref}>
          <LayeredName primaryColor={primaryColor} secondaryColor={secondaryColor} />
        </div>
      </div>
      {/* Actual visible stack */}
      {Array.from({ length: count - 1 }).map((_, i) => (
        <LayeredName
          key={i}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </div>
  );
};

Hero.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  setCursor: PropTypes.func.isRequired,
};
