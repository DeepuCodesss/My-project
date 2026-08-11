import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentFocusSection from "@/components/CurrentFocusSection";
import Navbar from "@/components/Navbar";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import DeferredDecorations from "@/components/DeferredDecorations";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <main id="main-content" className="site-shell">
      <Navbar />
      <DeferredDecorations />
      <HeroSection />
      <ProjectsSection />
      <CurrentFocusSection />
      <ScrollAnimationSection />
      <ContactSection />
    </main>
  );
}

