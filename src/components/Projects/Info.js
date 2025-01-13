export const ProjectInfo = (props) => {
  return (
    <div className="md:w-1/3 m-2 md:m-4 my-auto">
      <h1 className="font-offbit101Bold text-5xl">{props.title}</h1>
      <p>Technologies Used</p>
      <p className="font-offbit101Bold text-2xl">{props.description}</p>
    </div>
  );
};
