import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{ height: "1px", background: "var(--border-subtle)" }}
        />

        <Projects />

        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{ height: "1px", background: "var(--border-subtle)" }}
        />

        <TechStack />

        <div
          className="max-w-7xl mx-auto px-6 md:px-10"
          style={{ height: "1px", background: "var(--border-subtle)" }}
        />

        <Achievements />
      </main>
      <Contact />
    </>
  );
}
