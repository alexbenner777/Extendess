import { Suspense, useRef, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import sculptureFallback from "@assets/578b80ac-297d-4c46-b7ee-22955185bcd2_1781290151582.png";

function CoralModel() {
  const { scene } = useGLTF("/coral.glb");
  const ref = useRef<THREE.Group>(null);

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
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.6} />
            <directionalLight position={[3, 6, 4]} intensity={2.2} castShadow />
            <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#f5ede3" />
            <pointLight position={[0, -1, 3]} intensity={0.5} color="#fff8f0" />

            <CoralModel />

            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.18}
              scale={4}
              blur={2.5}
              far={2}
              color="#8a7060"
            />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

useGLTF.preload("/coral.glb");
