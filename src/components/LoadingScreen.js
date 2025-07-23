import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { HeroName } from './Hero/HeroName.js';

const LoadingScreen = ({ progress, total, secondaryColor, setCursor }) => {
  const ref = useRef(null);


  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F1F43B] z-[999] p-2" onMouseEnter={() => {
        setCursor("");
      }}>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full relative" ref={ref}>
  <HeroName className="w-full" primaryColor={"#00000000"} secondaryColor={secondaryColor}/>
  <div
    style={{ height: `${ref.current?.offsetHeight ?? 128}px` }}
    className="absolute top-0 left-0 w-full h-full overflow-hidden loading-mask z-[99999] pointer-events-none"
  >
    <div
      className="w-full bg-[#3e3bf4] transition-all duration-300 absolute left-0 bottom-0"
      style={{ height: `${(progress / total) * 100}%` }}
    />
    <div className="absolute top-0 left-0 w-full h-full loading-mask-bar" />
  </div>
</div>
      </div>
      <div className="text-[#3e3bf4] text-3xl font-bold font-offbit101Bold mb-4">Loading... {Math.round((progress / total) * 100)}%</div>
    </div>
  );
};

LoadingScreen.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export default LoadingScreen;
