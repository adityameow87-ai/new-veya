"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { buildNeuron } from "./neuronGeometry";
import { sceneState } from "./sceneState";

/* ---------------- camera choreography keyframes ---------------- */
interface Key {
  t: number;
  pos: [number, number, number];
  tgt: [number, number, number];
  rotY: number;
  rotX: number;
  glow: number;
}

const KEYS: Key[] = [
  // Scene 1 — wide cinematic establishing shot
  { t: 0.0, pos: [0.6, 1.2, 12.6], tgt: [1.6, -0.3, 0], rotY: 0.1, rotX: 0.02, glow: 1 },
  // Scene 2 — websites: orbit left, soma sits right of frame
  { t: 0.19, pos: [-3.6, 1.7, 9.6], tgt: [-1.6, -0.1, 0], rotY: 0.5, rotX: -0.04, glow: 1 },
  // Scene 3 — automations: orbit right, soma left, axon leads the eye
  { t: 0.35, pos: [5.0, -1.0, 8.6], tgt: [2.6, -1.4, 0.3], rotY: 0.95, rotX: 0.05, glow: 1.15 },
  // Scene 4 — connected: higher, wider, whole system visible
  { t: 0.5, pos: [0.5, 4.2, 11.4], tgt: [2.2, -1.6, 0], rotY: 0.55, rotX: -0.03, glow: 1.25 },
  // Scene 5 — portfolio: far, calm pull-back
  { t: 0.63, pos: [1.0, 1.0, 14.6], tgt: [2.2, -0.9, 0], rotY: 0.25, rotX: 0, glow: 1 },
  // Interlude — solid content sections, neuron rests far away
  { t: 0.79, pos: [1.4, 0.6, 15.2], tgt: [2.2, -1.0, 0], rotY: 0.2, rotX: 0, glow: 1 },
  // Finale — full silhouette, nucleus brightens
  { t: 1.0, pos: [0.0, 1.8, 12.8], tgt: [1.8, -0.6, 0], rotY: 0.12, rotX: 0.02, glow: 1.8 },
];

