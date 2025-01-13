import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import spinningShoe from "../assets/404spinning-asset.gif";
import bot from "../assets/battlebot_run.gif";
import doge from "../assets/dogewood-gif.gif";
import mc from "../assets/mc-spinning-block.gif";
import mice from "../assets/mice-gif.gif";
import maxsLab from "../assets/maxs-lab-gif.webm";

const Cursor = (props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  //@TODO: add cursor selector
  let cursor;
  switch (props.cursor) {
    case "Max's Lab":
      cursor = maxsLab;
      break;
    case "Minecraft Clone":
      cursor = mc;
      break;
    case ".Swoosh 404":
      cursor = spinningShoe;
      break;
    case "Defenders of Dogewood":
      cursor = doge;
      break;
    case "Anonymice":
      cursor = mice;
      break;
    case "SNK-Y Bot":
      cursor = bot;
      break;
    default:
      cursor = "";
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
        src={spinningShoe}
        className="h-full w-full object-cover"
        alt="hello"
      />
    </animated.div>
  );
};

export default Cursor;
