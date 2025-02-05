import "./App.css";
import React from "react";
import { Footer } from "./components/Footer.js";
import { Intro } from "./components/Intro/Intro.js";
import { NavBar } from "./components/Nav.js";
import { Projects } from "./components/Projects/Projects.js";
import { SkillsMarquee } from "./components/Intro/SkillsMarquee.js";
import Cursor from "./components/Cursor.js";
// import { HeroCanvas } from "./components/Hero/HeroCanvas.js";
// import { Hero } from "./components/Hero/Hero.js";


function App() {
  const [cursor, setCursor] = React.useState("");
  // const primaryColor = "#F1F43B";
  const secondaryColor = "#3e3bf4";
  return (
    <div
      className={
        "bg-[#F1F43B] text-[#3e3bf4] scroll-smooth -z-2 relative overflow-hidden"
      }
    >
      <p className="text-[#F1F43B]">
        {`if you're reading this, you found a secret ;p`}
      </p>
      <Cursor cursor={cursor} setCursor={setCursor} />
      <NavBar />
      {/* <HeroCanvas /> */}
      {/* <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} /> */}
      <Intro
        secondaryColor={secondaryColor}
        cursor={cursor}
        setCursor={setCursor}
      />
      <SkillsMarquee loop={0} />
      <Projects cursor={cursor} setCursor={setCursor} />
      <Footer cursor={cursor} setCursor={setCursor} />
    </div>
  );
}

export default App;
