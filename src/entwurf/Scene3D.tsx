import { useEffect, useRef } from "react";
import type * as T from "three";

export type Motif =
  | "schichten"
  | "pfaehle"
  | "lamellen"
  | "module"
  | "linien"
  | "ringe"
  | "halle"
  | "leiterbahnen"
  | "fliessband";

/** Kleiner, fester Zufallsgenerator: gleiche Zahlenfolge bei jedem Laden. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Placement = { z: number; pos: [number, number, number]; fog?: [number, number] };
type Kit = {
  camera: T.PerspectiveCamera;
  RoundedBox: new (w: number, h: number, d: number, segments?: number, radius?: number) => T.BufferGeometry;
};
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
type Built = {
  update: (t: number, p: number, mx: number, my: number) => void;
  place: (narrow: boolean) => Placement;
};

/**
 * Leitmotive für den ersten Bildschirm. Alle vier sind abstrakt, schwarz-weiß und
 * im selben Studiolicht gebaut:
 *  - schichten: gestapelte Platten, die sich zu einem Turm verdrehen (aufstocken)
 *  - pfaehle:   ein Feld aus Gründungspfählen, das wie Gelände atmet (Fundament)
 *  - lamellen:  ein Band aus schmalen Lamellen, durch das eine Welle läuft (Ablauf)
 *  - linien:       eine Fläche aus feinen Linien, die wie Gelände fließt (Daten)
 *  - ringe:        ineinander drehende Ringe wie ein Präzisionsinstrument (Abläufe)
 *  - halle:        ein Gang aus Stützen und Trägern, durch den man langsam geht (Produktion)
 *  - leiterbahnen: Schaltungsbahnen, über die Lichtimpulse laufen (Steuerung)
 *  - fliessband:   Kisten auf drei Bahnen, die gleichmäßig durchlaufen (Automatisierung)
 *  - module:    13 Würfel, unten das Fundament, darauf gestuft aufgestockt (13 Module)
 */
