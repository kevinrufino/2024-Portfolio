/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import spinningShoe from "../assets/404spinning-asset.gif";
import bot from "../assets/battlebot_run.gif";
import doge from "../assets/dogewood-gif.gif";
import mc from "../assets/mc-spinning-block.gif";
import mice from "../assets/mice-gif.gif";
// import maxsLab from "../assets/maxs-lab-gif.gif";

const Cursor = ({ cursor }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  let cursorImg;
  switch (cursor) {
    case "Max's Lab":
      cursorImg = spinningShoe;
      break;
    case "Minecraft Clone":
      cursorImg = mc;
      break;
    case ".Swoosh 404":
      cursorImg = spinningShoe;
      break;
    case "Defenders of Dogewood":
      cursorImg = doge;
      break;
    case "Anonymice":
      cursorImg = mice;
      break;
    case "SNK-Y Bot":
      cursorImg = bot;
      break;
    case "EA Sports FC Partner Page":
      cursorImg = spinningShoe;
      break;
    case "TINAJ Collection Listing Page":
      cursorImg = spinningShoe;
      break;
    case "Our Force 1 Poster Content Display Page":
      cursorImg = spinningShoe;
      break;
    default:
      cursorImg = "";
  }

  const animatedStyles = useSpring({
    to: { x: mousePosition.x, y: mousePosition.y },
    config: { mass: 1, tension: 280, friction: 40 },
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    cursorImg && (
      <animated.div
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          overflow: "hidden",
          zIndex: 9999,
          ...animatedStyles,
        }}
      >
        <img
          src={cursorImg}
          className="h-full w-full object-cover overflow-hidden"
          alt="hello"
        />
      </animated.div>
    )
  );
};

export default Cursor;
