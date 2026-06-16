import { Suspense, useRef, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import sculptureFallback from "@assets/578b80ac-297d-4c46-b7ee-22955185bcd2_1781290151582.png";

const DARK_BEIGE  = new THREE.Color("#9a7d5e");
const LIGHT_BEIGE = new THREE.Color("#f2e0ca");

function CoralModel() {
  const { scene } = useGLTF("/coral.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const geo = mesh.geometry;

      // Compute Y-range across all vertices
      geo.computeBoundingBox();
      const bbox = geo.boundingBox!;
      const yMin = bbox.min.y;
      const yRange = Math.max(bbox.max.y - yMin, 0.0001);

      // Build per-vertex colour array: dark beige (bottom) → light beige (top)
      const pos = geo.attributes.position;
      const colArr = new Float32Array(pos.count * 3);
      const tmp = new THREE.Color();
      for (let i = 0; i < pos.count; i++) {
        const norm = (pos.getY(i) - yMin) / yRange; // 0 bottom → 1 top
        const t = Math.pow(1 - Math.abs(2 * norm - 1), 3); // sharp: beige dominates, blue only at centre
        tmp.copy(DARK_BEIGE).lerp(LIGHT_BEIGE, t);
        colArr[i * 3]     = tmp.r;
        colArr[i * 3 + 1] = tmp.g;
        colArr[i * 3 + 2] = tmp.b;
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colArr, 3));

      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        const m = mat as THREE.MeshStandardMaterial;
        m.map          = null;
        m.vertexColors = true;
        m.color.set("#ffffff");          // neutral multiplier
        m.roughness    = 0.82;
        m.metalness    = 0.0;
        m.envMapIntensity = 0.55;
        m.needsUpdate  = true;
      });
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.position.y = 0.35 + Math.sin(Date.now() * 0.001) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={0.75} dispose={null} />
    </group>
  );
}

function FallbackImage() {
  return (
    <img
      src={sculptureFallback}
      alt="Organic sculpture"
      style={{
        width: "100%",
        maxHeight: "65vh",
        objectFit: "contain",
        filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.09))",
      }}
    />
  );
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function Sculpture3D() {
  if (!isWebGLAvailable()) {
    return <FallbackImage />;
  }
  return (
    <WebGLErrorBoundary fallback={<FallbackImage />}>
      <div className="w-full" style={{ height: "72vh" }}>
        <Canvas
          camera={{ position: [0, 0.2, 3.2], fov: 46 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            {/* Key light from top-right front */}
            <directionalLight position={[2, 5, 4]} intensity={2.8} color="#fff9f2" castShadow />
            {/* Fill light from left — warm cream */}
            <directionalLight position={[-3, 1, 2]} intensity={1.0} color="#f5ece0" />
            {/* Rim light from back — cold to separate edges */}
            <directionalLight position={[0, 2, -4]} intensity={0.5} color="#e8eaec" />
            {/* Soft ambient */}
            <ambientLight intensity={1.2} color="#faf6f0" />

            <CoralModel />

            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.18}
              scale={2}
              blur={2.5}
              far={1.2}
              color="#7a6a5a"
            />

            {/* Studio HDRI for natural reflections on the matte surface */}
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

useGLTF.preload("/coral.glb");
