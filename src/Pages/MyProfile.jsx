import About from "../Components/About/About";
import Certifications from "../Components/Certifications/Certifications";
import Contact from "../Components/Contact/Contact";
import Home from "../Components/Home/Home";
import Projects from "../Components/Projects/Projects";
import Skills from "../Components/Skills/Skills";

export default function MyProfile() {
  return (
    <div className="bg-mainColor">
    <Home />
    <About />
    <Skills />
    <Certifications />
    <Projects />
    <Contact />
    </div>
  )
}
