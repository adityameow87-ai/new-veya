import * as THREE from "three";

/* ------------------------------------------------------------------
   Procedural, anatomically-inspired neuron geometry.

   Structure produced:
   - One irregular soma (noise-displaced icosphere, smooth normals)
   - One soft nucleus inside the soma
   - 7–9 primary dendrites, each recursively branching (depth 3)
     into organically curving, naturally tapering tubes
   - One long, gently S-curving axon
   - Segmented myelin-like sheaths along the middle of the axon
   - A terminal arbor of fine branches with glow tips
   All tubes are merged into single BufferGeometries so the whole
   cell renders in a handful of draw calls.
   ------------------------------------------------------------------ */

export interface SignalPath {
  curve: THREE.CatmullRomCurve3;
  length: number;
}

export interface NeuronBuild {
  soma: THREE.BufferGeometry;
  nucleus: THREE.BufferGeometry;
  branches: THREE.BufferGeometry;
  myelin: THREE.BufferGeometry;
  tips: THREE.Vector3[];
  signalPaths: SignalPath[];
}

/* ---------- deterministic PRNG ---------- */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- cheap smooth pseudo-noise ---------- */
function lumpNoise(x: number, y: number, z: number, seed: number): number {
  return (
    Math.sin(x * 2.1 + seed) * Math.cos(y * 1.7 + seed * 0.7) * 0.55 +
    Math.sin(y * 2.6 + z * 1.9 + seed * 1.3) * 0.3 +
    Math.cos(z * 3.1 + x * 1.2 + seed * 0.5) * 0.15
  );
}

function randomUnit(rng: () => number): THREE.Vector3 {
  const u = rng() * 2 - 1;
  const th = rng() * Math.PI * 2;
  const r = Math.sqrt(Math.max(0, 1 - u * u));
  return new THREE.Vector3(r * Math.cos(th), u, r * Math.sin(th));
}

function randomPerp(dir: THREE.Vector3, rng: () => number): THREE.Vector3 {
  const v = randomUnit(rng);
  const perp = new THREE.Vector3().crossVectors(dir, v);
  if (perp.lengthSq() < 1e-6) return randomPerp(dir, rng);
  return perp.normalize();
}

/* ---------- merged tapered tube builder ---------- */
class TubeBuilder {
  positions: number[] = [];
  normals: number[] = [];
  indices: number[] = [];
  vertexCount = 0;

  addTube(
    curve: THREE.CatmullRomCurve3,
    rings: number,
    radial: number,
    radiusAt: (t: number) => number,
    wobbleSeed = 1
  ) {
    const frames = curve.computeFrenetFrames(rings, false);
    const P = new THREE.Vector3();
    const N = new THREE.Vector3();
    const B = new THREE.Vector3();
    const nrm = new THREE.Vector3();
    const base = this.vertexCount;

    for (let i = 0; i <= rings; i++) {
      const t = i / rings;
      curve.getPointAt(t, P);
      N.copy(frames.normals[i]);
      B.copy(frames.binormals[i]);
      for (let j = 0; j <= radial; j++) {
        const a = (j / radial) * Math.PI * 2;
        const sin = Math.sin(a);
        const cos = -Math.cos(a);
        nrm
          .set(
            cos * N.x + sin * B.x,
            cos * N.y + sin * B.y,
            cos * N.z + sin * B.z
          )
          .normalize();
        const wob =
          1 +
          0.06 *
            Math.sin(t * 24 + wobbleSeed * 13 + a * 2) *
            Math.sin(t * 9 + wobbleSeed);
        const r = radiusAt(t) * wob;
        this.positions.push(
          P.x + r * nrm.x,
          P.y + r * nrm.y,
          P.z + r * nrm.z
        );
        this.normals.push(nrm.x, nrm.y, nrm.z);
      }
    }

    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < radial; j++) {
        const a = base + i * (radial + 1) + j;
        const b = a + radial + 1;
        this.indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    this.vertexCount += (rings + 1) * (radial + 1);
  }

  build(): THREE.BufferGeometry {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.positions, 3)
    );
    geo.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(this.normals, 3)
    );
    geo.setIndex(this.indices);
    return geo;
  }
}

/* ---------- organic branch walking ---------- */
interface BranchSpec {
  curve: THREE.CatmullRomCurve3;
  r0: number;
  r1: number;
  len: number;
}

function walkBranch(
  origin: THREE.Vector3,
  dir: THREE.Vector3,
  len: number,
  rng: () => number,
  curl: number
): THREE.Vector3[] {
  const steps = Math.max(4, Math.round(len / 0.45));
  const stepLen = len / steps;
  const pts: THREE.Vector3[] = [origin.clone()];
  const p = origin.clone();
  const d = dir.clone();
  for (let i = 0; i < steps; i++) {
    const jitter = randomUnit(rng).multiplyScalar(curl * (0.5 + rng()));
    d.add(jitter).normalize();
    p.addScaledVector(d, stepLen);
    // gentle gravity-like sweep for realism
    p.y -= stepLen * 0.03 * rng();
    pts.push(p.clone());
  }
  return pts;
}

