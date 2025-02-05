import React from "react";

// eslint-disable-next-line react/prop-types
export const Footer = ({ setCursor }) => {
  return (
    <footer
      className="max-w-4xl m-auto flex flex-col"
      id="contact"
      onMouseEnter={() => {
        setCursor("");
      }}
    >
      <div className="font-offbit101Bold">
        <div className="flex max-w-md ml-4">
          <p className="text-2xl md:text-5xl m-2">{"Lets Connect"}</p>
          <img src="/smile.svg" alt="smile" className="p-2" />
        </div>
        <div className="flex flex-col md:flex-row md:text-3xl m-4">
          <img
            src="/pixel-selfie.png"
            alt="it's a me"
            width={240}
            className="m-2 h-[240px] w-[240px] object-cover"
          />
          <div className="m-2">
            <p>{"Kevin Rufino"}</p>
            <p>{"Brooklyn, NY"}</p>
            <br />
            <div className="flex flex-col">
              <a
                className="hover:underline"
                href="mailto: kevinrufino97@gmail.com"
              >
                {"Email"}
              </a>
              <a
                className="hover:underline"
                href="./Kevin Rufino's Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {"Resume"}
              </a>
              <a
                className="hover:underline"
                href="https://www.linkedin.com/in/kevinrufino/"
                target="_blank"
                rel="noreferrer"
              >
                {"LinkedIn"}
              </a>
              <a
                className="hover:underline"
                href="https://github.com/kevinrufino"
                target="_blank"
                rel="noreferrer"
              >
                {"Github"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs md:text-2xl font-offbitDot text-center self-center m-2 pb-8">
        {"* Designed and Developed by Kevin Rufino *"}
      </p>
    </footer>
  );
};
