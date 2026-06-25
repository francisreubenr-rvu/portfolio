import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div id="fr-site">
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <TechStack />
        <Achievements />
      </main>
      <Contact />
    </div>
  );
}
