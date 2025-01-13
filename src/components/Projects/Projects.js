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
              className="h-screen flex flex-col md:flex-row justify-center items-center m-3"
              key={i.title}
            >
              <ProjectVideo src={i.scrapeGif} />
              <ProjectInfo {...i} />
            </div>
          );
        })}

        {/* video */}
        {/* <div className="md:w-2/3 bg-black scroller m-6">
          <video
            className="h-full w-full object-cover video"
            src="\Project-Scrape-Videos\maxs-lab-video.mp4"
            autoPlay
            loop
            muted
          />
          <div className="mask">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 436.92 368.25">
              <path
                class="cls-1"
                d="M96.76,38.45c30.42-9.46,62.16-14.66,94.01-15.39,8.43-.19,17.08-.04,24.99,2.9.08.03.16.06.24.09,9.99,3.8,7.81,18.64-2.84,19.5-24.92,2.02-50.08,1.54-75.06,3.23-32.26,2.19-65.33,8.43-91.96,26.89-1.23.85-2.26,2.01-2.85,3.39-2.95,6.94,6.75,11.01,13.82,11.25,74.32,2.48,146.08-30.59,220.43-30.47,9.21.02,21.1,2.86,21.67,12.31.23,3.71-1.58,7.23-4.44,9.6-5.62,4.67-12.77,5.01-19.64,5.56-57.82,4.63-112.5,28.65-170.02,36.14-21.42,2.79-43.95,3.51-62.53,14.83-1.8,1.1-3.28,2.73-3.91,4.74-2.1,6.68,6.06,10.63,12.51,11.63,30.54,4.7,61.63-1.97,91.41-10.18,57.92-15.98,116.93-38.18,176.34-29.22,8.27,1.25,18.91,7.06,15.31,15.07-1.21,2.7-3.71,4.6-6.55,5.4-12.43,3.51-25.34,4.57-38.19,5.6-82.83,6.62-166.29,12.49-246.64,33.67-5.88,1.55-11.96,3.3-16.49,7.35-.05.04-.09.08-.14.12-6.39,5.85-2.67,16.54,5.95,17.44,31.33,3.29,63.18,1.65,94.01-4.85,25.24-5.33,49.71-13.86,74.97-19.08,28.74-5.94,58.17-7.53,87.47-9.1l73.88-3.96c9.14-.49,14.05,10.77,7.32,16.98-.05.04-.1.09-.15.13-4.9,4.42-11.35,6.63-17.61,8.7-25.69,8.48-51.6,16.46-78.11,21.84-74.73,15.18-154.47,9.94-224.34,40.49-4.16,1.82-8.4,3.9-12.29,6.38-10.22,6.51-6.62,22.29,5.43,23.69.07,0,.15.02.22.03,31.06,3.58,62.68,7.15,93.4,1.35,17.64-3.33,34.55-9.67,51.36-15.99,44.51-16.73,89.02-33.45,133.53-50.18,21.14-7.94,42.43-15.93,64.66-19.89,2.24-.4,4.49-.76,6.76-1.06,23.1-3.16,29.95,30.59,7.48,36.83-.2.06-.41.11-.61.17-75.97,20.89-156.97,12.97-234.43,27.39-23.74,4.42-47.04,10.92-70.29,17.42-11.22,3.13-22.44,6.26-33.66,9.4-6.11,1.71-13.78,6.04-11.88,12.09,51.81,9.28,103.99-9.22,154.26-24.82,30.37-9.42,62.63-17.8,94.15-18.55,7.61-.18,8.09,11.14.5,11.71-3.43.26-6.85.56-10.27.91-26.73,2.76-53.02,8.65-79.24,14.53-31.27,7.01-62.95,14.17-91.41,28.9-5.27,2.72-10.74,6.16-14.27,10.74-4.02,5.22-8.26,10.26-12.96,14.88-21.03,20.64,79.57-2.93,114.69-10.11,34.79-7.12,68.09-21.3,103.38-25.28,11.11-1.25,22.28-1.42,33.44-.92,12.6.56,15.06,18.26,3.05,22.1-58.7,18.77-124.39,15.88-180.74-9.28"
              />
            </svg>
          </div>
        </div> */}
        {/* project info */}
        {/* <div className="md:w-1/3 m-2 md:m-4 my-auto">
          <h1 className="font-offbit101Bold text-5xl">Max's Lab</h1>
          <p>Technologies Used</p>
          <p className="font-offbit101Bold text-2xl">
            I lead the development of a fully 3D marketing experience. This experience allowed the user to deeply engage
            in the story of some airmax products by exploring a full 3D world with easter eggs and live updates to
            support IRL marketing moments. I worked cross functionally with 3D artists, designers, and project managers
            and marketing specialists to bring this to life. Feel free to check it out here.
          </p>
        </div> */}
      </div>
    </div>
  );
};
