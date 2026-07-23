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
  const [videoInView, setVideoInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const loadTimerRef = useRef<number | null>(null);
  const reverse = imageOnLeft ? index % 2 === 0 : index % 2 === 1;

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    if (!media || !video || !project.videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const inView = Boolean(entry?.isIntersecting);
        setVideoInView(inView);

        if (inView) {
          video.play().catch(() => {
            // Autoplay can still be blocked in some browsers; muted helps, but we fail gracefully.
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.45,
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
  const mediaAspect = `${project.width} / ${project.height}`;

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
    }, 5000);
  };

  const stopPreview = () => {
    if (!canPreview) return;
    setPreviewEnabled(false);
  };

  return (
    <article
      className={`group grid items-center gap-8 md:gap-12 lg:grid-cols-2 -translate-y-3 ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      <div className="max-w-xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-white/45">
          {project.eyebrowLabel}
        </p>
        <h3 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2 text-sm text-cyan-100/90"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#0a0a0f] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Visit Site
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
          >
            View Repository
          </a>
        </div>
      </div>

      <div ref={mediaRef} className={`relative ${isPhoneMockup ? "scale-[1.02]" : "scale-[1.015]"}`}>
        <div className="absolute -inset-6 rounded-[2.2rem] bg-cyan-300/20 blur-3xl opacity-100" />
        <div
          className={`relative w-full ${
            isPhoneMockup ? "max-w-[360px]" : "max-w-[860px]"
          } rounded-[2rem] border border-cyan-200/40 bg-[linear-gradient(180deg,rgba(18,18,24,0.96),rgba(10,10,15,0.98))] p-4 shadow-[0_34px_130px_rgba(0,0,0,0.85)] -translate-y-2 rotate-[-1.2deg]`}
        >
          <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b10]">
            {isPhoneMockup ? (
              <div className="flex h-14 flex-none items-center justify-center border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4">
                <div className="relative flex w-full items-center justify-center">
                  <div className="absolute left-0 h-2.5 w-2.5 rounded-full bg-white/70" />
                  <div className="rounded-full border border-white/10 bg-black/50 px-4 py-1 text-[10px] text-white/55">
                    {project.mockDomain}
                  </div>
                  <div className="absolute right-0 h-2.5 w-2.5 rounded-full bg-white/70" />
                </div>
              </div>
            ) : (
              <div className="flex h-12 flex-none items-center gap-3 border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
                </div>
                <div className="flex-1 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/45">
                  {project.mockDomain}
                </div>
              </div>
            )}

            <div
              className={`relative min-h-0 flex-1 overflow-hidden bg-[#0d1016] ${
                isPhoneMockup ? "aspect-[528/907]" : "aspect-[21/10]"
              }`}
              onMouseEnter={startPreview}
              onMouseLeave={stopPreview}
              onTouchStart={startPreview}
              onClick={startPreview}
              role={canPreview ? "button" : undefined}
              tabIndex={canPreview ? 0 : -1}
            >
              {project.videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      videoInView ? "opacity-100" : "opacity-85"
                    }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/20" />
                </>
              ) : isPhoneMockup ? (
                <>
                  <div className="absolute inset-x-0 top-0 z-20 mx-auto mt-2 h-1.5 w-28 rounded-full bg-white/25" />
                  <img
                    src={project.screenshotUrl}
                    alt={`${project.title} screenshot`}
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
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_15%,rgba(0,255,255,0.08),transparent_28%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </>
              ) : (
                <>
                  <img
                    src={project.screenshotUrl}
                    alt={`${project.title} screenshot`}
                    className={`absolute inset-0 h-full w-full object-cover object-left-top scale-[1.08] brightness-110 transition-all duration-300 ${
                      previewEnabled && previewReady && !previewFailed ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-transparent to-white/0 opacity-25" />
                  {previewEnabled && !previewFailed && project.livePreviewUrl ? (
                    <iframe
                      src={project.livePreviewUrl}
                      title={`${project.title} live preview`}
                      className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
                        previewReady ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
