import { useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Float, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import createCoinFaceTexture from './coinTexture';
import useAssetAvailability from '../../hooks/useAssetAvailability';

const COIN_ARTWORK = '/brand/elimcoin-gold.svg';

/**
 * The supplied artwork's own box inside its 1600x1600 sheet, measured off the
 * file's alpha channel — the same numbers the DOM coins are framed with.
 *
 * The sheet carries transparent padding, and the cylinder cap maps the whole
 * texture square, so mapped raw the disc would land at 92.5% of the cap and
 * leave a gap inside the milled rim. Framing the map onto that box is what
 * makes the supplied disc fill the cap exactly as the painted face did.
 */
const ART_BOX = { u: 61 / 1600, v: 55 / 1600, w: 1480 / 1600, h: 1481 / 1600 };

/**
 * The forged coin: a milled gold disc with engraved faces.
 *
 * The face carries the official ELIM COIN artwork, framed onto the cap by
 * `ART_BOX`; the procedurally painted face remains the fallback for as long as
 * the file has not resolved.
 */
function Coin({ reduced }) {
  const group = useRef(null);
  const artworkReady = useAssetAvailability(COIN_ARTWORK) === 'ready';

  const faceTexture = useMemo(() => {
    if (!artworkReady) return createCoinFaceTexture(1024);
    const texture = new THREE.TextureLoader().load(COIN_ARTWORK);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    /* Frame the disc onto the cap. Nothing else about the material, the
       lighting or the geometry changes — this only moves the window over the
       supplied sheet. */
    texture.repeat.set(ART_BOX.w, ART_BOX.h);
    texture.offset.set(ART_BOX.u, ART_BOX.v);
    return texture;
  }, [artworkReady]);

  useEffect(() => () => faceTexture.dispose(), [faceTexture]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.42;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.PI / 2 + state.pointer.y * 0.16,
      0.04,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, state.pointer.x * 0.12, 0.04);
  });

  const rim = useMemo(
    () => ({ color: '#D9B24A', metalness: 1, roughness: 0.2, envMapIntensity: 1.5 }),
    [],
  );
  const faceProps = useMemo(
    () => ({
      map: faceTexture,
      transparent: true,
      color: '#FFFFFF',
      metalness: 0.55,
      roughness: 0.32,
      envMapIntensity: 1.15,
    }),
    [faceTexture],
  );

  return (
    <group ref={group} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[1, 1, 0.11, 128, 1]} />
        <meshStandardMaterial attach="material-0" {...rim} />
        <meshStandardMaterial attach="material-1" {...faceProps} />
        <meshStandardMaterial attach="material-2" {...faceProps} />
      </mesh>

      {/* Milled edge — rotated into the cylinder's rim plane. The cylinder axis
          is Y, so an unrotated torus (XY plane) would stand perpendicular to it. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.998, 0.055, 14, 180]} />
        <meshStandardMaterial color="#EBD48A" metalness={1} roughness={0.28} envMapIntensity={1.4} />
      </mesh>
    </group>
  );
}

/** Laser assembly rings orbiting the coin — the "forged by laser lines" motif. */
function AssemblyRings({ reduced }) {
  const a = useRef(null);
  const b = useRef(null);
  const c = useRef(null);

  useFrame((state, delta) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += delta * 0.24;
    if (b.current) b.current.rotation.z -= delta * 0.16;
    if (c.current) {
      c.current.rotation.x += delta * 0.1;
      c.current.rotation.y -= delta * 0.13;
    }
  });

  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.42, 0.005, 8, 200]} />
        <meshBasicMaterial color="#63C9EC" toneMapped={false} transparent opacity={0.75} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.85, 0.4, 0]}>
        <torusGeometry args={[1.62, 0.004, 8, 200]} />
        <meshBasicMaterial color="#1FB98A" toneMapped={false} transparent opacity={0.55} />
      </mesh>
      <mesh ref={c}>
        <torusGeometry args={[1.86, 0.003, 8, 200]} />
        <meshBasicMaterial color="#D4AF37" toneMapped={false} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Self-contained studio lighting. Lightformers are rendered into a local cube
 * target, so the metal gets true specular streaks with no HDRI download —
 * important for a self-hosted deployment with no external CDN calls.
 */
function Studio() {
  return (
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={9} color="#FFF6DE" position={[-3, 2.5, 4]} scale={[8, 5, 1]} />
      <Lightformer form="rect" intensity={6} color="#CFE0FF" position={[4, 1, 3]} scale={[5, 6, 1]} />
      <Lightformer form="rect" intensity={4} color="#9BEFD3" position={[0, -3.5, 3]} scale={[8, 3, 1]} />
      <Lightformer form="ring" intensity={5} color="#FFFFFF" position={[0, 4, -1]} scale={[5, 5, 1]} />
      <mesh scale={24}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#131A24" side={THREE.BackSide} />
      </mesh>
    </Environment>
  );
}

/**
 * WebGL coin stage. Lazily imported by callers so three.js never lands in the
 * initial bundle, and capped at DPR 1.6 to keep fill-rate sane on laptops.
 */
export default function CoinScene({ height = 520 }) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      style={{ width: '100%', height }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMappingExposure: 0.95 }}
      camera={{ position: [0, 0, 4.4], fov: 34 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      {/* No background is attached — the canvas stays transparent so the page's
          own light rig shows through behind the coin. */}
      <ambientLight intensity={0.5} />
      <spotLight position={[4, 6, 5]} angle={0.5} penumbra={1} intensity={34} color="#FFF1CE" />
      <spotLight position={[-5, -2, 4]} angle={0.6} penumbra={1} intensity={20} color="#8FB8FF" />
      <directionalLight position={[1, 1, 6]} intensity={0.55} color="#FFFFFF" />

      <Suspense fallback={null}>
        <Float speed={reduced ? 0 : 1.4} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.7}>
          <Coin reduced={reduced} />
          <AssemblyRings reduced={reduced} />
        </Float>
        <Studio />
      </Suspense>

      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
