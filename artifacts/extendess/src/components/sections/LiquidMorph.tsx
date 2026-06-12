import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Tunable parameters ───────────────────────────────────────────────────────
const DISPLACEMENT_STRENGTH = 0.10;
const WAVE_FREQ_A = 3.2;
const WAVE_FREQ_B = 5.8;
const WAVE_FREQ_C = 2.1;
const SCRUB_SPEED = 1.4;
// ─────────────────────────────────────────────────────────────────────────────

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */`
  precision highp float;
  uniform sampler2D uTex1;
  uniform sampler2D uTex2;
  uniform float uProgress;
  uniform float uStrength;
  uniform float uFreqA;
  uniform float uFreqB;
  uniform float uFreqC;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i), b = hash(i + vec2(1,0)), c = hash(i + vec2(0,1)), d = hash(i + vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.0 + vec2(100.0); a *= 0.5; }
    return v;
  }

  void main() {
    float t = uProgress;
    float peak = sin(t * 3.14159265);
    float na = fbm(vUv * uFreqA + t * 0.6 + vec2(0.0, 3.7));
    float nb = fbm(vUv * uFreqB - t * 0.4 + vec2(13.7, 0.0));
    float nc = fbm(vUv * uFreqC + t * 0.3 + vec2(5.1, 8.3));
    vec2 disp = vec2((na - 0.5) * 1.4 + (nc - 0.5) * 0.6, (nb - 0.5) * 1.4 + (nc - 0.5) * 0.6);
    vec2 d = disp * peak * uStrength;
    vec4 c1 = texture2D(uTex1, clamp(vUv + d, 0.001, 0.999));
    vec4 c2 = texture2D(uTex2, clamp(vUv - d * 0.7, 0.001, 0.999));
    gl_FragColor = mix(c1, c2, smoothstep(0.0, 1.0, t));
  }
`;

export interface LiquidSlide {
  num: string;
  title: string;
  desc: string;
  img: string;
}

interface Props {
  slides: LiquidSlide[];
  label?: string;
}

function isWebGLAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

