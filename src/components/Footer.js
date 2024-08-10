import pixelSelfie from "../pixel-selfie.png";
import smile from "../smile.svg";
import React from "react";

export const Footer = (props) => {
  return (
    <footer className="max-w-4xl m-auto flex flex-col">
      <div className="font-offbit101Bold">
        <div className="flex max-w-md ml-4">
          <p className="text-5xl m-2">{"Lets Connect"}</p>
          <img src={smile} alt="smile" className="p-2" />
        </div>
        <div className="flex text-3xl m-4">
          <img src={pixelSelfie} alt="it's a me" width={240} className="m-2" />
          <div className="m-2">
            <p>{"Kevin Rufino"}</p>
            <p>{"Brooklyn, NY"}</p>
            <br />
            <div className="flex flex-col">
              <a href="mailto: kevinrufino97@gmail.com">{"Email"}</a>
              <a
                href="./Kevin Rufino Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {"Resume"}
              </a>
              <a
                href="https://www.linkedin.com/in/kevinrufino/"
                target="_blank"
                rel="noreferrer"
              >
                {"LinkedIn"}
              </a>
              <a
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
      <p className="text-2xl font-offbitDot self-center pb-8">
        {"* Designed and Developed by Kevin Rufino *"}
      </p>
    </footer>
  );
};
