import { ProjectsData } from "../../constants.js";
import { ProjectVideo } from "./Video.js";
import { ProjectInfo } from "./Info";

export const Projects = (props) => {
  return (
    <div className="w-full my-4" id="projects">
      <div>
        {ProjectsData.map((i) => {
          return (
            <div
              className="flex flex-col md:flex-row justify-center items-center m-3 my-6"
              key={i.title}
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