function build(
  THREE: typeof T,
  kit: Kit,
  motif: Motif,
  group: T.Group,
  mat: T.Material,
  trash: { dispose(): void }[],
): Built {
  if (motif === "schichten") {
    // Unten eine breite Grundplatte (das Fundament), darauf wird Platte für Platte aufgestockt.
    const N = 22;
    const gap = 0.215;
    const baseH = 0.36;
    const y0 = -2.55;
    const slabGeo = new kit.RoundedBox(3.1, 0.125, 1.95, 2, 0.028);
    const baseGeo = new kit.RoundedBox(4.2, baseH, 2.9, 3, 0.04);
    trash.push(slabGeo, baseGeo);
    const base = new THREE.Mesh(baseGeo, mat);
    base.position.y = y0;
    group.add(base);
    const slabs: T.Mesh[] = [];
    for (let i = 0; i < N; i++) {
      const m = new THREE.Mesh(slabGeo, mat);
      group.add(m);
      slabs.push(m);
    }
    return {
      update: (t, p, mx, my) => {
        slabs.forEach((m, i) => {
          // Aufbau beim Laden: jede Platte senkt sich von oben an ihren Platz
          const u = (t - 0.3 - i * 0.065) / 0.95;
          const e = easeOut(u);
          const taper = 1 - (i / (N - 1)) * 0.2;
          const grow = easeOut(u * 2.5);
          m.visible = u > 0;
          m.scale.set(taper * grow, 1, taper * grow);
          m.position.y = y0 + baseH / 2 + 0.14 + i * gap * (1 + p * 0.5) + (1 - e) * 1.3;
          m.rotation.y = i * 0.082 * (1 + p * 1.1) + Math.sin(t * 0.3 + i * 0.18) * 0.05 + (1 - e) * 0.7;
        });
        group.rotation.y = 0.55 + mx * 0.2 + t * 0.035;
        group.rotation.x = 0.12 + my * 0.06;
      },
      place: (narrow) => (narrow ? { z: 25, pos: [0, 2.9, 0] } : { z: 14, pos: [3.1, 0.3, 0] }),
    };
  }

  if (motif === "pfaehle") {
    // Rundes Feld aus Gründungspfählen. Es atmet wie Gelände und hebt sich unter dem Mauszeiger.
    const G = 46;
    const sp = 0.2;
    const R = 4.5;
    const geo = new THREE.BoxGeometry(0.15, 1, 0.15);
    geo.translate(0, 0.5, 0);
    trash.push(geo);
    const inst = new THREE.InstancedMesh(geo, mat, G * G);
    group.add(inst);
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const inv = new THREE.Matrix4();
    const target = new THREE.Vector3(0, 0, 0);
    const hit = new THREE.Vector3(0, 0, 0);
    let hover = 0;
    let moved = false;
    return {
      update: (t, p, mx, my) => {
        group.rotation.y = 0.7 + mx * 0.12 + t * 0.02;
        group.rotation.x = 0.34 + my * 0.05;
        group.updateMatrixWorld();

        // Wo zeigt die Maus auf das Feld? (Strahl in das Koordinatensystem des Feldes umrechnen)
        if (mx !== 0 || my !== 0) moved = true;
        hover += ((moved ? 1 : 0) - hover) * 0.04;
        ndc.set(mx * 2, -my * 2);
        ray.setFromCamera(ndc, kit.camera);
        inv.copy(group.matrixWorld).invert();
        ray.ray.applyMatrix4(inv);
        const o = ray.ray.origin;
        const d = ray.ray.direction;
        if (Math.abs(d.y) > 1e-4) {
          const k = -o.y / d.y;
          if (k > 0) target.set(o.x + d.x * k, 0, o.z + d.z * k);
        }
        hit.lerp(target, 0.07);

        let n = 0;
        for (let x = 0; x < G; x++) {
          for (let z = 0; z < G; z++) {
            const px = (x - (G - 1) / 2) * sp;
            const pz = (z - (G - 1) / 2) * sp;
            const r = Math.hypot(px, pz);
            const edge = clamp01(1 - r / R);
            let h = 0;
            if (edge > 0) {
              const wave = 0.5 + 0.5 * Math.sin(px * 1.3 + t * 0.5) * Math.cos(pz * 1.1 - t * 0.35);
              const ring = 0.5 + 0.5 * Math.sin(r * 2.1 - t * 0.8);
              const dm = (px - hit.x) ** 2 + (pz - hit.z) ** 2;
              const land = Math.pow(0.72 * wave + 0.28 * ring, 1.6);
              const rim = edge * edge * (3 - 2 * edge); // weicher Rand, in der Mitte flach
              h = 0.08 + ((1.9 + p * 0.9) * land + hover * 0.9 * Math.exp(-dm / 0.8)) * Math.min(rim * 2.2, 1);
              // Aufbau beim Laden: das Feld wächst von der Mitte nach außen
              h *= easeOut((t - 0.2 - r * 0.24) / 1.2);
            }
            dummy.position.set(px, 0, pz);
            dummy.scale.set(h > 0 ? 1 : 0, Math.max(h, 0.0001), h > 0 ? 1 : 0);
            dummy.updateMatrix();
            inst.setMatrixAt(n, dummy.matrix);
            // hohe Pfähle fangen mehr Licht
            inst.setColorAt(n, tint.setScalar(0.55 + Math.pow(Math.min(h / 1.9, 1), 1.4) * 2.1));
            n++;
          }
        }
        inst.instanceMatrix.needsUpdate = true;
        if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
      },
      place: (narrow) => (narrow ? { z: 19, pos: [0, 1.4, 0] } : { z: 12, pos: [2.9, -1.0, 0] }),
    };
  }

  if (motif === "lamellen") {
    const N = 92;
    const sp = 0.115;
    const geo = new THREE.BoxGeometry(0.02, 3.2, 0.8);
    trash.push(geo);
    const fins: T.Mesh[] = [];
    for (let i = 0; i < N; i++) {
      const m = new THREE.Mesh(geo, mat);
      m.position.x = (i - (N - 1) / 2) * sp;
      group.add(m);
      fins.push(m);
    }
    return {
      update: (t, p, mx, my) => {
        fins.forEach((m, i) => {
          m.rotation.y = Math.sin(i * 0.11 + t * 0.55) * 1.15 + p * 0.8;
          const s = Math.sin(i * 0.07 + t * 0.3 + 1.2);
          m.scale.y = 0.55 + 0.45 * s * s;
        });
        group.rotation.y = -0.25 + mx * 0.1;
        group.rotation.x = my * 0.05;
      },
      place: (narrow) => (narrow ? { z: 15, pos: [0, 2.3, 0] } : { z: 11, pos: [1.4, 0.5, 0] }),
    };
  }

  if (motif === "linien") {
    const ROWS = 64;
    const COLS = 150;
    const W = 9;
    const D = 7;
    const lmat = new THREE.LineBasicMaterial({ color: 0xd5d8de, transparent: true, opacity: 0.75 });
    trash.push(lmat);
    const rows: { attr: T.BufferAttribute; z: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      const arr = new Float32Array(COLS * 3);
      const z = (r / (ROWS - 1) - 0.5) * D;
      for (let c = 0; c < COLS; c++) {
        arr[c * 3] = (c / (COLS - 1) - 0.5) * W;
        arr[c * 3 + 2] = z;
      }
      const g = new THREE.BufferGeometry();
      const attr = new THREE.BufferAttribute(arr, 3);
      g.setAttribute("position", attr);
      trash.push(g);
      group.add(new THREE.Line(g, lmat));
      rows.push({ attr, z });
    }
    return {
      update: (t, p, mx, my) => {
        const amp = 0.9 + p * 0.8;
        for (const { attr, z } of rows) {
          const a = attr.array as Float32Array;
          for (let c = 0; c < COLS; c++) {
            const x = a[c * 3];
            const env = Math.exp(-(x * x) / 9);
            a[c * 3 + 1] =
              amp *
              env *
              (0.55 * Math.sin(x * 1.1 + z * 0.9 + t * 0.5) + 0.45 * Math.sin(x * 2.3 - z * 1.4 - t * 0.35));
          }
          attr.needsUpdate = true;
        }
        group.rotation.x = 0.5 + my * 0.05;
        group.rotation.y = -0.35 + mx * 0.12;
      },
      place: (narrow) => (narrow ? { z: 17, pos: [0, 2.0, 0] } : { z: 12, pos: [2.2, -0.2, 0] }),
    };
  }

  if (motif === "ringe") {
    const N = 7;
    const rings: T.Mesh[] = [];
    for (let i = 0; i < N; i++) {
      const geo = new THREE.TorusGeometry(0.7 + i * 0.3, 0.028, 12, 180);
      trash.push(geo);
      const m = new THREE.Mesh(geo, mat);
      group.add(m);
      rings.push(m);
    }
    return {
      update: (t, p, mx, my) => {
        rings.forEach((m, i) => {
          const dir = i % 2 ? 1 : -1;
          m.rotation.x = i * 0.6 + t * 0.16 * dir + p * 0.9 * dir;
          m.rotation.y = i * 0.9 + t * 0.11 + p * 0.5;
        });
        group.rotation.y = mx * 0.25;
        group.rotation.x = my * 0.12;
      },
      place: (narrow) => (narrow ? { z: 18, pos: [0, 2.1, 0] } : { z: 12.5, pos: [2.8, 0.1, 0] }),
    };
  }

  if (motif === "halle") {
    const inner = new THREE.Group();
    group.add(inner);
    const SP = 2.4;
    const N = 22;
    const H = 4.2;
    const col = new THREE.BoxGeometry(0.42, H, 0.42);
    const beam = new THREE.BoxGeometry(5.0, 0.28, 0.42);
    trash.push(col, beam);
    for (let i = 0; i < N; i++) {
      const z = -i * SP;
      const l = new THREE.Mesh(col, mat);
      l.position.set(-2.3, H / 2, z);
      const r = new THREE.Mesh(col, mat);
      r.position.set(2.3, H / 2, z);
      const b = new THREE.Mesh(beam, mat);
      b.position.set(0, H, z);
      inner.add(l, r, b);
    }
    return {
      update: (t, p, mx, my) => {
        // gleichmäßiges Vorwärtsgehen; nach einem Stützenabstand wiederholt sich das Bild nahtlos
        inner.position.z = ((t * 0.35) % SP) + p * 5;
        group.rotation.y = mx * 0.06;
        group.rotation.x = my * 0.03;
      },
      place: (narrow) =>
        narrow ? { z: 12, pos: [0, -1.2, 5], fog: [6, 30] } : { z: 12, pos: [1.6, -2.4, 6.5], fog: [5, 32] },
    };
  }

  if (motif === "leiterbahnen") {
    const rnd = seeded(7);
    const G = 0.35;
    const lmat = new THREE.LineBasicMaterial({ color: 0xb9bdc5, transparent: true, opacity: 0.9 });
    const pmat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const padGeo = new THREE.BoxGeometry(0.1, 0.02, 0.1);
    const pulseGeo = new THREE.BoxGeometry(0.09, 0.09, 0.09);
    trash.push(lmat, pmat, padGeo, pulseGeo);
    const segs: number[] = [];
    const pulses: { m: T.Mesh; pts: T.Vector3[]; cum: number[]; total: number; speed: number; off: number }[] = [];
    for (let k = 0; k < 46; k++) {
      let x = -6 + Math.floor(rnd() * 6) * G;
      let z = (Math.floor(rnd() * 28) - 14) * G;
      const pts = [new THREE.Vector3(x, 0, z)];
      const steps = 5 + Math.floor(rnd() * 6);
      for (let st = 0; st < steps; st++) {
        if (st % 2 === 0) x += (3 + Math.floor(rnd() * 8)) * G;
        else z += (Math.floor(rnd() * 7) - 3) * G;
        pts.push(new THREE.Vector3(x, 0, z));
      }
      const cum = [0];
      for (let j = 0; j < pts.length - 1; j++) {
        segs.push(pts[j].x, 0, pts[j].z, pts[j + 1].x, 0, pts[j + 1].z);
        cum.push(cum[j] + pts[j].distanceTo(pts[j + 1]));
      }
      for (const end of [pts[0], pts[pts.length - 1]]) {
        const pad = new THREE.Mesh(padGeo, mat);
        pad.position.copy(end);
        group.add(pad);
      }
      const m = new THREE.Mesh(pulseGeo, pmat);
      group.add(m);
      pulses.push({ m, pts, cum, total: cum[cum.length - 1], speed: 0.7 + rnd() * 1.1, off: rnd() * 20 });
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs), 3));
    trash.push(lg);
    group.add(new THREE.LineSegments(lg, lmat));
    return {
      update: (t, p, mx, my) => {
        for (const pl of pulses) {
          const d = (t * pl.speed + pl.off) % pl.total;
          let j = 0;
          while (j < pl.cum.length - 2 && pl.cum[j + 1] < d) j++;
          const f = (d - pl.cum[j]) / Math.max(pl.cum[j + 1] - pl.cum[j], 1e-6);
          pl.m.position.lerpVectors(pl.pts[j], pl.pts[j + 1], f);
        }
        group.rotation.x = 0.62 + my * 0.05;
        group.rotation.y = -0.45 + mx * 0.12 + p * 0.2;
      },
      place: (narrow) => (narrow ? { z: 17, pos: [0, 1.6, 0] } : { z: 11.5, pos: [2.0, -0.6, 0] }),
    };
  }

  if (motif === "fliessband") {
    // Drei Bahnen, die Kisten laufen auf den Betrachter zu. An der Schranke werden sie
    // erfasst: die Lichtleiste blitzt auf, danach trägt die Kiste einen grünen Punkt.
    const LANES = 3;
    const PER = 12;
    const SP = 1.5;
    const L = PER * SP;
    const LANE_Z = 1.25;
    const GX = 0.4;
    const FLOOR = -0.25;
    const boxGeo = new kit.RoundedBox(0.62, 0.44, 0.62, 3, 0.035);
    const beltGeo = new THREE.BoxGeometry(L, 0.02, 0.6);
    const railGeo = new THREE.BoxGeometry(L, 0.06, 0.035);
    const ledGeo = new THREE.BoxGeometry(0.1, 0.012, 0.1);
    const postGeo = new THREE.BoxGeometry(0.07, 1.5, 0.07);
    const beamGeo = new THREE.BoxGeometry(0.07, 0.07, LANE_Z * 2 + 1.34);
    const barGeo = new THREE.BoxGeometry(0.014, 0.014, 0.66);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x131315, metalness: 0.2, roughness: 0.8 });
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    trash.push(boxGeo, beltGeo, railGeo, ledGeo, postGeo, beamGeo, barGeo, beltMat, ledMat);

    // Schranke
    const postZ = LANE_Z + 0.67;
    for (const z of [-postZ, postZ]) {
      const post = new THREE.Mesh(postGeo, mat);
      post.position.set(GX, FLOOR + 0.75, z);
      group.add(post);
    }
    const beam = new THREE.Mesh(beamGeo, mat);
    beam.position.set(GX, FLOOR + 1.5, 0);
    group.add(beam);

    const bars: T.MeshBasicMaterial[] = [];
    const items: { m: T.Mesh; led: T.Mesh; lane: number; i: number }[] = [];
    const off = [0, 0.55, 1.1];
    for (let lane = 0; lane < LANES; lane++) {
      const z = (lane - 1) * LANE_Z;
      const belt = new THREE.Mesh(beltGeo, beltMat);
      belt.position.set(0, FLOOR, z);
      group.add(belt);
      for (const dz of [-0.33, 0.33]) {
        const r = new THREE.Mesh(railGeo, mat);
        r.position.set(0, FLOOR + 0.02, z + dz);
        group.add(r);
      }
      const barMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      trash.push(barMat);
      bars.push(barMat);
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(GX, FLOOR + 1.45, z);
      group.add(bar);
      for (let i = 0; i < PER; i++) {
        const m = new THREE.Mesh(boxGeo, mat);
        m.position.set(0, FLOOR + 0.23, z);
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(-0.17, 0.222, 0.17);
        m.add(led);
        group.add(m);
        items.push({ m, led, lane, i });
      }
    }
    let last = 0;
    return {
      update: (t, p, mx, my) => {
        const dt = Math.min(Math.max(t - last, 0), 0.1);
        last = t;
        const near = [0, 0, 0];
        for (let lane = 0; lane < LANES; lane++) off[lane] += dt * (0.5 + lane * 0.13) * (1 + p * 1.2);
        for (const it of items) {
          const x = L / 2 - ((it.i * SP + off[it.lane]) % L);
          it.m.position.x = x;
          // hinter der Schranke (zum Betrachter hin) ist die Kiste erfasst
          const done = clamp01((GX - x) / 0.3);
          it.led.visible = done > 0;
          it.led.scale.setScalar(Math.max(done, 0.001));
          near[it.lane] = Math.max(near[it.lane], 1 - Math.min(Math.abs(x - GX) / 0.45, 1));
        }
        bars.forEach((b, lane) => b.color.setScalar(0.16 + 0.84 * near[lane]));
        group.rotation.y = 0.85 + mx * 0.1;
        group.rotation.x = 0.3 + my * 0.05;
      },
      place: (narrow) => (narrow ? { z: 17, pos: [0, 1.8, 0] } : { z: 12, pos: [2.4, -0.3, 0] }),
    };
  }

  // module
  const size = 0.76;
  const bevel = 0.035;
  const sq = new THREE.Shape();
  const h = size / 2 - bevel;
  sq.moveTo(-h, -h);
  sq.lineTo(h, -h);
  sq.lineTo(h, h);
  sq.lineTo(-h, h);
  sq.closePath();
  const geo = new THREE.ExtrudeGeometry(sq, {
    depth: size - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
  });
  geo.translate(0, 0, -(size - bevel * 2) / 2);
  trash.push(geo);
  const cubes: { m: T.Mesh; base: T.Vector3 }[] = [];
  // 13 Würfel für 13 Module: unten eine volle Lage als Fundament (9),
  // darauf wird gestuft aufgestockt (3 + 1).
  const coords: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++) for (let z = -1; z <= 1; z++) coords.push([x, -1, z]);
  coords.push([-1, 0, -1], [0, 0, -1], [-1, 0, 0], [-1, 1, -1]);
  for (const [x, y, z] of coords) {
    const m = new THREE.Mesh(geo, mat);
    group.add(m);
    cubes.push({ m, base: new THREE.Vector3(x, y + 0.3, z).multiplyScalar(0.8) });
  }
  return {
    update: (t, p, mx, my) => {
      const spread = 1.06 + p * 0.75 + 0.03 * Math.sin(t * 0.6);
      cubes.forEach((c, i) => {
        const w = Math.sin(t * 0.5 + i * 1.7) * 0.07;
        c.m.position.copy(c.base).multiplyScalar(spread + w);
      });
      group.rotation.y = 0.6 + t * 0.07 + mx * 0.25;
      group.rotation.x = 0.45 + my * 0.1;
    },
    place: (narrow) => (narrow ? { z: 19, pos: [0, 2.0, 0] } : { z: 12.5, pos: [2.7, 0.1, 0] }),
  };
}

