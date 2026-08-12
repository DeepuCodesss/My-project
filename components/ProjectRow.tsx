"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects.config";

type ProjectRowProps = {
  project: Project;
  index: number;
  imageOnLeft?: boolean;
};

export default function ProjectRow({
  project,
  index,
  imageOnLeft = false,
}: ProjectRowProps) {
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const loadTimerRef = useRef<number | null>(null);
  const reverse = imageOnLeft ? index % 2 === 0 : index % 2 === 1;

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    if (!media || !video || !project.videoUrl) return;

    // Ensure DOM element is explicitly muted before playback attempt
    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const inView = Boolean(entry?.isIntersecting);

        if (inView) {
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Playback prevented or interrupted; poster fallback remains visible
            });
          }
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "150px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(media);

    return () => {
      observer.disconnect();
      if (loadTimerRef.current) {
        window.clearTimeout(loadTimerRef.current);
      }
    };
  }, [project.videoUrl]);

  const canPreview = Boolean(project.allowLivePreview && project.livePreviewUrl);
  const isPhoneMockup = project.mockupVariant === "phone";

  const startPreview = () => {
    if (!canPreview || previewEnabled || previewFailed) return;
    setPreviewEnabled(true);
    setPreviewReady(false);
    if (loadTimerRef.current) {
      window.clearTimeout(loadTimerRef.current);
    }
    loadTimerRef.current = window.setTimeout(() => {
      setPreviewFailed(true);
      setPreviewEnabled(false);
      setPreviewReady(false);
    }, 6000);
  };

  return (
    <article
      className={`group grid items-center gap-10 lg:gap-14 lg:grid-cols-12 ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      {/* Project Text & Actions Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0c0507]/90 border border-red-900/30 hover:border-red-600/50 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(230,25,36,0.2)]">
        <div>
          {/* Index & Eyebrow */}
          <div className="flex items-center justify-between border-b border-red-950/60 pb-4 mb-6">
            <span className="font-mono text-xs font-semibold text-[#e61924] tracking-widest">
              PROJECT 0{index + 1}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 bg-black/60 px-3 py-1 rounded-full border border-red-900/30">
              {project.eyebrowLabel}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-wide text-white leading-none group-hover:text-[#e61924] transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70 font-space font-normal">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-red-900/40 bg-red-950/20 px-3 py-1 text-xs font-mono font-medium text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-red-950/60 flex flex-wrap items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#e61924] hover:bg-[#ff2430] px-6 py-2.5 text-xs font-space font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(230,25,36,0.4)] transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]"
          >
            Visit Site <span className="ml-1.5" aria-hidden="true">↗</span>
          </a>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-red-900/40 bg-black/40 hover:bg-red-950/30 px-6 py-2.5 text-xs font-space font-medium uppercase tracking-wider text-white/80 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e61924]"
            >
              Repository
            </a>
          )}
        </div>
      </div>

      {/* Project Media Showcase Panel */}
      <div className="lg:col-span-7">
        <div
          ref={mediaRef}
          className={`relative ${
            isPhoneMockup ? "mx-auto w-full max-w-[340px] sm:max-w-[360px]" : "w-full max-w-[860px]"
          }`}
        >
          <div className="absolute -inset-4 rounded-[2.2rem] bg-[#e61924]/10 blur-3xl opacity-75 pointer-events-none" />
          <div
            className={`relative w-full rounded-[1.8rem] border border-red-900/40 bg-[#0a0406] p-3 sm:p-4 shadow-[0_34px_120px_rgba(0,0,0,0.9)] ${
              isPhoneMockup ? "" : "rotate-[-0.5deg] group-hover:rotate-0 transition-transform duration-500"
            }`}
          >
            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.2rem] border border-red-950/60 bg-[#050203]">
              {isPhoneMockup ? (
                <div className="flex h-11 flex-none items-center justify-center border-b border-red-950/60 bg-black/60 px-4">
                  <div className="relative flex w-full items-center justify-center">
                    <div className="absolute left-0 h-2 w-2 rounded-full bg-[#e61924]" />
                    <div className="rounded-full border border-red-900/30 bg-black/80 px-4 py-0.5 text-[10px] font-mono text-white/60">
                      {project.mockDomain}
                    </div>
                    <div className="absolute right-0 h-2 w-2 rounded-full bg-[#e61924]" />
                  </div>
                </div>
              ) : (
                <div className="flex h-10 flex-none items-center gap-3 border-b border-red-950/60 bg-black/60 px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 rounded-full border border-red-900/30 bg-black/60 px-4 py-1 text-[11px] font-mono text-white/50">
                    {project.mockDomain}
                  </div>
                </div>
              )}

              <div
                className={`relative min-h-0 flex-1 overflow-hidden bg-[#040203] ${
                  isPhoneMockup ? "aspect-[528/907]" : "aspect-[21/10]"
                }`}
                onClick={canPreview ? startPreview : undefined}
                role={canPreview ? "button" : undefined}
                tabIndex={canPreview ? 0 : -1}
                aria-label={canPreview ? `Click to launch interactive preview of ${project.title}` : undefined}
              >
                {project.videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      poster={project.screenshotUrl}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onError={(e) => {
                        console.error(`Failed to load video: ${project.videoUrl}`, e);
                      }}
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                  </>
                ) : isPhoneMockup ? (
                  <>
                    <div className="absolute inset-x-0 top-0 z-20 mx-auto mt-2 h-1.5 w-28 rounded-full bg-white/25" />
                    <img
                      src={project.screenshotUrl}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                      width={project.width}
                      height={project.height}
                      className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-300 ${
                        previewEnabled && previewReady && !previewFailed
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                    />
                    {previewEnabled && !previewFailed && project.livePreviewUrl ? (
                      <iframe
                        src={project.livePreviewUrl}
                        title={`${project.title} live preview`}
                        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
                          previewReady ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                        onLoad={() => {
                          if (loadTimerRef.current) {
                            window.clearTimeout(loadTimerRef.current);
                          }
                          setPreviewReady(true);
                        }}
                        onError={() => {
                          if (loadTimerRef.current) {
                            window.clearTimeout(loadTimerRef.current);
                          }
                          setPreviewFailed(true);
                          setPreviewEnabled(false);
                          setPreviewReady(false);
                        }}
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-red-900/20 bg-[radial-gradient(circle_at_50%_15%,rgba(230,25,36,0.08),transparent_30%)]" />
                  </>
                ) : (
                  <>
                    <img
                      src={project.screenshotUrl}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                      width={project.width}
                      height={project.height}
                      className={`absolute inset-0 h-full w-full object-cover object-left-top scale-[1.03] transition-all duration-300 ${
                        previewEnabled && previewReady && !previewFailed ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-black/30 opacity-40" />
                    {previewEnabled && !previewFailed && project.livePreviewUrl ? (
                      <iframe
                        src={project.livePreviewUrl}
                        title={`${project.title} live preview`}
                        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
                          previewReady ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                        onLoad={() => {
                          if (loadTimerRef.current) {
                            window.clearTimeout(loadTimerRef.current);
                          }
                          setPreviewReady(true);
                        }}
                        onError={() => {
                          if (loadTimerRef.current) {
                            window.clearTimeout(loadTimerRef.current);
                          }
                          setPreviewFailed(true);
                          setPreviewEnabled(false);
                          setPreviewReady(false);
                        }}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

