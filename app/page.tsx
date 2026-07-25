import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Navbar from "@/components/Navbar";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { BackgroundLines } from "@/components/ui/background-lines";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <main id="top" className="site-shell">
      <Navbar />
      <BackgroundLines className="page-lines" />
      <BackgroundBeamsWithCollision className="page-beams" />
      <HeroSection />
      <ProjectsSection />
      <ScrollAnimationSection />
      <ContactSection />
    </main>
  );
}
