import "./App.css";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero/Hero";
import { Intro } from "./components/Intro/Intro";
import { NavBar } from "./components/Nav";
import { Projects } from "./components/Projects/Projects";
import { SkillsMarquee } from "./components/Intro/SkillsMarquee";
import { HeroCanvas } from "./components/Hero/HeroCanvas";
import Cursor from "./components/Cursor";
import React from "react";

function App() {
  const [cursor, setCursor] = React.useState("");
  const primaryColor = "#F1F43B";
  const secondaryColor = "#3e3bf4";
  return (
    <div className={"bg-[#F1F43B] text-[#3e3bf4] scroll-smooth -z-2 relative"}>
      <p className="text-[#F1F43B]">
        if you're reading this, you found a secret ;p
      </p>
      <Cursor cursor={cursor} setCursor={setCursor} />
      <NavBar />
      {/* <HeroCanvas /> */}
      {/* @TODO: fix overflow x */}
      {/* <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} /> */}
      <Intro secondaryColor={secondaryColor} />
      <SkillsMarquee loop={0} />
      <Projects cursor={cursor} setCursor={setCursor} />
      <Footer />
    </div>
  );
}

export default App;
