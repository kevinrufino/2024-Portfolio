import "./App.css";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { SkillsMarquee } from "./components/SkillsMarquee";

function App() {
  const primaryColor = "#F1F43B";
  const secondaryColor = "#441FD8";
  return (
    <div className={"bg-[#F1F43B] text-[#441FD8]"}>
      <header className="">
        <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </header>
      <Intro secondaryColor={secondaryColor} />
      <SkillsMarquee loop={0} />
      <Footer />
    </div>
  );
}

export default App;
