/**
 * CameraDolly — 3D camera flythrough over service slides.
 * Replaces the "Услуги" section only. Everything else is untouched.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Service images (served from public/, BASE_URL-relative) ───────────────────
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const imgHair        = `${BASE}/svc-dolly-hair.png`;
const imgNails       = `${BASE}/svc-dolly-nails.png`;
const imgCosmetology = `${BASE}/svc-dolly-cosm.png`;
const imgMedicine    = `${BASE}/svc-dolly-med.png`;
const imgSpa         = `${BASE}/svc-dolly-spa.png`;

gsap.registerPlugin(ScrollTrigger);

// ─── Tunable parameters ───────────────────────────────────────────────────────
const FOG_NEAR      = 14;
const FOG_FAR       = 65;
const FOG_COLOR     = 0xefe9e1;
const CAMERA_FOV    = 50;
const LERP_SPEED    = 0.08;   // camera inertia (0–1, lower = smoother)
const SCROLL_HEIGHT = 500;    // section height in vh
const CENTRAL_ROT   = 0.003;  // radians/frame for central object
// ─────────────────────────────────────────────────────────────────────────────

// ── Service content ───────────────────────────────────────────────────────────
// Note: img is assigned after imports are resolved (below the import block)
const SERVICES = [
  {
    title: "Парикмахерское\nискусство",
    desc:  "Авторские стрижки, окрашивание и укладки от мастеров французской школы.",
    img:   imgHair,
  },
  {
    title: "Ногтевой\nсервис",
    desc:  "Маникюр, педикюр и дизайн ногтей с использованием премиальных материалов.",
    img:   imgNails,
  },
  {
    title: "Косметология",
    desc:  "Инъекционные и аппаратные методики для молодости и сияния кожи.",
    img:   imgCosmetology,
  },
  {
    title: "Эстетическая и превентивная\nмедицина",
    desc:  "Индивидуальные протоколы здоровья и долголетия от врачей высшей категории.",
    img:   imgMedicine,
  },
  {
    title: "Wellness\nи восстановление",
    desc:  "СПА-ритуалы, массажи и программы восстановления для гармонии тела и духа.",
    img:   imgSpa,
  },
];

// ── Slide positions & rotations in 3D scene ───────────────────────────────────
const SLIDE_TRANSFORMS = [
  { pos: [0,    0,  10], rotY: 0           },
  { pos: [9,    1,   5], rotY: -55  * Math.PI / 180 },
  { pos: [11,   0,  -4], rotY: -110 * Math.PI / 180 },
  { pos: [4,   -1, -11], rotY: -150 * Math.PI / 180 },
  { pos: [-7,   1,  -9], rotY: -200 * Math.PI / 180 },
] as const;

// ── Camera CatmullRom waypoints ───────────────────────────────────────────────
const CAM_POINTS = [
  new THREE.Vector3(0,   1,   20),
  new THREE.Vector3(4,   1.5, 12),
  new THREE.Vector3(13,  2,    6),
  new THREE.Vector3(16,  1,   -4),
  new THREE.Vector3(8,   0,  -13),
  new THREE.Vector3(-4,  1.5,-12),
  new THREE.Vector3(-10, 2,   -6),
];

// LookAt targets match slide positions
const LOOKAT_TARGETS = SLIDE_TRANSFORMS.map(t => new THREE.Vector3(...t.pos));

// ── WebGL availability check ──────────────────────────────────────────────────
function isWebGLAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

// ── CSS Fallback (no GPU) ─────────────────────────────────────────────────────
function CSSFallback({ label }: { label: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx]     = useState(0);
  const [opacity, setOp]  = useState(1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const N = SERVICES.length;
    const st = ScrollTrigger.create({
      trigger: el, start: "top top", end: "bottom bottom", scrub: 1.2,
      onUpdate: (s) => {
        const raw  = s.progress * (N - 1);
        const i    = Math.min(Math.floor(raw), N - 2);
        const t    = raw - i;
        setIdx(t < 0.5 ? i : i + 1);
        setOp(t < 0.5 ? 1 - t * 2 : (t - 0.5) * 2);
      },
    });
    return () => st.kill();
  }, []);

  const svc = SERVICES[idx];
  return (
    <div ref={sectionRef} style={{ height: `${SCROLL_HEIGHT}vh`, background: "#EFE9E1" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <p style={{ position: "absolute", top: 36, left: 40, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(0,0,0,0.25)", fontWeight: 300 }}>{label}</p>
        <div style={{ textAlign: "center", opacity, transition: "opacity 0.06s linear", padding: "0 8vw" }}>
          <div style={{ width: 32, height: 1, background: "#C9A96E", margin: "0 auto 24px" }} />
          <h2 style={{ fontSize: "clamp(2.4rem,6vw,5rem)", fontWeight: 100, letterSpacing: "-0.03em", lineHeight: 1, color: "#1a1208", whiteSpace: "pre-line", marginBottom: 20 }}>{svc.title}</h2>
          <p style={{ fontSize: "clamp(12px,1.5vw,15px)", fontWeight: 300, color: "rgba(0,0,0,0.45)", lineHeight: 1.75, maxWidth: 460, margin: "0 auto" }}>{svc.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main 3D component ─────────────────────────────────────────────────────────
function Scene3D({ label }: { label: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [textIdx,  setTextIdx]  = useState(0);
  const [textOp,   setTextOp]   = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    renderer.setSize(W(), H());

    // ── Scene ───────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(FOG_COLOR);
    scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);

    // ── Camera ──────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, W() / H(), 0.1, 200);
    camera.position.copy(CAM_POINTS[0]);

    // ── Lighting ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfdf6ec, 1.4));
    const dirLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xe8d8c0, 0.6);
    fillLight.position.set(-8, 5, -10);
    scene.add(fillLight);

    // ── Central organic object ───────────────────────────────────────────────
    const centralGeo = new THREE.IcosahedronGeometry(1.4, 4);
    // Distort vertices for organic feel
    const pos = centralGeo.attributes.position;
    const seed = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      seed.fromBufferAttribute(pos, i);
      const n = Math.sin(seed.x * 2.1 + 0.3) * Math.cos(seed.y * 1.8 + 0.7) * Math.sin(seed.z * 2.4 + 1.1);
      seed.multiplyScalar(1 + n * 0.22);
      pos.setXYZ(i, seed.x, seed.y, seed.z);
    }
    centralGeo.computeVertexNormals();
    const centralMat = new THREE.MeshStandardMaterial({
      color: 0xd4b896,
      roughness: 0.72,
      metalness: 0.08,
      envMapIntensity: 0.5,
    });
    const centralMesh = new THREE.Mesh(centralGeo, centralMat);
    centralMesh.position.set(0, 0, 0);
    scene.add(centralMesh);

    // ── Slide planes with photo textures ─────────────────────────────────────
    const slideGeo = new THREE.PlaneGeometry(6, 4);
    const texLoader = new THREE.TextureLoader();
    const slideMats: THREE.MeshBasicMaterial[] = [];

    SLIDE_TRANSFORMS.forEach((t, i) => {
      // Start with neutral material; texture applied on load
      const mat = new THREE.MeshBasicMaterial({
        color: 0xd4b896,
        side: THREE.DoubleSide,
      });
      slideMats.push(mat);

      const mesh = new THREE.Mesh(slideGeo, mat);
      mesh.position.set(t.pos[0], t.pos[1], t.pos[2]);
      mesh.rotation.y = t.rotY;
      scene.add(mesh);

      // Thin gold border
      const border = new THREE.LineSegments(
        new THREE.EdgesGeometry(slideGeo),
        new THREE.LineBasicMaterial({ color: 0xc9a96e, opacity: 0.45, transparent: true })
      );
      border.position.copy(mesh.position);
      border.rotation.copy(mesh.rotation);
      scene.add(border);

      // Load photo texture async — applies as soon as ready
      texLoader.load(
        SERVICES[i].img,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          mat.map = tex;
          mat.color.set(0xffffff); // neutral so texture shows full colour
          mat.needsUpdate = true;
        }
      );
    });

    // ── Camera curve ─────────────────────────────────────────────────────────
    const curve = new THREE.CatmullRomCurve3(CAM_POINTS, false, "catmullrom", 0.5);

    // Smooth lookAt target state
    const currentLookAt  = new THREE.Vector3().copy(LOOKAT_TARGETS[0]);
    const targetLookAt   = new THREE.Vector3().copy(LOOKAT_TARGETS[0]);
    const currentCamPos  = new THREE.Vector3().copy(CAM_POINTS[0]);

    // ── RAF loop ──────────────────────────────────────────────────────────────
    let rafId: number;
    let targetProgress = 0;
    let smoothProgress = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Lerp progress for camera inertia
      smoothProgress += (targetProgress - smoothProgress) * LERP_SPEED;

      // Camera position along curve
      const p = Math.max(0, Math.min(1, smoothProgress));
      const newPos = curve.getPointAt(p);
      currentCamPos.lerp(newPos, LERP_SPEED * 4);
      camera.position.copy(currentCamPos);

      // LookAt: find closest slide target
      const slideIdx = Math.min(Math.round(p * (LOOKAT_TARGETS.length - 1)), LOOKAT_TARGETS.length - 1);
      targetLookAt.copy(LOOKAT_TARGETS[slideIdx]);
      currentLookAt.lerp(targetLookAt, LERP_SPEED * 3);
      camera.lookAt(currentLookAt);

      // Slowly rotate central object
      centralMesh.rotation.y += CENTRAL_ROT;
      centralMesh.rotation.x += CENTRAL_ROT * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    // ── ScrollTrigger ─────────────────────────────────────────────────────────
    const N = SERVICES.length;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate: (self) => {
        targetProgress = self.progress;

        // Text overlay
        const raw  = self.progress * (N - 1);
        const band = 1 / (N - 1);
        const tIdx = Math.min(Math.floor(raw), N - 2);
        const t    = raw - tIdx;

        // Text shown when camera is "near" a slide (±30% of band)
        // Current slide fades out in last 40%, next fades in in first 40%
        const shownIdx = t < 0.5 ? tIdx : tIdx + 1;
        const op = t < 0.3 ? 1
                 : t < 0.7 ? 1 - (t - 0.3) / 0.4
                 : 0;
        const op2 = t < 0.3 ? 0
                  : t < 0.7 ? (t - 0.3) / 0.4
                  : 1;

        setTextIdx(shownIdx);
        setTextOp(shownIdx === tIdx ? op : op2);
      },
    });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      // Dispose geometry/materials
      centralGeo.dispose();
      centralMat.dispose();
      slideGeo.dispose();
      renderer.dispose();
    };
  }, []);

  const svc = SERVICES[textIdx] ?? SERVICES[0];

  return (
    <div ref={sectionRef} style={{ height: `${SCROLL_HEIGHT}vh`, background: "#EFE9E1" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* WebGL canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", willChange: "transform" }}
        />

        {/* Section label */}
        <p style={{
          position: "absolute", top: 36, left: 40,
          fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.3)", fontWeight: 300, zIndex: 10, pointerEvents: "none",
        }}>
          {label}
        </p>

        {/* Slide counter */}
        <p style={{
          position: "absolute", top: 36, right: 40,
          fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.3)", fontWeight: 300, zIndex: 10, pointerEvents: "none",
          opacity: textOp,
        }}>
          {String(textIdx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
        </p>

        {/* Bottom gradient for text readability */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(to top, rgba(239,233,225,0.85) 0%, transparent 100%)",
          pointerEvents: "none", zIndex: 5,
        }} />

        {/* HTML text overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 clamp(24px,8vw,120px) clamp(48px,8vh,88px)",
          zIndex: 10, opacity: textOp, transition: "opacity 0.08s linear",
          pointerEvents: "none",
        }}>
          <div style={{ width: 32, height: 1, background: "#C9A96E", marginBottom: 18, opacity: 0.8 }} />
          <h2 style={{
            fontSize: "clamp(2rem,5.5vw,5rem)",
            fontWeight: 100, lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#1a1208",
            whiteSpace: "pre-line",
            marginBottom: 16,
          }}>
            {svc.title}
          </h2>
          <p style={{
            fontSize: "clamp(12px,1.4vw,14px)",
            fontWeight: 300, color: "rgba(26,18,8,0.5)",
            lineHeight: 1.75, maxWidth: 460, letterSpacing: "0.01em",
          }}>
            {svc.desc}
          </p>
        </div>

      </div>
    </div>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export function CameraDolly({ label = "— Услуги" }: { label?: string }) {
  const [webgl] = useState(isWebGLAvailable);
  if (!webgl) return <CSSFallback label={label} />;
  return <Scene3D label={label} />;
}
