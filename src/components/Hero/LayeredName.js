import React from "react";
import PropTypes from "prop-types";
import { HeroFillName } from "./HeroFillName.js";
import { HeroName } from "./HeroName.js";
const LayeredName = ({ primaryColor, secondaryColor }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <HeroFillName
        className="w-full mt-[-5%]"
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <HeroName
        className="w-full mt-[-5%]"
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </div>
  );
};

LayeredName.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
};

export default LayeredName;