function smootherstep(x: number): number {
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/* ------------------------- palettes ----------------------------- */
interface Palette {
  branch: THREE.Color;
  branchEmissive: THREE.Color;
  myelin: THREE.Color;
  soma: THREE.Color;
  somaEmissive: THREE.Color;
  somaOpacity: number;
  nucleus: THREE.Color;
  nucleusEmissive: THREE.Color;
  nucleusIntensity: number;
  tip: THREE.Color;
  pulse: THREE.Color;
  sparkle: string;
  ambient: number;
  key: number;
  rim: number;
  core: number;
  env: number;
}

const DARK: Palette = {
  branch: new THREE.Color("#1f6a45"),
  branchEmissive: new THREE.Color("#0b3522"),
  myelin: new THREE.Color("#aebd8f"),
  soma: new THREE.Color("#0e4230"),
  somaEmissive: new THREE.Color("#07281a"),
  somaOpacity: 0.62,
  nucleus: new THREE.Color("#173312"),
  nucleusEmissive: new THREE.Color("#a3e635"),
  nucleusIntensity: 2.6,
  tip: new THREE.Color("#9ff5c4"),
  pulse: new THREE.Color("#d9f99d"),
  sparkle: "#a7f3d0",
  ambient: 0.32,
  key: 1.7,
  rim: 2.4,
  core: 16,
  env: 0.7,
};

const LIGHT: Palette = {
  branch: new THREE.Color("#155e3c"),
  branchEmissive: new THREE.Color("#0d3d27"),
  myelin: new THREE.Color("#6f8f5a"),
  soma: new THREE.Color("#5cae86"),
  somaEmissive: new THREE.Color("#173d2a"),
  somaOpacity: 0.86,
  nucleus: new THREE.Color("#1a3312"),
  nucleusEmissive: new THREE.Color("#65a30d"),
  nucleusIntensity: 1.8,
  tip: new THREE.Color("#047857"),
  pulse: new THREE.Color("#166534"),
  sparkle: "#1c5c40",
  ambient: 0.62,
  key: 2.3,
  rim: 1.5,
  core: 9,
  env: 0.9,
};

export function NeuronWorld({ quality }: { quality: "high" | "low" }) {
  const build = useMemo(() => buildNeuron(12), []);
  const group = useRef<THREE.Group>(null);

  const somaMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const branchMat = useRef<THREE.MeshStandardMaterial>(null);
  const myelinMat = useRef<THREE.MeshStandardMaterial>(null);
  const nucleusMat = useRef<THREE.MeshStandardMaterial>(null);
  const tipMat = useRef<THREE.MeshBasicMaterial>(null);
  const pulseMat = useRef<THREE.MeshBasicMaterial>(null);
  const haloMat = useRef<THREE.SpriteMaterial>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const rimLight = useRef<THREE.DirectionalLight>(null);
  const ambLight = useRef<THREE.AmbientLight>(null);

  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const pulseMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const mix = useRef(0); // 0 = dark, 1 = light
  const prevTheme = useRef(sceneState.theme);
  const [sparkTheme, setSparkTheme] = useState(sceneState.theme);

  useEffect(() => {
    const onTheme = () =>
      setSparkTheme(
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark"
      );
    window.addEventListener("veya-theme", onTheme);
    return () => window.removeEventListener("veya-theme", onTheme);
  }, []);

  const haloTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(200,255,220,1)");
    grd.addColorStop(0.35, "rgba(120,240,180,0.4)");
    grd.addColorStop(1, "rgba(120,240,180,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const pulseParams = useMemo(
    () =>
      Array.from({ length: quality === "high" ? 5 : 3 }, (_, i) => ({
        path: i % build.signalPaths.length,
        speed: 0.09 + (i % 3) * 0.035,
        offset: i * 0.27,
      })),
    [build, quality]
  );

  const tipCount = build.tips.length;
  const tipsRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!tipsRef.current) return;
    const m = new THREE.Matrix4();
    build.tips.forEach((p, i) => {
      m.makeTranslation(p.x, p.y, p.z);
      tipsRef.current!.setMatrixAt(i, m);
    });
    tipsRef.current.instanceMatrix.needsUpdate = true;
    sceneState.ready = true;
  }, [build]);

  const scratch = useMemo(
    () => ({ pos: new THREE.Vector3(), tgt: new THREE.Vector3() }),
    []
  );

  useFrame((state, dt) => {
    const reduced = sceneState.reducedMotion;
    const dark = sceneState.theme === "dark";
    mix.current = THREE.MathUtils.damp(mix.current, dark ? 0 : 1, 5, dt);
    const m = mix.current;

    /* ---- theme-aware material / light interpolation ---- */
    const lerpC = (a: THREE.Color, b: THREE.Color) =>
      a.clone().lerp(b, m);
    const lerpN = (a: number, b: number) => THREE.MathUtils.lerp(a, b, m);

    if (branchMat.current) {
      branchMat.current.color.copy(lerpC(DARK.branch, LIGHT.branch));
      branchMat.current.emissive.copy(
        lerpC(DARK.branchEmissive, LIGHT.branchEmissive)
      );
    }
    if (myelinMat.current)
      myelinMat.current.color.copy(lerpC(DARK.myelin, LIGHT.myelin));
    if (somaMat.current) {
      somaMat.current.color.copy(lerpC(DARK.soma, LIGHT.soma));
      somaMat.current.emissive.copy(
        lerpC(DARK.somaEmissive, LIGHT.somaEmissive)
      );
      somaMat.current.opacity = lerpN(DARK.somaOpacity, LIGHT.somaOpacity);
      somaMat.current.envMapIntensity = lerpN(DARK.env, LIGHT.env);
    }
    if (nucleusMat.current) {
      nucleusMat.current.emissiveIntensity = lerpN(
        DARK.nucleusIntensity,
        LIGHT.nucleusIntensity
      );
      nucleusMat.current.emissive.copy(
        lerpC(DARK.nucleusEmissive, LIGHT.nucleusEmissive)
      );
    }
    if (ambLight.current)
      ambLight.current.intensity = lerpN(DARK.ambient, LIGHT.ambient);
    if (keyLight.current)
      keyLight.current.intensity = lerpN(DARK.key, LIGHT.key);
    if (rimLight.current)
      rimLight.current.intensity = lerpN(DARK.rim, LIGHT.rim);

    // Additive glows only work on dark backgrounds — swap blending once.
    if (prevTheme.current !== sceneState.theme) {
      const additive = sceneState.theme === "dark";
      const glowMats: (THREE.Material | null)[] = [
        tipMat.current,
        haloMat.current,
        ...pulseMats.current,
      ];
      for (const mat of glowMats) {
        if (!mat) continue;
        mat.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
        mat.needsUpdate = true;
      }
      prevTheme.current = sceneState.theme;
    }
    if (tipMat.current)
      tipMat.current.color.copy(lerpC(DARK.tip, LIGHT.tip));
    if (pulseMat.current)
      pulseMat.current.color.copy(lerpC(DARK.pulse, LIGHT.pulse));
    for (const pm of pulseMats.current)
      if (pm) pm.color.copy(lerpC(DARK.pulse, LIGHT.pulse));
    if (haloMat.current)
      haloMat.current.color.copy(lerpC(DARK.tip, LIGHT.tip));

    /* ---- scroll-driven camera rig ---- */
    sceneState.smooth = THREE.MathUtils.damp(
      sceneState.smooth,
      sceneState.progress,
      4.0,
      dt
    );
    const k = reduced ? 0 : sceneState.smooth;

    let i = 0;
    while (i < KEYS.length - 2 && k > KEYS[i + 1].t) i++;
    const a = KEYS[i];
    const b = KEYS[i + 1];
    const local = smootherstep(
      THREE.MathUtils.clamp((k - a.t) / (b.t - a.t), 0, 1)
    );

    const L = THREE.MathUtils.lerp;
    scratch.pos.set(
      L(a.pos[0], b.pos[0], local),
      L(a.pos[1], b.pos[1], local),
      L(a.pos[2], b.pos[2], local)
    );
    scratch.tgt.set(
      L(a.tgt[0], b.tgt[0], local),
      L(a.tgt[1], b.tgt[1], local),
      L(a.tgt[2], b.tgt[2], local)
    );
    const rotY = L(a.rotY, b.rotY, local);
    const rotX = L(a.rotX, b.rotX, local);
    const glow = L(a.glow, b.glow, local);

    const cam = state.camera;
    // gentle idle drift (disabled for reduced motion)
    if (!reduced) {
      const t = state.clock.elapsedTime;
      scratch.pos.x += Math.sin(t * 0.21) * 0.12;
      scratch.pos.y += Math.cos(t * 0.17) * 0.09;
    }
    cam.position.lerp(scratch.pos, reduced ? 1 : 1 - Math.pow(0.0001, dt));
    cam.lookAt(scratch.tgt);

    if (group.current) {
      const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
      group.current.rotation.y = rotY + idle;
      group.current.rotation.x = rotX;
    }

    /* ---- nucleus breathing + core light ---- */
    const breath = reduced
      ? 1
      : 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
    if (coreLight.current)
      coreLight.current.intensity = lerpN(DARK.core, LIGHT.core) * glow * breath;
    if (nucleusMat.current)
      nucleusMat.current.emissiveIntensity =
        lerpN(DARK.nucleusIntensity, LIGHT.nucleusIntensity) * glow * breath;

    /* ---- signal pulses along branches ---- */
    const sig = reduced
      ? 0
      : THREE.MathUtils.smoothstep(k, 0.27, 0.37) *
        (1 - THREE.MathUtils.smoothstep(k, 0.55, 0.68));
    sceneState.signal = sig;
    pulses.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const params = pulseParams[idx];
      const path = build.signalPaths[params.path];
      const tU =
        (state.clock.elapsedTime * params.speed + params.offset) % 1;
      path.curve.getPointAt(tU, mesh.position);
      const s = sig > 0.04 ? 0.55 + 0.45 * Math.sin(tU * Math.PI) : 0.0001;
      mesh.scale.setScalar(Math.max(s, 0.0001));
    });
  });

  const sparkleCount = quality === "high" ? 110 : 40;

  return (
    <>
      {/* lighting */}
      <ambientLight ref={ambLight} intensity={DARK.ambient} color="#cfeedd" />
      <directionalLight
        ref={keyLight}
        position={[5, 7, 6]}
        intensity={DARK.key}
        color="#eafff2"
      />
      <directionalLight
        ref={rimLight}
        position={[-7, 2.5, -5]}
        intensity={DARK.rim}
        color="#34d399"
      />

      {/* the neuron */}
      <group ref={group}>
        {/* soma membrane */}
        <mesh geometry={build.soma}>
          <meshPhysicalMaterial
            ref={somaMat}
            color={DARK.soma}
            emissive={DARK.somaEmissive}
            emissiveIntensity={0.85}
            roughness={0.3}
            metalness={0.05}
            clearcoat={0.85}
            clearcoatRoughness={0.35}
            transparent
            opacity={DARK.somaOpacity}
            envMapIntensity={DARK.env}
            depthWrite={false}
          />
        </mesh>
        {/* nucleus */}
        <mesh geometry={build.nucleus}>
          <meshStandardMaterial
            ref={nucleusMat}
            color={DARK.nucleus}
            emissive={DARK.nucleusEmissive}
            emissiveIntensity={DARK.nucleusIntensity}
            roughness={0.55}
          />
        </mesh>
        {/* nucleus halo */}
        <sprite position={[0.14, 0.06, -0.1]} scale={[3.1, 3.1, 1]}>
          <spriteMaterial
            ref={haloMat}
            map={haloTexture}
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            color={DARK.tip}
          />
        </sprite>
        {/* nucleus core light */}
        <pointLight
          ref={coreLight}
          position={[0.1, 0.05, -0.05]}
          intensity={DARK.core}
          distance={9}
          decay={2}
          color="#7cf7c4"
        />

        {/* dendrites + axon */}
        <mesh geometry={build.branches}>
          <meshStandardMaterial
            ref={branchMat}
            color={DARK.branch}
            emissive={DARK.branchEmissive}
            emissiveIntensity={0.6}
            roughness={0.48}
            metalness={0.12}
            envMapIntensity={0.55}
          />
        </mesh>

        {/* myelin sheath */}
        <mesh geometry={build.myelin}>
          <meshStandardMaterial
            ref={myelinMat}
            color={DARK.myelin}
            roughness={0.62}
            metalness={0.05}
            envMapIntensity={0.4}
          />
        </mesh>

        {/* glowing synaptic tips */}
        <instancedMesh
          ref={tipsRef}
          args={[undefined, undefined, tipCount]}
          frustumCulled={false}
        >
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial
            ref={tipMat}
            color={DARK.tip}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </instancedMesh>

        {/* travelling signal pulses */}
        {pulseParams.map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              pulses.current[i] = el;
            }}
            scale={0.0001}
          >
            <sphereGeometry args={[0.085, 10, 10]} />
            <meshBasicMaterial
              ref={(el) => {
                pulseMats.current[i] = el;
                if (i === 0) pulseMat.current = el;
              }}
              color={DARK.pulse}
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* ambient microscopic particles */}
        <Sparkles
          count={sparkleCount}
          scale={[18, 11, 11]}
          position={[2, -0.5, 0]}
          size={2.2}
          speed={0.22}
          opacity={0.5}
          color={sparkTheme === "dark" ? DARK.sparkle : LIGHT.sparkle}
        />
        <Sparkles
          count={Math.round(sparkleCount / 2)}
          scale={[8, 4.5, 6]}
          position={[6.5, -2.2, 0]}
          size={1.6}
          speed={0.35}
          opacity={0.6}
          color={sparkTheme === "dark" ? DARK.sparkle : LIGHT.sparkle}
        />
      </group>

      {/* locally-rendered environment reflections (no network fetch) */}
      <Environment resolution={64}>
        <Lightformer
          intensity={2}
          position={[0, 5, 0]}
          rotation-x={Math.PI / 2}
          scale={[10, 10, 1]}
          color="#c9ffe2"
        />
        <Lightformer
          intensity={1.4}
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[8, 2, 1]}
          color="#34d399"
        />
        <Lightformer
          intensity={0.8}
          position={[6, -2, 2]}
          rotation-y={-Math.PI / 2}
          scale={[8, 2, 1]}
          color="#b9cf6d"
        />
      </Environment>
    </>
  );
}
