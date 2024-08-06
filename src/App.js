import logo from "./logo.svg";
import "./App.css";
import { Hero } from "./components/Hero";

function App() {
  const primaryColor = "#F1F43B";
  const secondaryColor = "#441FD8";
  return (
    <div className={`bg-[${primaryColor}]`}>
      <header className="">
        <Hero primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </header>
    </div>
  );
}

export default App;
