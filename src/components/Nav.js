import React from "react";

export const NavBar = (props) => {
  //@TODO: mix blend mode but select color on blend
  // https://stackoverflow.com/questions/76415821/how-to-get-a-mix-blend-mode-changing-color-effect-but-selecting-the-colors
  // https://gist.github.com/emorgado/13fd13f8aea42c2a959617ea6e913d31
  // https://2015.xoxofest.com/
  return (
    <div className="mix-blend-difference flex flex-col fixed top-2 font-offbit101Bold text-white text-4xl z-10">
      <a href="#home" className="mx-2 hover:underline">
        {"Home"}
      </a>
      <a href="#projects" className="mx-2 hover:underline">
        {"Projects"}
      </a>
      <a href="#contact" className="mx-2 hover:underline">
        {"Contact"}
      </a>
    </div>
  );
};
