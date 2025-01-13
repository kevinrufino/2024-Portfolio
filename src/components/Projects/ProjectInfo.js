export const ProjectInfo = (props) => {
  return (
    <div className="md:w-1/3 m-2 md:m-4 my-auto flex flex-col justify-around gap-y-4">
      <h1 className="font-offbit101Bold text-4xl">{props.title}</h1>
      <div className="flex flex-row flex-wrap gap-x-2">
        {props.technology.map((tech) => (
          <p
            className="font-offbit101 text-lg border border-[#3e3bf4] rounded-md my-1 px-2 pt-1"
            key={tech}
          >
            {tech}
          </p>
        ))}
      </div>

      {/* @TODO: truncate text on long text */}
      <p className="font-offbit101Bold text-lg md:text-2xl">
        {props.description}
      </p>
    </div>
  );
};
