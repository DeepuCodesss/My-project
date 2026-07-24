import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ScrollAnimationSection />
      <footer className="portfolio-footer">
        <span>DEEPAK KUMAR / 2026</span>
        <span>Thanks for visiting the workspace.</span>
        <a href="mailto:hello@deepak.dev">Get in touch ↗</a>
      </footer>
    </>
  );
}