function growTree(
  origin: THREE.Vector3,
  dir: THREE.Vector3,
  len: number,
  radius: number,
  depth: number,
  rng: () => number,
  out: BranchSpec[],
  tips: THREE.Vector3[],
  signalCandidates: BranchSpec[]
) {
  const pts = walkBranch(origin, dir, len, rng, 0.42);
  const curve = new THREE.CatmullRomCurve3(pts);
  const spec: BranchSpec = {
    curve,
    r0: radius,
    r1: Math.max(radius * 0.5, 0.016),
    len,
  };
  out.push(spec);
  if (depth >= 2) signalCandidates.push(spec);

  if (depth <= 0 || radius < 0.02) {
    tips.push(curve.getPointAt(1));
    return;
  }
  const children = depth >= 2 ? 2 : rng() < 0.7 ? 2 : 1;
  for (let k = 0; k < children; k++) {
    const t = 0.5 + rng() * 0.35;
    const base = curve.getPointAt(t);
    const parent = curve.getTangentAt(t);
    const axis = randomPerp(parent, rng);
    const angle = 0.45 + rng() * 0.7;
    const childDir = parent
      .clone()
      .applyAxisAngle(axis, (rng() < 0.5 ? 1 : -1) * angle)
      .add(randomUnit(rng).multiplyScalar(0.2))
      .normalize();
    growTree(
      base,
      childDir,
      len * (0.5 + rng() * 0.22),
      radius * 0.6,
      depth - 1,
      rng,
      out,
      tips,
      signalCandidates
    );
  }
  if (depth <= 1) tips.push(curve.getPointAt(1));
}

/* ---------- smooth normals for displaced spheres ---------- */
function smoothNormals(geo: THREE.BufferGeometry) {
  const pos = geo.getAttribute("position");
  const map = new Map<string, THREE.Vector3>();
  const tmp = new THREE.Vector3();
  geo.computeVertexNormals(); // faceted first
  const nrm = geo.getAttribute("normal");
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos
      .getZ(i)
      .toFixed(3)}`;
    let acc = map.get(key);
    if (!acc) {
      acc = new THREE.Vector3();
      map.set(key, acc);
    }
    acc.add(tmp.set(nrm.getX(i), nrm.getY(i), nrm.getZ(i)));
  }
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos
      .getZ(i)
      .toFixed(3)}`;
    const acc = map.get(key)!;
    acc.normalize();
    nrm.setXYZ(i, acc.x, acc.y, acc.z);
  }
  nrm.needsUpdate = true;
}

function displacedSphere(
  radius: number,
  detail: number,
  amount: number,
  seed: number,
  scaleY = 1
): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.getAttribute("position");
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    const n = v.clone().normalize();
    const noise = lumpNoise(n.x * 2.2, n.y * 2.2, n.z * 2.2, seed);
    const r = radius * (1 + amount * noise);
    v.copy(n).multiplyScalar(r);
    v.y *= scaleY;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  smoothNormals(geo);
  return geo;
}

/* ================================================================
   MAIN BUILD
   ================================================================ */
