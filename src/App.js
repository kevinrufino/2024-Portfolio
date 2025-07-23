import "./App.css";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen.js";
import { Footer } from "./components/Footer.js";
import { Intro } from "./components/Intro/Intro.js";
import { NavBar } from "./components/Nav.js";
import { Projects } from "./components/Projects/Projects.js";
import { SkillsMarquee } from "./components/Intro/SkillsMarquee.js";
import Cursor from "./components/Cursor.js";
// import { HeroCanvas } from "./components/Hero/HeroCanvas.js";
import { Hero } from "./components/Hero/Hero.js";

function App() {
  // List of main components to "load"
  const componentsToLoad = [
    "Cursor",
    "NavBar",
    "Hero",
    "Intro",
    "SkillsMarquee",
    "Projects",
    "Footer"
  ];
  const [progress, setProgress] = useState(0);
  const total = componentsToLoad.length;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @TODO: check if all components are loaded
    // Simulate loading each component one by one
    if (progress < total) {
      const timeout = setTimeout(() => setProgress(p => p + 1), 350);
      return () => clearTimeout(timeout);
    } else {
      const done = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(done);
    }
  }, [progress, total]);
  const [cursor, setCursor] = useState("");
  const primaryColor = "#F1F43B";
  const secondaryColor = "#3e3bf4";
  if (loading) {
    return <LoadingScreen progress={progress} total={total} primaryColor={primaryColor} secondaryColor={secondaryColor} setCursor={setCursor}/>;
  }
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
      <NavBar setCursor={setCursor} />
      {/* <HeroCanvas /> */}
      <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} setCursor={setCursor}/>
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
