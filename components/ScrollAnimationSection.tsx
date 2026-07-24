"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function ScrollAnimationSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-10">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.5em] text-white/40">
              Interactive Preview
            </p>
            <h1 className="font-clash text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Unleash the Power of <br />
              <span className="font-clash mt-2 block bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-5xl font-bold tracking-[-0.04em] text-transparent md:text-[6rem]">
                Scroll Animations
              </span>
            </h1>
          </div>
        }
      >
        <Image
          src="https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75"
          alt="Dashboard preview"
          height={720}
          width={1400}
          className="mx-auto h-full w-full rounded-2xl object-cover object-left-top"
          draggable={false}
          priority
        />
      </ContainerScroll>
    </section>
  );
}
