import React from "react";

export const NavBar = () => {
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
