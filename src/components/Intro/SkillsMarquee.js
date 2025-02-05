import React from "react";

export const SkillsMarquee = () => {
  return (
    <marquee className="text-3xl">
      <div className="flex flex flex-row">
        <p className="font-offbit101Bold m-4">{"skills: "}</p>
        <p className="font-offbit101 m-4">
          {"html, css, javascript, typescript, react, three.js"}
        </p>
        <p className="font-offbit101Bold m-4">{"soft skills: "}</p>
        <p className="font-offbit101 m-4">
          {"nerd 🤓, designer, gamer, music producer, sneaker collector"}
        </p>
      </div>
    </marquee>
  );
};
