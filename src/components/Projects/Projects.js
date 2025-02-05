import { ProjectsData } from "../../constants.js";
import { ProjectVideo } from "./ProjectVideo.js";
import { ProjectInfo } from "./ProjectInfo.js";
import React from "react";

// eslint-disable-next-line react/prop-types
export const Projects = ({ setCursor }) => {
  return (
    <div className="w-full my-4" id="projects">
      <div>
        {ProjectsData.map((i) => {
          return (
            <div
              className="flex flex-col md:flex-row justify-center items-center m-3 my-6"
              key={i.title}
              onMouseEnter={() => {
                setCursor(i.title);
              }}
            >
              <ProjectVideo src={i.scrapeGif} />
              <ProjectInfo {...i} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