export default function Scene3D({ motif }: { motif: Motif }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const THREE = await import("three");
        const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
        const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
        if (disposed) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        host.appendChild(renderer.domElement);

        const BG = 0x09090a;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(BG);
        const fog = new THREE.Fog(BG, 9, 20);
        scene.fog = fog;

        const pmrem = new THREE.PMREMGenerator(renderer);
        const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = env;
        scene.environmentIntensity = 0.75;

        const mat = new THREE.MeshStandardMaterial({ color: 0x2c2d31, metalness: 0.72, roughness: 0.34 });
        const trash: { dispose(): void }[] = [mat, env, pmrem];
        const group = new THREE.Group();
        scene.add(group);
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
        const built = build(THREE, { camera, RoundedBox: RoundedBoxGeometry }, motif, group, mat, trash);

        const key = new THREE.DirectionalLight(0xffffff, 3.4);
        key.position.set(-4, 5, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xdfe8ff, 3.2);
        rim.position.set(6, 2, -6);
        scene.add(rim);
        scene.add(new THREE.AmbientLight(0xffffff, 0.12));

        let baseZ = 12;

        const resize = () => {
          const w = host.clientWidth;
          const h = host.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          const pl = built.place(w < 820);
          baseZ = pl.z;
          group.position.set(...pl.pos);
          // Nebel wandert mit der Kamera mit, sonst verschwindet das Motiv auf schmalen Bildschirmen
          fog.near = pl.fog ? pl.fog[0] : baseZ - 3;
          fog.far = pl.fog ? pl.fog[1] : baseZ + 8;
          camera.updateProjectionMatrix();
        };

        let mx = 0;
        let my = 0;
        const onMouse = (e: MouseEvent) => {
          mx = e.clientX / window.innerWidth - 0.5;
          my = e.clientY / window.innerHeight - 0.5;
        };

        const STILL = 12; // Zeitpunkt des Standbilds bei "Bewegung reduzieren": Aufbau ist abgeschlossen
        const clock = new THREE.Clock();
        let raf = 0;
        const draw = (t: number) => {
          const p = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
          built.update(t, p, mx, my);
          camera.position.set(0, 0.35, baseZ - p * 2.4);
          camera.lookAt(0, 0.1, 0);
          renderer.render(scene, camera);
        };
        const loop = () => {
          // Hero ist aus dem Bild gescrollt: nichts zeichnen
          if (window.scrollY < window.innerHeight * 1.25) draw(clock.getElapsedTime());
          raf = requestAnimationFrame(loop);
        };

        const onResize = () => {
          resize();
          if (reduce) draw(STILL);
        };
        resize();
        window.addEventListener("resize", onResize);
        if (reduce) {
          draw(STILL);
        } else {
          window.addEventListener("mousemove", onMouse, { passive: true });
          loop();
        }
        host.dataset.ready = "1";

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("mousemove", onMouse);
          trash.forEach((d) => d.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // Kein WebGL verfügbar: der dunkle Hintergrund des Hero bleibt als Rückfall stehen.
        host.dataset.ready = "fallback";
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [motif]);

  return <div ref={hostRef} className="ew-monolith" aria-hidden="true" />;
}
