import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import AllProjects from "./components/AllProjects";

function App() {
  const [currentPage, setCurrentPage] = useState("landing"); // 'landing' or 'projects'

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/all-projects") {
        setCurrentPage("projects");
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
      if (id && id !== "/all-projects") {
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

      <Navigation currentPage={currentPage} />
      
      {currentPage === "projects" ? (
        <AllProjects />
      ) : (
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
