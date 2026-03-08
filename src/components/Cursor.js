/* eslint-disable react/prop-types */
/**
 * Custom cursor component with animated effects and project-specific cursors
 *
 * This component creates a custom cursor that:
 * - Follows mouse movement with smooth animations
 * - Changes appearance based on hover context
 * - Displays different animated cursors for different projects
 * - Provides visual feedback for interactive elements
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.cursor - Current cursor state/type
 * @returns {JSX.Element} The custom cursor component
 */
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import spinningShoe from '../assets/404spinning-asset.gif';
import bot from '../assets/battlebot_run.gif';
import doge from '../assets/dogewood-gif.gif';
import mc from '../assets/mc-spinning-block.gif';
import mice from '../assets/mice-gif.gif';
// import maxsLab from '../assets/maxs-lab-gif.gif';

const Cursor = ({ cursor }) => {
  /** @type {{x: number, y: number}} Current mouse position coordinates */
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /** @type {string} Cursor image source based on current cursor state */
  let cursorImg;

  /** @type {Object} CSS filters/styles for cursor appearance */
  let cursorColor;
  switch (cursor) {
    case "Max's Lab":
      cursorImg = spinningShoe;
      cursorColor = { filter: 'brightness(1.2) hue-rotate(40deg)' };
      break;
    case 'Minecraft Clone':
      cursorImg = mc;
      break;
    case '.Swoosh 404':
      cursorImg = spinningShoe;
      break;
    case 'Defenders of Dogewood':
      cursorImg = doge;
      break;
    case 'Anonymice':
      cursorImg = mice;
      break;
    case 'SNK-Y Bot':
      cursorImg = bot;
      break;
    case 'EA Sports FC Partner Page':
      cursorImg = spinningShoe;
      cursorColor = { filter: 'brightness(1.2) hue-rotate(300deg)' };
      break;
    case 'TINAJ Collection Listing Page':
      cursorImg = spinningShoe;
      cursorColor = {
        filter: 'brightness(1.2) hue-rotate(150deg) grayscale(1)',
      };
      break;
    case 'Our Force 1 Poster Content Display Page':
      cursorImg = spinningShoe;
      cursorColor = { filter: 'brightness(1.2) hue-rotate(250deg)' };
      break;
    default:
      cursorImg = '';
  }

  const animatedStyles = useSpring({
    to: { x: mousePosition.x, y: mousePosition.y },
    config: { mass: 1, tension: 280, friction: 40 },
  });

  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    cursorImg && (
      <animated.div
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          overflow: 'hidden',
          zIndex: 9999,
          ...animatedStyles,
          ...cursorColor,
        }}
      >
        <img
          src={cursorImg}
          className='h-full w-full object-cover overflow-hidden'
          alt='hello'
        />
      </animated.div>
    )
  );
};

export default Cursor;
