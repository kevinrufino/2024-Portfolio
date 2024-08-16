import { HeroFillName } from "./HeroFillName";
import { HeroName } from "./HeroName";
import React from "react";

export const Hero = (props) => {
  // get height of container (screen size)
  // get height of elements
  // calulate how many elements can fit in the container
  return (
    <div className="w-screen h-screen p-4" id="home">
      <HeroFillName color="#441FD8" className="-mb-20" />
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        className="-mb-20"
      />
      <HeroFillName color="#441FD8" className="-mb-20" />
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        className="-mb-20"
      />
      <HeroFillName color="#441FD8" className="-mb-20" />
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        className="-mb-20"
      />
      <HeroFillName color="#441FD8" className="-mb-20" />
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        className="-mb-20"
      />
      <HeroFillName color="#441FD8" className="-mb-20" />
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        className="-mb-20"
      />
      <HeroFillName color="#441FD8" className="-mb-20" />
      <HeroName
        primaryColor={props.primaryColor}
        secondaryColor={props.secondaryColor}
        className="-mb-20"
      />
    </div>
  );
};