export function buildNeuron(seed = 12): NeuronBuild {
  const rng = mulberry32(seed * 9973 + 7);
  const SOMA_R = 1.32;

  /* ----- soma & nucleus ----- */
  const soma = displacedSphere(SOMA_R, 4, 0.13, seed * 0.77, 0.94);
  const nucleus = displacedSphere(0.46, 2, 0.1, seed * 1.31, 0.92);
  nucleus.translate(0.14, 0.06, -0.1);

  /* ----- dendritic tree ----- */
  const axonDir = new THREE.Vector3(0.92, -0.34, 0.22).normalize();
  const branchSpecs: BranchSpec[] = [];
  const tips: THREE.Vector3[] = [];
  const signalCandidates: BranchSpec[] = [];

  const N_PRIMARY = 8;
  for (let i = 0; i < N_PRIMARY; i++) {
    const y = 1 - (i / (N_PRIMARY - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = i * 2.399963;
    let dir = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r);
    dir.add(randomUnit(rng).multiplyScalar(0.35)).normalize();
    // keep dendrites clear of the axon cone
    if (dir.dot(axonDir) > 0.62) {
      dir = dir
        .clone()
        .addScaledVector(axonDir, -1.4 * dir.dot(axonDir))
        .add(randomUnit(rng).multiplyScalar(0.3))
        .normalize();
    }
    const origin = dir.clone().multiplyScalar(SOMA_R * 0.82);
    growTree(
      origin,
      dir,
      2.6 + rng() * 1.5,
      0.15 + rng() * 0.07,
      3,
      rng,
      branchSpecs,
      tips,
      signalCandidates
    );
  }

  /* ----- axon: one long, gently S-curving process ----- */
  const axonOrigin = axonDir.clone().multiplyScalar(SOMA_R * 0.7);
  const axonPts = walkBranch(axonOrigin, axonDir, 12.6, rng, 0.16);
  // add a controlled S-sway perpendicular to the main direction
  const sway = randomPerp(axonDir, rng);
  const sway2 = new THREE.Vector3().crossVectors(axonDir, sway).normalize();
  for (let i = 1; i < axonPts.length; i++) {
    const t = i / (axonPts.length - 1);
    axonPts[i]
      .addScaledVector(sway, Math.sin(t * Math.PI * 1.6) * 1.35 * t)
      .addScaledVector(sway2, Math.sin(t * Math.PI * 2.4 + 0.8) * 0.55 * t);
  }
  const axonCurve = new THREE.CatmullRomCurve3(axonPts);
  const axonSpec: BranchSpec = { curve: axonCurve, r0: 0.27, r1: 0.075, len: 12.6 };

  /* ----- terminal arbor at the axon tip ----- */
  const termSpecs: BranchSpec[] = [];
  {
    const tip = axonCurve.getPointAt(1);
    const tangent = axonCurve.getTangentAt(1);
    growTree(
      tip,
      tangent,
      1.7,
      0.075,
      3,
      rng,
      termSpecs,
      tips,
      signalCandidates
    );
  }

  /* ----- merge branch geometry ----- */
  const builder = new TubeBuilder();
  for (const spec of branchSpecs) {
    const rings = Math.min(16, Math.max(7, Math.round(spec.len * 4)));
    builder.addTube(
      spec.curve,
      rings,
      6,
      (t) => THREE.MathUtils.lerp(spec.r0, spec.r1, Math.pow(t, 0.85)),
      seed * 3 + spec.len
    );
  }
  for (const spec of termSpecs) {
    builder.addTube(
      spec.curve,
      Math.max(6, Math.round(spec.len * 6)),
      5,
      (t) => THREE.MathUtils.lerp(spec.r0, Math.max(spec.r1, 0.014), t),
      seed * 5 + spec.len
    );
  }
  // axon core
  builder.addTube(
    axonCurve,
    64,
    8,
    (t) => THREE.MathUtils.lerp(axonSpec.r0, axonSpec.r1, Math.pow(t, 0.9)),
    seed * 11
  );
  const branches = builder.build();

  /* ----- myelin sheath segments along the axon ----- */
  const myelinBuilder = new TubeBuilder();
  const AXON_LEN = axonCurve.getLength();
  let u = 0.09;
  const nSeg = 7;
  for (let s = 0; s < nSeg; s++) {
    const segParam = (0.72 + rng() * 0.35) * (1.0 / AXON_LEN) * 14.5;
    const u0 = u;
    const u1 = Math.min(u0 + segParam, 0.82);
    if (u1 - u0 < 0.01) break;
    const pts: THREE.Vector3[] = [];
    const SAMPLES = 6;
    for (let k = 0; k <= SAMPLES; k++) {
      pts.push(axonCurve.getPointAt(THREE.MathUtils.lerp(u0, u1, k / SAMPLES)));
    }
    const sub = new THREE.CatmullRomCurve3(pts);
    const uMid = (u0 + u1) / 2;
    const coreR = THREE.MathUtils.lerp(axonSpec.r0, axonSpec.r1, uMid);
    const myelinR = Math.max(coreR * (1.55 + rng() * 0.25), 0.13);
    myelinBuilder.addTube(
      sub,
      14,
      9,
      (t) => {
        const bulge = 1 + 0.16 * Math.sin(Math.PI * t);
        const end =
          THREE.MathUtils.smoothstep(t, 0, 0.18) *
          (1 - THREE.MathUtils.smoothstep(t, 0.82, 1));
        return myelinR * bulge * (0.35 + 0.65 * end);
      },
      seed * 13 + s * 7
    );
    u = u1 + (0.28 + rng() * 0.3) * (1.0 / AXON_LEN) * 14.5;
  }
  const myelin = myelinBuilder.build();

  /* ----- signal paths: long, readable routes for pulses ----- */
  const paths: SignalPath[] = [];
  signalCandidates.sort((a, b) => b.len - a.len);
  for (const spec of signalCandidates.slice(0, 4)) {
    paths.push({ curve: spec.curve, length: spec.curve.getLength() });
  }
  paths.unshift({ curve: axonCurve, length: AXON_LEN });

  return { soma, nucleus, branches, myelin, tips, signalPaths: paths };
}
