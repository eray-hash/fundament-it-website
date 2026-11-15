import { useEffect, useRef } from "react";
import type * as T from "three";

export type Motif = "schichten" | "pfaehle" | "lamellen" | "module";

type Placement = { z: number; pos: [number, number, number] };
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
 *  - module:    13 Würfel, unten das Fundament, darauf gestuft aufgestockt (13 Module)
 */
function build(THREE: typeof T, motif: Motif, group: T.Group, mat: T.Material, trash: { dispose(): void }[]): Built {
  if (motif === "schichten") {
    const N = 24;
    const gap = 0.2;
    const geo = new THREE.BoxGeometry(3.2, 0.12, 2.0);
    trash.push(geo);
    const slabs: T.Mesh[] = [];
    for (let i = 0; i < N; i++) {
      const m = new THREE.Mesh(geo, mat);
      group.add(m);
      slabs.push(m);
    }
    return {
      update: (t, p, mx, my) => {
        slabs.forEach((m, i) => {
          const k = i - (N - 1) / 2;
          m.position.y = k * gap * (1 + p * 0.6);
          m.rotation.y = k * 0.085 * (1 + p * 1.2) + Math.sin(t * 0.3 + i * 0.18) * 0.06;
        });
        group.rotation.y = 0.5 + mx * 0.2 + t * 0.04;
        group.rotation.x = 0.14 + my * 0.06;
      },
      place: (narrow) => (narrow ? { z: 21, pos: [0, 2.2, 0] } : { z: 13, pos: [2.7, 0, 0] }),
    };
  }

  if (motif === "pfaehle") {
    const G = 30;
    const sp = 0.22;
    const geo = new THREE.BoxGeometry(0.15, 1, 0.15);
    geo.translate(0, 0.5, 0);
    trash.push(geo);
    const inst = new THREE.InstancedMesh(geo, mat, G * G);
    group.add(inst);
    const dummy = new THREE.Object3D();
    return {
      update: (t, p, mx, my) => {
        let n = 0;
        for (let x = 0; x < G; x++) {
          for (let z = 0; z < G; z++) {
            const px = (x - (G - 1) / 2) * sp;
            const pz = (z - (G - 1) / 2) * sp;
            const edge = Math.max(0, 1 - Math.hypot(px, pz) / 4.4);
            const wave = 0.5 + 0.5 * Math.sin(px * 1.3 + t * 0.5) * Math.cos(pz * 1.1 - t * 0.35);
            const h = 0.12 + (1.3 + p * 0.9) * wave * Math.sqrt(edge);
            dummy.position.set(px, 0, pz);
            dummy.scale.set(1, h, 1);
            dummy.updateMatrix();
            inst.setMatrixAt(n++, dummy.matrix);
          }
        }
        inst.instanceMatrix.needsUpdate = true;
        group.rotation.y = 0.7 + mx * 0.15 + t * 0.03;
        group.rotation.x = 0.42 + my * 0.05;
      },
      place: (narrow) => (narrow ? { z: 19, pos: [0, 1.6, 0] } : { z: 11.5, pos: [2.5, -0.9, 0] }),
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
        const built = build(THREE, motif, group, mat, trash);

        const key = new THREE.DirectionalLight(0xffffff, 3.4);
        key.position.set(-4, 5, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xdfe8ff, 3.2);
        rim.position.set(6, 2, -6);
        scene.add(rim);
        scene.add(new THREE.AmbientLight(0xffffff, 0.12));

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
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
          fog.near = baseZ - 3;
          fog.far = baseZ + 8;
          camera.updateProjectionMatrix();
        };

        let mx = 0;
        let my = 0;
        const onMouse = (e: MouseEvent) => {
          mx = e.clientX / window.innerWidth - 0.5;
          my = e.clientY / window.innerHeight - 0.5;
        };

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
          if (reduce) draw(0);
        };
        resize();
        window.addEventListener("resize", onResize);
        if (reduce) {
          draw(0);
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
