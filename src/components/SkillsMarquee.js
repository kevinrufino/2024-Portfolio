import Marquee from "react-fast-marquee";
import React from "react";

export const SkillsMarquee = (props) => {
  return (
    <Marquee className="text-3xl">
      <p className="font-offbit101Bold m-4">{"skills: "}</p>
      <p className="font-offbit101 mr-4">
        {"html, css, javascript, typescript, react, three.js"}
      </p>
      <p className="font-offbit101Bold m-4">{"soft skills: "}</p>
      <p className="font-offbit101 mr-4">
        {"nerd 🤓, designer, gamer, music producer, sneaker collector"}
      </p>
    </Marquee>
  );
};
