import { Suspense, useRef, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import sculptureFallback from "@assets/578b80ac-297d-4c46-b7ee-22955185bcd2_1781290151582.png";

const CERAMIC_COLOR = new THREE.Color("#c9b99a");

function CoralModel() {
  const { scene } = useGLTF("/coral.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const m = mat as THREE.MeshStandardMaterial;
          m.map = null;
          m.color.copy(CERAMIC_COLOR);
          m.roughness = 0.82;
          m.metalness = 0.0;
          m.envMapIntensity = 0.6;
          m.needsUpdate = true;
        });
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={1} dispose={null} />
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
        filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.13))",
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

export function Sculpture3D() {
  return (
    <WebGLErrorBoundary fallback={<FallbackImage />}>
      <div className="w-full" style={{ height: "65vh" }}>
        <Canvas
          camera={{ position: [0, 0.5, 3.2], fov: 38 }}
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
              position={[0, -1.4, 0]}
              opacity={0.22}
              scale={4}
              blur={3}
              far={2}
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
