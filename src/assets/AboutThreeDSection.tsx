import { useEffect, useRef, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Mesh } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CubeData {
  ref: React.RefObject<Mesh>;
  restX: number;
  restY: number;
  restZ: number;
  size: number;
  color: string;
  emissive: string;
  floatRange: number;
  speed: number;
  phase: number;
  rotY: number;
  rotX: number;
  rotZ: number;

}

const COLORS = [
  "#f9a8d4", "#f472b6", "#fbcfe8",
  "#c084fc", "#a78bfa", "#ddd6fe", "#e879f9",
  "#93c5fd", "#60a5fa", "#bfdbfe",
  "#a5f3fc", "#67e8f9", "#99f6e4", "#f0abfc",
];

export function AboutMeshes({ driftTrigger = 0 }: { driftTrigger?: number }) {
  const { viewport } = useThree();
  const margin = 0.6;
  const edgeX = (viewport.width / 2 - margin) * 0.95;

  const entryComplete = useRef(false);
  const isDriftingRef = useRef(false);

  const r0 = useRef<Mesh>(null!);
  const r1 = useRef<Mesh>(null!);
  const r2 = useRef<Mesh>(null!);
  const r3 = useRef<Mesh>(null!);
  const r4 = useRef<Mesh>(null!);
  const r5 = useRef<Mesh>(null!);
  const r6 = useRef<Mesh>(null!);
  const r7 = useRef<Mesh>(null!);
  const r8 = useRef<Mesh>(null!);
  const r9 = useRef<Mesh>(null!);
  const r10 = useRef<Mesh>(null!);
  const r11 = useRef<Mesh>(null!);
  const r12 = useRef<Mesh>(null!);
  const r13 = useRef<Mesh>(null!);

  const leftRefs = [r0, r1, r2, r3, r4, r5, r6];
  const rightRefs = [r7, r8, r9, r10, r11, r12, r13];

  const leftY = [3.0, 2.0, 1.0, 0, -1.0, -2.0, -3.0];
  const rightY = [3.0, 2.0, 1.0, 0, -1.0, -2.0, -3.0];
  const sizes = [0.35, 0.5, 0.4, 0.65, 0.38, 0.55, 0.45];

  const leftCubes: CubeData[] = leftRefs.map((ref, i) => ({
    ref,
    restX: -edgeX,
    restY: leftY[i],
    restZ: 0,
    size: sizes[i],
    color: COLORS[i],
    emissive: COLORS[i],
    floatRange: 0.15 + Math.random() * 0.2,
    speed: 0.7 + Math.random() * 0.8,
    phase: Math.random() * Math.PI * 2,
    rotY: 0.3 + Math.random() * 0.4,
    rotX: Math.random() > 0.5 ? 0.2 + Math.random() * 0.15 : 0,
    rotZ: Math.random() > 0.5 ? 0.1 + Math.random() * 0.15 : 0,
  }));

  const rightCubes: CubeData[] = rightRefs.map((ref, i) => ({
    ref,
    restX: edgeX,
    restY: rightY[i],
    restZ: 0,
    size: sizes[i],
    color: COLORS[i + 7],
    emissive: COLORS[i + 7],
    floatRange: 0.15 + Math.random() * 0.2,
    speed: 0.7 + Math.random() * 0.8,
    phase: Math.random() * Math.PI * 2,
    rotY: 0.3 + Math.random() * 0.4,
    rotX: Math.random() > 0.5 ? 0.2 + Math.random() * 0.15 : 0,
    rotZ: Math.random() > 0.5 ? 0.1 + Math.random() * 0.15 : 0,
  }));

  const cubes = [...leftCubes, ...rightCubes];

  useLayoutEffect(() => {
    const origins = cubes.map(() => ({
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 5,
    }));

    const ctx = gsap.context(() => {
      cubes.forEach((c, i) => {
        gsap.set(c.ref.current.position, { x: origins[i].x, y: origins[i].y, z: origins[i].z });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: "#about", start: "top 80%", once: true },
        onComplete: () => { entryComplete.current = true; },
      });

      cubes.forEach((c) => {
        tl.to(c.ref.current.position, {
          x: c.restX, z: c.restZ, duration: 2.0, ease: "sine.out",
        }, 0.3);
      });

      cubes.forEach((c) => {
        gsap.to(c.ref.current.scale, {
          x: 1.12, y: 1.12, z: 1.12,
          duration: 1.5 + Math.random() * 0.8,
          repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: Math.random() * 3,
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (driftTrigger === 0) {
      if (!entryComplete.current) return;
      gsap.killTweensOf(
        cubes.map(c => c.ref.current.position)
      );
      let done = 0;
      cubes.forEach((c, i) => {
        gsap.to(c.ref.current.position, {
          x: c.restX,
          y: c.restY,
          z: c.restZ,
          duration: 1.0,
          ease: "sine.out",
          delay: i * 0.03,
          onComplete: () => {
            done++;
            if (done === cubes.length) isDriftingRef.current = false;
          },
        });
      });
      return;
    }

    isDriftingRef.current = true;
    cubes.forEach((c) => {
      const wander = () => {
        gsap.to(c.ref.current.position, {
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 8,
          z: (Math.random() - 0.5) * 4,
          duration: 3 + Math.random() * 3,
          ease: "sine.inOut",
          onComplete: () => {
            if (isDriftingRef.current) wander();
          },
        });
      };
      wander();
    });
  }, [driftTrigger]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    for (const c of cubes) {
      if (!c.ref.current) continue;
      if (!isDriftingRef.current) {
        const lift = (Math.sin(t * c.speed + c.phase) * 0.5 + 0.5) * c.floatRange;
        c.ref.current.position.y = c.restY + lift;
        if (entryComplete.current) {
          c.ref.current.position.x = c.restX;
          c.ref.current.position.z = c.restZ;
        }
      }
      c.ref.current.rotation.y = t * c.rotY;
      if (c.rotX) c.ref.current.rotation.x = t * c.rotX;
      if (c.rotZ) c.ref.current.rotation.z = t * c.rotZ;
    }
  });

  return (
    <group>
      <pointLight position={[-edgeX, 0, 2]} color="#d946ef" intensity={1.0} distance={15} decay={2} />
      <pointLight position={[edgeX, 0, 2]} color="#60a5fa" intensity={1.0} distance={15} decay={2} />

      {cubes.map((c, i) => (
        <mesh key={i} ref={c.ref} position={[c.restX, c.restY, c.restZ]}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshStandardMaterial color={c.color} emissive={c.emissive} emissiveIntensity={0.5} roughness={0.15} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}
