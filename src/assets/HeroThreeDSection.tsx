import { useFrame, useThree } from "@react-three/fiber";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import { useRef, useLayoutEffect } from "react";
import type { Mesh } from "three";

// Register the plugin outside the component
gsap.registerPlugin(ScrollTrigger);

// Prevent browser from jumping to past scroll position on refresh
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export function Scene() {
  const topCube = useRef<Mesh>(null!);
  const leftCube = useRef<Mesh>(null!);
  const rightCube = useRef<Mesh>(null!);
  const backCube = useRef<Mesh>(null!);

  const sphereRef = useRef<Mesh>(null!);
  const floatCube1 = useRef<Mesh>(null!);
  const floatCube2 = useRef<Mesh>(null!);

  const { size } = useThree();
  const scale = Math.max(0.4, Math.min(1.1, size.width / 1440));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Entry Timeline (Runs automatically on mount) ---
      const tl = gsap.timeline({ delay: 1.5 });

      tl.to(
        topCube.current.position,
        { y: 4.8, z: -1.1, duration: 1.5, ease: "power2.inOut" },
        0,
      )
        .to(
          leftCube.current.position,
          { z: -0.5, duration: 1.5, ease: "power2.inOut" },
          0,
        )
        .to(
          rightCube.current.position,
          { x: -0.5, duration: 1.5, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          backCube.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 1.5, ease: "back.out(1.4)" },
          0,
        )
        .fromTo(
          sphereRef.current.position,
          { y: 0 },
          { y: 1.3, duration: 1.5, ease: "power2.out" },
          0.2,
        );

      // --- Scroll Timeline (Only responds to scroll events) ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "300% top",
          scrub: 1.5,
          invalidateOnRefresh: true, // Recalculates positions on resize/refresh
        },
      });

      scrollTl
        .to(
          floatCube1.current.position,
          { z: 4, x: -7, y: -1, duration: 10, ease: "sine.out" },
          0,
        )
        .to(
          floatCube2.current.position,
          { z: 8, x: -5.33, y: -1.7, duration: 10, ease: "sine.out" },
          0.15,
        );
    });

    // Force GSAP to recalculate bounds once DOM & Canvas layout settle
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  useFrame((_, delta) => {
    if (backCube.current) {
      backCube.current.rotation.y += delta * 0.8;
    }
  });
  return (
    <>
      <group scale={scale} position={[-1.2, -4.6, -5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <Geometry>
            <Base>
              <boxGeometry args={[4, 1, 4]} />
            </Base>
            <Subtraction position={[1, 0, 0.8]}>
              <cylinderGeometry args={[0.3, 0.4, 1.2, 32]} />
            </Subtraction>
          </Geometry>
          <meshStandardMaterial color="#4A55E8" roughness={0.5} />
        </mesh>

        <mesh position={[-1, 1, 1]}>
          <Geometry>
            <Base>
              <boxGeometry args={[2, 1, 2]} />
            </Base>
            <Subtraction position={[0.5, 0, 0.5]}>
              <boxGeometry args={[1, 1.2, 1]} />
            </Subtraction>
          </Geometry>
          <meshStandardMaterial color="#BEE3FF" roughness={0.5} />
        </mesh>

        {/* Orange sphere */}
        <mesh ref={sphereRef} position={[1, 1.3, 0.8]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#FF8C00"
            emissive="#FF3300"
            emissiveIntensity={1.15}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>

        <mesh position={[1, 1, -1.5]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>

        <mesh position={[-0.5, 1, 1.5]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#F4F5F8" roughness={0.35} />
        </mesh>

        <group scale={0.9} position={[0, 0, 0]}>
          {/* Top Pink Cube */}
          <mesh ref={topCube} position={[-1, 3.2, -1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#FFD6E0"
              emissive="#FF7A9E"
              emissiveIntensity={0.35}
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>

          {/* Bottom-Left Pastel Cube */}
          <mesh ref={leftCube} position={[-2, 2.2, -1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#F1F5F9"
              emissive="#B8C4D9"
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>

          {/* Bottom-Right Pastel Cube */}
          <mesh ref={rightCube} position={[-1.0, 2.2, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#E4E9F2"
              emissive="#A8B7CC"
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>

          {/* Bottom-Back Pastel Cube */}
          <mesh ref={backCube} position={[-2, 2.2, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#E4E9F2"
              emissive="#A8B7CC"
              emissiveIntensity={0.2}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        </group>
        <mesh ref={floatCube1} position={[-4.5, 0.5, 2]} rotation={[0, 1.3, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>

        <mesh
          ref={floatCube2}
          position={[-3, -0.5, 4.5]}
          rotation={[0, 1.3, 0]}
        >
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#FFD6E0" roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}
