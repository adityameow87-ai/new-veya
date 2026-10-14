import type { ResolvedTheme } from "@/lib/theme";

/**
 * Mutable, module-level scene state shared between the DOM-driven
 * scroll choreography and the WebGL frame loop. Mutating a plain
 * object avoids React re-renders at 60fps; R3F reads it in useFrame.
 */
export const sceneState = {
  /** Raw scroll progress 0..1 across the homepage track. */
  progress: 0,
  /** Smoothed progress actually used by the camera rig. */
  smooth: 0,
  theme: "dark" as ResolvedTheme,
  reducedMotion: false,
  /** 0..1 — how strongly signal pulses travel the branches. */
  signal: 0,
  /** True once the neuron geometry has been built at least once. */
  ready: false,
};
