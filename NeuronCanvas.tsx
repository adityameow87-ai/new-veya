"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { NeuronWorld } from "./NeuronWorld";
import { sceneState } from "./sceneState";

/** Static, always-available neuron visual (noscript / no-WebGL / error). */
export function FallbackVisual({ note }: { note?: string }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src="/images/neuron-fallback.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="scene-shade absolute inset-0" />
      <div className="scene-shade-b absolute inset-0" />
      {note && (
        <p className="absolute bottom-5 right-5 rounded-full border border-border bg-surface-glass px-3.5 py-1.5 text-xs text-muted backdrop-blur-md">
          {note}
        </p>
      )}
    </div>
  );
}

export function NeuronLoading() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src="/images/neuron-fallback.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover opacity-40 blur-[2px]"
      />
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute bottom-8 left-1/2 w-44 -translate-x-1/2">
        <p className="mb-2 text-center text-xs tracking-[0.2em] text-muted uppercase">
          Preparing the experience
        </p>
        <div className="h-[3px] overflow-hidden rounded-full bg-border">
          <div className="animate-pulse-soft h-full w-1/2 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}

function webglAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export default function NeuronCanvas() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);

  const quality = useMemo<"high" | "low">(() => {
    if (typeof window === "undefined") return "high";
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency ?? 8;
    return coarse || narrow || cores <= 4 ? "low" : "high";
  }, []);

  const dpr = useMemo<[number, number]>(() => {
    if (typeof window === "undefined") return [1, 1.75];
    const max = quality === "low" ? 1.35 : 1.8;
    return [1, Math.min(window.devicePixelRatio || 1, max)];
  }, [quality]);

  useEffect(() => {
    setSupported(webglAvailable());

    // Sync theme + motion preferences into the mutable scene state.
    const readTheme = () => {
      sceneState.theme =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";
    };
    readTheme();
    const onTheme = () => readTheme();
    window.addEventListener("veya-theme", onTheme);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => {
      sceneState.reducedMotion = mq.matches;
    };
    applyMotion();
    mq.addEventListener("change", applyMotion);

    return () => {
      window.removeEventListener("veya-theme", onTheme);
      mq.removeEventListener("change", applyMotion);
    };
  }, []);

  if (supported === false || contextLost) {
    return (
      <FallbackVisual
        note={
          contextLost
            ? "3D preview paused — showing a still render"
            : "Showing a still render of the Veya neuron"
        }
      />
    );
  }
  if (supported === null) return <NeuronLoading />;

  return (
    <Canvas
      aria-hidden
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      camera={{ position: [0.6, 1.2, 12.6], fov: 40, near: 0.1, far: 90 }}
      dpr={dpr}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#000000"), 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setContextLost(true);
        });
      }}
      className="pointer-events-none"
    >
      <Suspense fallback={null}>
        <NeuronWorld quality={quality} />
      </Suspense>
    </Canvas>
  );
}
