import { ProjectsData } from "../../constants.js";
import { ProjectVideo } from "./ProjectVideo.js";
import { ProjectInfo } from "./ProjectInfo.js";
import React from "react";

// eslint-disable-next-line react/prop-types
export const Projects = ({ cursor, setCursor }) => {
  return (
    <div className="w-full my-4" id="projects">
      <div>
        {ProjectsData.map((i) => {
          return (
            <div
              className="flex flex-col md:flex-row justify-center items-center m-3 my-6"
              key={i.title}
            >
              <ProjectVideo
                src={i.scrapeGif}
                title={i.title}
                cursor={cursor}
                setCursor={setCursor}
              />
              <ProjectInfo {...i} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
