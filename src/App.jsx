import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedProject from "./components/FeaturedProject";
import Projects from "./components/Projects";
import CurrentlyBuilding from "./components/CurrentlyBuilding";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import BuildingInPublic from "./components/BuildingInPublic";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import AllProjects from "./components/AllProjects";
import Terminal from "./components/Terminal";
import Playground from "./components/Playground";

function App() {
  const [currentPage, setCurrentPage] = useState("landing"); // 'landing' or 'projects'

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/all-projects") {
        setCurrentPage("projects");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (window.location.hash === "#/playground") {
        setCurrentPage("playground");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        setCurrentPage("landing");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run on initial mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage === "landing" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      if (id && id !== "/all-projects" && id !== "/playground") {
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    }
  }, [currentPage]);

  return (
    <div className="bg-void text-primary min-h-screen selection:bg-zinc-800 selection:text-white relative">
      <div className="noise-overlay" aria-hidden="true" />
      <Cursor />
      <Terminal />

      <Navigation currentPage={currentPage} />
      
      {currentPage === "projects" ? (
        <AllProjects />
      ) : currentPage === "playground" ? (
        <Playground />
      ) : (
        <main>
          <Hero />
          <About />
          <FeaturedProject />
          <Projects />
          <CurrentlyBuilding />
          <Services />
          <Skills />
          <Achievements />
          <BuildingInPublic />
          <Contact />
        </main>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
