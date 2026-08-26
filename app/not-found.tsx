import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SITE_PROFILE } from "@/lib/projects.config";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-[#040203] px-6 pb-24 pt-36 text-[#f4f0e8] sm:px-10 md:px-14 lg:px-20">
      <Navbar />
      <section className="mx-auto max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e61924]">404 / NOT FOUND</span>
        <h1 className="mt-5 font-bebas text-8xl uppercase leading-[0.9] tracking-wide text-white sm:text-9xl">This route disappeared.</h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
          The page you requested is not part of the {SITE_PROFILE.brandName} workspace.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-lg bg-[#e61924] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff2430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]">
          Return to home
        </Link>
      </section>
    </main>
  );
}
