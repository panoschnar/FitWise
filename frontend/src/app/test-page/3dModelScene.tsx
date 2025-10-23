"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";

// === Scroll-driven camera effects ===
function ScrollEffects() {
  const { camera, scene } = useThree();
  const { scrollYProgress } = useScroll();

  // Camera zoom
  const zoom = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [5, 2, 4, 3]),
    { stiffness: 50, damping: 20 }
  );

  // Model rotation
  const tilt = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.6, 1],
      [0, Math.PI / 18, Math.PI / 36, Math.PI / 12]
    ),
    { stiffness: 50, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0, -Math.PI / 12, 0]),
    { stiffness: 50, damping: 20 }
  );

  // Model vertical parallax
  const yOffset = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.3, -1]),
    {
      stiffness: 50,
      damping: 20,
    }
  );
  useMotionValueEvent(zoom, "change", (v) => {
    camera.position.z = v;
  });

  useFrame(() => {
    const group = scene.children.find((child) => child.type === "Group");
    if (group) {
      group.rotation.x = tilt.get();
      group.rotation.y = rotateY.get();
      group.position.y = yOffset.get();
    }
  });

  return null;
}

// === Model Component ===
function Model() {
  const { scene } = useGLTF("/models/test_-_blob_1.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Automatically replace materials
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Use existing texture if present
        const textureMap = (mesh.material as any)?.map || null;
        console.log(textureMap);
        mesh.material = new THREE.MeshPhysicalMaterial({
          map: textureMap || undefined,
          color: textureMap ? "#92278f" : "#662d91",
          metalness: 0.5,
          roughness: 0.1,
          // transmission: 0.6, // glass
          thickness: 1,
          clearcoat: 1,
          clearcoatRoughness: 0,
          // reflectivity: 1,
          envMapIntensity: 1.2,
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.3}
      position={[0.3, -0.3, 0]}
      rotation={[0, Math.PI / 6, 0]}
    />
  );
}

// === Main Scene ===
function ModelScene() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(180deg, #f5f5f7 0%, #e8ebf0 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 15 }}>
        {/* Lights */}
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.8}
          color="#0x662d91"
        />
        <directionalLight
          position={[-5, 2, -5]}
          intensity={0.8}
          color="#0x662d91"
        />

        {/* HDRI Environment for realistic reflections */}
        <Environment preset="studio" />

        {/* Scroll-driven camera & rotation */}
        <ScrollEffects />

        {/* 3D Model */}
        <Model />

        {/* Post-processing */}
        {/* <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.2} intensity={0.5} />
          <ToneMapping adaptive />
        </EffectComposer> */}

        {/* OrbitControls for testing */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

// === Client-only wrapper with fade-in ===
export default function ModelSceneWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ModelScene />
    </motion.div>
  );
}
