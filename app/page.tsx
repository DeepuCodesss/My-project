import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentFocusSection from "@/components/CurrentFocusSection";
import Navbar from "@/components/Navbar";
import DeferredDecorations from "@/components/DeferredDecorations";
import ContactSection from "@/components/ContactSection";
import { homepageJsonLd } from "@/lib/seo";

const ScrollAnimationSection = dynamic(
  () => import("@/components/ScrollAnimationSection"),
  {
    ssr: false,
    loading: () => (
      <section className="min-h-[85vh] w-full bg-[#040203] flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-widest">
        <span>LOADING DEEPOS WORKSPACE...</span>
      </section>
    ),
  }
);

export default function Page() {
  return (
    <>
      <script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <main id="main-content" className="site-shell">
        <Navbar />
        <DeferredDecorations />
        <HeroSection />
        <ProjectsSection />
        <CurrentFocusSection />
        <ScrollAnimationSection />
        <ContactSection />
      </main>
    </>
  );
}
