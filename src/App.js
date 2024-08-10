import "./App.css";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { NavBar } from "./components/Nav";
import { SkillsMarquee } from "./components/SkillsMarquee";
import React from "react";

function App() {
  const primaryColor = "#F1F43B";
  const secondaryColor = "#441FD8";
  return (
    <div className={"bg-[#F1F43B] text-[#441FD8]"}>
      <NavBar />
      <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <Intro secondaryColor={secondaryColor} />
      <SkillsMarquee loop={0} />
      <div className="w-screen h-screen">work and projects</div>
      <Footer />
    </div>
  );
}

export default App;
