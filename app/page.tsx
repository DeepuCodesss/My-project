import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Navbar from "@/components/Navbar";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import DeferredDecorations from "@/components/DeferredDecorations";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <main id="top" className="site-shell">
      <Navbar />
      <DeferredDecorations />
      <HeroSection />
      <ProjectsSection />
      <ScrollAnimationSection />
      <ContactSection />
    </main>
  );
}
