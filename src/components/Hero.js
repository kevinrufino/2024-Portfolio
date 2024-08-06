import { HeroFillName } from "./HeroFillName";
import { HeroName } from "./HeroName";

export const Hero = (props) => {
  return (
    <div className="w-screen h-screen p-4">
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