// ── CSS fallback (no GPU) ─────────────────────────────────────────────────────
function FallbackMorph({ slides, label }: Required<Props>) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ idx: 0, next: 1, t: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || slides.length < 2) return;
    const N = slides.length;
    const st = ScrollTrigger.create({
      trigger: section, start: "top top", end: "bottom bottom", scrub: SCRUB_SPEED,
      onUpdate: (self) => {
        const raw = self.progress * (N - 1);
        const idx = Math.min(Math.floor(raw), N - 2);
        setState({ idx, next: Math.min(idx + 1, N - 1), t: raw - idx });
      },
    });
    return () => st.kill();
  }, [slides]);

  const { idx, next, t } = state;
  return (
    <div ref={sectionRef} style={{ height: `${slides.length * 100}vh`, background: "#EFE9E1" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <p style={{ position: "absolute", top: 36, left: 40, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 300, zIndex: 10 }}>{label}</p>
        {slides.map((s, i) => {
          const isA = i === idx, isB = i === next;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: isA ? 1 - t : isB ? t : 0 }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,7,4,0.82) 0%, transparent 70%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 10% 8vh", color: "#fff", opacity: isA ? Math.max(0, 1 - t * 2) : isB ? Math.max(0, t * 2 - 1) : 0 }}>
                <span style={{ fontSize: 9, letterSpacing: "0.5em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 12 }}>{s.num}</span>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 100, lineHeight: 1, letterSpacing: "-0.03em", whiteSpace: "pre-line", marginBottom: 16 }}>{s.title}</h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 480 }}>{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── WebGL version ─────────────────────────────────────────────────────────────
function WebGLMorph({ slides, label }: Required<Props>) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [textState, setTextState] = useState({ idx: 0, opacity: 1 });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas || slides.length < 2) return;
    const N = slides.length;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene  = new THREE.Scene();
    const geo    = new THREE.PlaneGeometry(2, 2);
    const mat    = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        uTex1:     { value: null },
        uTex2:     { value: null },
        uProgress: { value: 0 },
        uStrength: { value: DISPLACEMENT_STRENGTH },
        uFreqA:    { value: WAVE_FREQ_A },
        uFreqB:    { value: WAVE_FREQ_B },
        uFreqC:    { value: WAVE_FREQ_C },
      },
    });
    scene.add(new THREE.Mesh(geo, mat));

    const resize = () => renderer.setSize(window.innerWidth, window.innerHeight);
    resize();
    window.addEventListener("resize", resize);

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = new Array(N);
    let loaded = 0;

    const initScrollTrigger = () => {
      mat.uniforms.uTex1.value = textures[0];
      mat.uniforms.uTex2.value = textures[1];
      let pairA = 0;

      const st = ScrollTrigger.create({
        trigger: section, start: "top top", end: "bottom bottom", scrub: SCRUB_SPEED,
        onUpdate: (self) => {
          const raw  = self.progress * (N - 1);
          const tIdx = Math.min(Math.floor(raw), N - 2);
          const t    = Math.max(0, Math.min(1, raw - tIdx));

          if (tIdx !== pairA) {
            pairA = tIdx;
            mat.uniforms.uTex1.value = textures[tIdx];
            mat.uniforms.uTex2.value = textures[Math.min(tIdx + 1, N - 1)];
          }
          mat.uniforms.uProgress.value = t;

          // Text: full opacity on active slide, fades around midpoint
          const shownIdx = t < 0.5 ? tIdx : tIdx + 1;
          const op = t < 0.5 ? 1 - t * 2 : (t - 0.5) * 2;
          setTextState({ idx: shownIdx, opacity: op });

          renderer.render(scene, camera);
        },
      });

      renderer.render(scene, camera);
      return st;
    };

    const makeFallbackTex = () => {
      const d = new Uint8Array([30, 20, 10, 255]);
      const t = new THREE.DataTexture(d, 1, 1, THREE.RGBAFormat);
      t.needsUpdate = true;
      return t;
    };

    slides.forEach((slide, i) => {
      loader.load(
        slide.img,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          textures[i] = tex;
          if (++loaded === N) { initScrollTrigger(); }
        },
        undefined,
        () => { textures[i] = makeFallbackTex(); if (++loaded === N) { initScrollTrigger(); } }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === section) st.kill(); });
      textures.forEach(tx => tx?.dispose());
      mat.dispose(); geo.dispose(); renderer.dispose();
      window.removeEventListener("resize", resize);
    };
  }, [slides]);

  const slide = slides[textState.idx] ?? slides[0];

  return (
    <div ref={sectionRef} style={{ height: `${slides.length * 100}vh`, background: "#EFE9E1" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", willChange: "transform" }} />

        {/* Gradient for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,7,4,0.82) 0%, rgba(10,7,4,0.1) 50%, transparent 70%)", pointerEvents: "none" }} />

        {/* Label */}
        <p style={{ position: "absolute", top: 36, left: 40, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 300, zIndex: 10 }}>{label}</p>

        {/* Counter */}
        <p style={{ position: "absolute", top: 36, right: 40, fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 300, zIndex: 10, opacity: textState.opacity }}>
          {slide?.num} / {String(slides.length).padStart(2, "0")}
        </p>

        {/* Text overlay */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(24px,8vw,120px) clamp(48px,8vh,96px)", zIndex: 10, opacity: textState.opacity, transition: "opacity 0.06s linear" }}>
          <div style={{ width: 36, height: 1, background: "#C9A96E", marginBottom: 20, opacity: 0.8 }} />
          <h2 style={{ fontSize: "clamp(2.4rem,6vw,5.5rem)", fontWeight: 100, lineHeight: 1.0, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.94)", whiteSpace: "pre-line", marginBottom: 18 }}>
            {slide?.title}
          </h2>
          <p style={{ fontSize: "clamp(12px,1.5vw,15px)", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 520, letterSpacing: "0.01em" }}>
            {slide?.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Public export: picks WebGL or CSS fallback ────────────────────────────────
export function LiquidMorph({ slides = [], label = "— Услуги" }: Props) {
  const [webgl] = useState(isWebGLAvailable);
  if (!webgl) return <FallbackMorph slides={slides} label={label} />;
  return <WebGLMorph slides={slides} label={label} />;
}
