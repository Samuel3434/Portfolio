import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isGrabbing: boolean;
}

const WIDTH = 80;
const HEIGHT = 80;

export default function CustomCursor({ containerRef, isGrabbing }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef.current;
    if (!cursor || !container) return;

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.25, ease: "power2.out" });
    };

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - WIDTH / 2,
        y: e.clientY - HEIGHT / 2,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (isGrabbing) {
      gsap.to(cursor, {
        scale: 0.7,
        backgroundColor: "rgba(72, 73, 255, 0.15)",
        borderColor: "#4849FF",
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#4849FF",
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [isGrabbing]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: WIDTH,
        height: HEIGHT,
        borderRadius: 999,
        border: "2px solid #4849FF",
        backgroundColor: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        color: "#4849FF",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <span style={{ fontSize: 14, lineHeight: 1 }}>&#8592;</span>
      <span>drag</span>
      <span style={{ fontSize: 14, lineHeight: 1 }}>&#8594;</span>
    </div>
  );
}
