import { ProjectsData } from '../../constants.js';
import { ProjectVideo } from './ProjectVideo.js';
import { ProjectInfo } from './ProjectInfo.js';

export const Projects = ({ setCursor }) => {
  return (
    <div className='w-full my-4' id='projects'>
      <div>
        {ProjectsData.map((project, index) => {
          return (
            <div
              className={`flex flex-col ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              } justify-center items-center m-3 my-6`}
              key={project.title}
              onMouseEnter={() => {
                setCursor(project.title);
              }}
            >
              <ProjectVideo src={project.scrapeGif} />
              <ProjectInfo {...project} index={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
