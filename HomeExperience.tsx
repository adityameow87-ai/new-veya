"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneState } from "@/components/three/sceneState";
import { NeuronLoading } from "@/components/three/NeuronCanvas";

const NeuronCanvas = dynamic(() => import("@/components/three/NeuronCanvas"), {
  ssr: false,
  loading: () => <NeuronLoading />,
});

/**
 * One continuous scroll journey through a single neuron.
 * The WebGL canvas stays fixed behind the whole track; GSAP
 * ScrollTrigger maps track progress → sceneState, and the R3F
 * frame loop interpolates camera keyframes from that. Scrolling
 * up naturally reverses everything.
 */
export function HomeExperience({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        sceneState.progress = self.progress;
      },
      onRefresh: (self) => {
        sceneState.progress = self.progress;
      },
    });
    return () => {
      st.kill();
      sceneState.progress = 0;
      sceneState.smooth = 0;
    };
  }, []);

  return (
    <div ref={trackRef} className="relative">
      {/* fixed 3D layer */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <NeuronCanvas />
        {/* soft vignette so UI text always sits on a calm field */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_55%,var(--bg)_125%)]" />
      </div>
      {/* content track */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
