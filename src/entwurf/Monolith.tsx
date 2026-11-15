import { useEffect, useRef } from "react";

// Umriss des F-Logos (viewBox 0 0 512 672)
const F_POINTS: [number, number][] = [
  [0, 0],
  [512, 0],
  [512, 142],
  [144, 142],
  [144, 268],
  [430, 268],
  [430, 410],
  [144, 410],
  [144, 672],
  [0, 672],
];

const SLABS = 26;
const GAP = 0.21;

/**
 * Leitmotiv des Entwurfs: das F als gestapelte, dunkle Platten im Studiolicht.
 * Schicht für Schicht entsteht ein Fundament. Die Platten fächern sich beim
 * Scrollen auf und reagieren leicht auf die Maus.
 */
export default function Monolith() {
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

        const s = 4.4 / 672;
        const shape = new THREE.Shape();
        F_POINTS.forEach(([x, y], i) => {
          const px = (x - 256) * s;
          const py = (336 - y) * s;
          if (i === 0) shape.moveTo(px, py);
          else shape.lineTo(px, py);
        });
        shape.closePath();
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 0.06,
          bevelEnabled: true,
          bevelThickness: 0.012,
          bevelSize: 0.012,
          bevelSegments: 2,
        });
        geo.translate(0, 0, -0.03);
        const mat = new THREE.MeshStandardMaterial({ color: 0x2c2d31, metalness: 0.72, roughness: 0.34 });

        const group = new THREE.Group();
        const slabs: InstanceType<typeof THREE.Mesh>[] = [];
        for (let i = 0; i < SLABS; i++) {
          const m = new THREE.Mesh(geo, mat);
          group.add(m);
          slabs.push(m);
        }
        scene.add(group);

        const key = new THREE.DirectionalLight(0xffffff, 3.4);
        key.position.set(-4, 5, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xdfe8ff, 3.2);
        rim.position.set(6, 2, -6);
        scene.add(rim);
        scene.add(new THREE.AmbientLight(0xffffff, 0.12));

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
        let baseZ = 12;

        const resize = () => {
          const w = host.clientWidth;
          const h = host.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          const narrow = w < 820;
          baseZ = narrow ? 24 : 12;
          group.position.set(narrow ? 0 : 2.5, narrow ? 2.3 : 0.1, 0);
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
          slabs.forEach((m, i) => {
            const k = i - (SLABS - 1) / 2;
            m.position.z = k * GAP * (1 + p * 0.9);
            m.position.y = Math.sin(t * 0.5 + i * 0.3) * 0.03;
            m.rotation.y = k * 0.016 * (1 + p * 2.4) + Math.sin(t * 0.35 + i * 0.22) * 0.035;
          });
          group.rotation.y = -0.62 + mx * 0.14 + p * 0.55;
          group.rotation.x = 0.06 + my * 0.06;
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
          geo.dispose();
          mat.dispose();
          env.dispose();
          pmrem.dispose();
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
  }, []);

  return <div ref={hostRef} className="ew-monolith" aria-hidden="true" />;
}
