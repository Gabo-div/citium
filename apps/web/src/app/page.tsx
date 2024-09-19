import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Services from "@/components/layout/Services";
import Projects from "@/components/layout/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
