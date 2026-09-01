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
import NotFound from "./components/NotFound";

// SEO: Page-specific metadata for unique titles, descriptions, and canonical URLs
const PAGE_META = {
  landing: {
    title: "Ival Permana — Software Developer & Product Builder",
    description:
      "Portfolio of Ival Permana. Software Developer & Product Builder — building websites, mobile apps, and AI-powered products from idea to reality.",
    canonical: "https://ivalpermana.my.id/",
  },
  projects: {
    title: "All Projects — Ival Permana",
    description:
      "Explore all projects by Ival Permana — full-stack web apps, mobile applications, AI-powered tools, and more.",
    canonical: "https://ivalpermana.my.id/#/all-projects",
  },
  playground: {
    title: "Interactive Playground — Ival Permana",
    description:
      "Interactive developer playground by Ival Permana — experiment with cache simulators, rate limiters, sorting algorithms, and more.",
    canonical: "https://ivalpermana.my.id/#/playground",
  },
  notfound: {
    title: "Page Not Found — Ival Permana",
    description:
      "The page you're looking for doesn't exist. Visit Ival Permana's portfolio to explore projects, services, and more.",
    canonical: "https://ivalpermana.my.id/",
  },
};

// Known hash routes
const KNOWN_ROUTES = [
  "", // landing (no hash or just #)
  "#",
  "#projects",
  "#services",
  "#about",
  "#skills",
  "#contact",
  "#/all-projects",
  "#/playground",
];

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === "#/all-projects") {
        setCurrentPage("projects");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (hash === "#/playground") {
        setCurrentPage("playground");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (
        hash.startsWith("#/") &&
        !KNOWN_ROUTES.includes(hash)
      ) {
        // Unknown hash route starting with #/ → 404
        setCurrentPage("notfound");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        setCurrentPage("landing");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // SEO: Update document title, meta description, and canonical tag per page
  useEffect(() => {
    const meta = PAGE_META[currentPage] || PAGE_META.landing;

    // Update title
    document.title = meta.title;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute("content", meta.description);
    }

    // Update canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute("href", meta.canonical);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", meta.canonical);

    // Update Twitter tags
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", meta.title);

    const twDesc = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twDesc) twDesc.setAttribute("content", meta.description);

    const twUrl = document.querySelector('meta[property="twitter:url"]');
    if (twUrl) twUrl.setAttribute("content", meta.canonical);
  }, [currentPage]);

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
      ) : currentPage === "notfound" ? (
        <NotFound />
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

