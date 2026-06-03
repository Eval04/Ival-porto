import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

function App() {
  return (
    <div className="bg-void text-primary min-h-screen selection:bg-zinc-800 selection:text-white relative">
      <div className="noise-overlay" aria-hidden="true" />
      <Cursor />

      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
