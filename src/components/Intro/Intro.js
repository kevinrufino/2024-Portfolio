import Typewriter from "typewriter-effect";
import React from "react";

export const Intro = () => {
  return (
    <section
      className="max-w-4xl my-16 px-5 md:my-32 flex flex-col flex-wrap space-y-16 md:space-y-0 patterns m-4 md:m-auto"
      // @TODO: make id intro once hero is fixed
      id="home"
    >
      <div className="mb-auto space-y-5">
        <h1 className="font-offbit101Bold text-5xl md:text-7xl mt-16 ">
          Hey!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋🏾
          </span>
        </h1>
        <h2 className="font-offbit101Bold text-5xl md:text-5xl">
          {"I’m Kevin,"}{" "}
          <Typewriter
            style={{ padding: 50, textAlign: "left" }}
            options={{
              strings: [
                "Front-end Developer",
                "Full Stack Developer",
                "Creative Engineer",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
          />
        </h2>
        <p className="font-offbit101Bold text-lg md:text-4xl leading-relaxed">
          {"I enjoy fusing my love for art and tech to build fun interactive experiences. I currently am working at Nike as a Front-end Creative Developer. Check out my work below 👇🏾"}{" "}
        </p>
      </div>
    </section>
  );
};
