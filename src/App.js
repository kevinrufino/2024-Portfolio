import "./App.css";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero/Hero";
import { Intro } from "./components/Intro/Intro";
import { NavBar } from "./components/Nav";
import { Projects } from "./components/Projects/Projects";
import { SkillsMarquee } from "./components/Intro/SkillsMarquee";
import { HeroCanvas } from "./components/Hero/HeroCanvas";
import React from "react";

function App() {
  const primaryColor = "#F1F43B";
  const secondaryColor = "#3e3bf4";
  return (
    <div className={"bg-[#F1F43B] text-[#3e3bf4] scroll-smooth"}>
      <NavBar />
      <HeroCanvas />
      <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <Intro secondaryColor={secondaryColor} />
      <SkillsMarquee loop={0} />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
