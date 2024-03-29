/* eslint-disable react/no-unknown-property */

import * as THREE from "three";

import { BlendFunction, GlitchMode } from "postprocessing";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  SSR,
  Vignette,
} from "@react-three/postprocessing";
import React, { useRef } from "react";

import { Canvas } from "@react-three/fiber";
import Drunk from "./Drunk";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

/**
 * Light.
 * @return Light.
 */
const Light = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
    </>
  );
};

/**
 * Objects.
 * @return Objects.
 */
const Objects = () => {
  return (
    <>
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" toneMapped={false} />
        {/* <meshBasicMaterial color={[1.5 * 10, 1, 4]} toneMapped={false} /> */}
        {/* <meshStandardMaterial
          color="white"
          emissive="orange"
          emissiveIntensity={2}
          toneMapped={false}
        /> */}
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        {/* <meshStandardMaterial color="#000000" metalness={0} roughness={0} /> */}
        <meshStandardMaterial color="yellowgreen" />
      </mesh>
    </>
  );
};

/**
 * PostProcessing.
 * @return PostProcessing.
 */
const PostProcessing = () => {
  // const ssrProps = useControls("SSR Effect", {
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 },
  // });

  // タイプを指定するとうまくいかなかったため、わざと外している
  const drunkRef = useRef(null);

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [4, 2, 6] }}>
      <EffectComposer>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch
          delay={new THREE.Vector2(0.5, 1)}
          duration={new THREE.Vector2(0.3, 0.5)}
          strength={new THREE.Vector2(0.2, 0.4)}
          mode={GlitchMode.DISABLED}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        {/* <SSR {...ssrProps} /> */}
        <Drunk
          ref={drunkRef}
          {...drunkProps}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>
      <Perf position="top-left" />
      {/* <color args={["#000000"]} attach="background" /> */}
      <color args={["#ffffff"]} attach="background" />
      <Light />
      <Objects />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default PostProcessing;
