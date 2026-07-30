import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { LiquidGlass } from "react-liquid-glass-svg";
import { AboutMeshes } from "../assets/AboutThreeDSection";
import { TextReveal } from "../Components/TextReveal";
import { WordReveal } from "../Components/WordReveal";
import { ProjectCard } from "../Components/ProjectCard";
import { Modal } from "../Components/Modal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences, type Experience } from "../data/experiences";
import noImageSvg from "../assets/imgs/no-image.svg";
import CustomCursor from "../Components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

const modalTitleStyle: React.CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 800,
  color: "#0f172a",
  margin: "0 0 16px 0",
};

const modalDescStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 400,
  color: "#475569",
  lineHeight: 1.8,
  margin: "0 0 32px 0",
  whiteSpace: "pre-line",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 700,
  color: "#4849FF",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 16px 0",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
};

const marqueeContainerStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100%",
};

const marqueeTrackStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  width: "fit-content",
  animation: "marqueeScroll 30s linear infinite",
};

const techBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  backgroundColor: "#f1f5f9",
  borderRadius: 100,
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#1e293b",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const listItemStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  fontSize: "0.95rem",
  fontWeight: 400,
  color: "#475569",
  lineHeight: 1.6,
};

const bulletStyle: React.CSSProperties = {
  color: "#4849FF",
  flexShrink: 0,
  fontSize: "0.7rem",
  marginTop: 6,
};

const modalBodyStyle: React.CSSProperties = {
  display: "flex",
  gap: 32,
  alignItems: "flex-start",
};

const gallerySidebarStyle: React.CSSProperties = {
  flex: "0 0 40%",
  maxWidth: "40%",
  position: "sticky",
  top: 0,
};

const imageContainerStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "4/3",
  borderRadius: 16,
  overflow: "hidden",
  backgroundColor: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const galleryControlsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  marginTop: 12,
};

const arrowBtnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  background: "#f1f5f9",
  cursor: "pointer",
  fontSize: 14,
  color: "#475569",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
};

const dotBaseStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: "#4849FF",
  cursor: "pointer",
  transition: "opacity 0.2s",
};

const contentAreaStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const linkButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "10px 20px",
  backgroundColor: "#f1f5f9",
  borderRadius: 12,
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#1e293b",
  textDecoration: "none",
  transition: "background 0.2s",
};

export default function About() {
  const [driftCount, setDriftCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Experience | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsInnerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragTranslateXRef = useRef(0);
  const cardsShownRef = useRef(false);
  const isInitialMount = useRef(true);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardsShownRef.current || !cardsInnerRef.current) return;
    isDraggingRef.current = true;
    setIsCursorGrabbing(true);
    dragStartXRef.current = e.clientX;
    const inner = cardsInnerRef.current;
    inner.style.userSelect = "none";

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current || !cardsInnerRef.current) return;
      const container = cardsInnerRef.current.parentElement;
      if (!container) return;
      const maxScroll = cardsInnerRef.current.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      const delta = ev.clientX - dragStartXRef.current;
      const next = Math.max(-maxScroll, Math.min(0, dragTranslateXRef.current + delta));
      dragTranslateXRef.current = next;
      cardsInnerRef.current.style.transform = `translateX(${next}px)`;
      dragStartXRef.current = ev.clientX;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsCursorGrabbing(false);
      if (cardsInnerRef.current) {
        cardsInnerRef.current.style.userSelect = "";
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    let cardsShown = false;
    const cardOffset = cardsInnerRef.current?.scrollWidth ?? 1200;
    gsap.set(cardsContainerRef.current, { width: 0 });
    gsap.set(cardRefs.current.filter(Boolean) as HTMLDivElement[], {
      x: cardOffset,
      opacity: 0,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: (progress) => (progress >= 0.65 ? 1 : 0),
          directional: false,
          duration: { min: 0.4, max: 0.7 },
          ease: "power2.inOut",
        },
      },
      onUpdate: function () {
        const p = this.progress();
        if (textRef.current) {
          textRef.current.textContent = p >= 0.65 ? "Experiences" : "Biography";
        }

        if (p >= 0.99 && !cardsShown) {
          cardsShown = true;
          cardsShownRef.current = true;
          const maxW = window.innerWidth * 0.8;
          const w = Math.min(cardsInnerRef.current?.scrollWidth ?? 1200, maxW);
          gsap.to(cardsContainerRef.current, {
            width: w,
            duration: 0.9,
            ease: "back.out(0.6)",
          });
          gsap.to(cardRefs.current.filter(Boolean) as HTMLDivElement[], {
            x: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.18,
            ease: "back.out(0.6)",
            delay: 0.1,
          });
          setDriftCount((c) => c + 1);
        }

        if (p < 0.6 && cardsShown) {
          cardsShown = false;
          cardsShownRef.current = false;
          dragTranslateXRef.current = 0;
          if (cardsInnerRef.current) {
            cardsInnerRef.current.style.transform = "translateX(0px)";
          }
          setDriftCount(0);
          const off = cardsInnerRef.current?.scrollWidth ?? 1200;
          gsap.to(cardRefs.current.filter(Boolean) as HTMLDivElement[], {
            x: off,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.in",
            onComplete: () => {
              gsap.to(cardsContainerRef.current, {
                width: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
            },
          });
        }
      },
    });

    tl.to({}, { duration: 0.5 });

    tl.to(
      rightRef.current,
      {
        opacity: 0,
        scaleX: 0,
        ease: "power1.inOut",
        duration: 0.5,
      },
      0.5,
    ).to(
      leftRef.current,
      {
        top: "0vh",
        bottom: "0vh",
        left: "0vw",
        width: "100vw",
        borderRadius: 0,
        ease: "power1.inOut",
        duration: 0.5,
        delay: 0.03,
      },
      0.5,
    );
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    setCurrentImageIndex(0);
    setFullscreenIndex(null);
  }, [selectedProject]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const hash = window.location.hash;
    const base = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (selectedProject) {
      params.set("experience", toSlug(selectedProject.title));
    } else {
      params.delete("experience");
    }

    const qs = params.toString();
    const url = qs ? `${base}?${qs}${hash}` : `${base}${hash}`;
    history.replaceState(null, "", url);
  }, [selectedProject]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("experience");
    if (slug) {
      const match = experiences.find((exp) => toSlug(exp.title) === slug);
      if (match) {
        setSelectedProject(match);
      }
    }
  }, []);

  useEffect(() => {
    if (fullscreenIndex === null || !selectedProject?.images) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setFullscreenIndex(null); return; }
      if (e.key === "ArrowRight") {
        setFullscreenIndex((i) => (i! + 1) % selectedProject.images!.length);
      }
      if (e.key === "ArrowLeft") {
        setFullscreenIndex((i) => (i! - 1 + selectedProject.images!.length) % selectedProject.images!.length);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [fullscreenIndex, selectedProject]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("experience");
      if (slug) {
        const match = experiences.find((exp) => toSlug(exp.title) === slug);
        if (match) {
          setSelectedProject(match);
          return;
        }
      }
      setSelectedProject(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100dvh",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {/* LEFT EXPANDING PANEL */}
        <div
          ref={leftRef}
          style={{
            position: "absolute",
            top: "8vh",
            bottom: "8vh",
            left: "12.5vw",
            width: "calc((75vw - 16px) * 0.1666)",
            borderRadius: 24,
            overflow: "hidden",
            willChange: "top, left, width, bottom, border-radius",
          }}
        >
          <LiquidGlass
            glassBorder
            backdropBlur={6}
            tintColor="rgba(59,130,246,0.08)"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                ref={textRef}
                style={{
                  fontFamily: "'Eroded', serif",
                  fontSize: "clamp(3.5rem, 6vw, 6.9rem)",
                  fontWeight: 1000,
                  color: "#4A55E8",
                  letterSpacing: "0.15em",
                  writingMode: "sideways-lr",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                Biography
              </span>

              <div
                ref={cardsContainerRef}
                style={{ overflow: "hidden", width: 0, flexShrink: 0 }}
              >
                <div
                  ref={cardsInnerRef}
                  onMouseDown={handleMouseDown}
                  style={{
                    display: "flex",
                    gap: 24,
                    padding: "16px 0 16px 48px",
                    cursor: "none",
                    userSelect: "none",
                    pointerEvents: "auto",
                  }}
                >
                  {experiences.map((exp, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      style={{ flexShrink: 0 }}
                    >
                      <ProjectCard
                        icon={exp.icon}
                        title={exp.title}
                        description={exp.description}
                        circleBg={exp.circleBg}
                        onButtonClick={() => setSelectedProject(exp)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </LiquidGlass>
        </div>

        {/* RIGHT COLLAPSING PANEL */}
        <div
          ref={rightRef}
          style={{
            position: "absolute",
            top: "8vh",
            bottom: "8vh",
            right: "12.5vw",
            width: "calc((75vw - 16px) * 0.8333)",
            borderRadius: 24,
            overflow: "hidden",
            willChange: "opacity, transform",
            transformOrigin: "right",
          }}
        >
          <LiquidGlass
            glassBorder
            backdropBlur={6}
            tintColor="rgba(59,130,246,0.08)"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
              padding: 46,
              marginTop:-20,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -10,
                bottom: -30,
                fontSize: 320,
                fontWeight: 900,
                lineHeight: 1,
                fontFamily: "'Playfair Display', serif",
                color: "rgba(74,85,232,0.06)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              S
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#4A55E8",
                }}
              >
                S
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
                  fontWeight: 700,
                  color: "#0f172a",
                  letterSpacing: "0.2em",
                }}
              >
                AMUEL
              </span>

              <div
                style={{
                  width: 48,
                  height: 3,
                  backgroundColor: "#4A55E8",
                  borderRadius: 2,
                }}
              />

              <TextReveal
                text="I build things for the web. Started coding because I wanted to solve problems that actually matter not just theory, but real tools people use every day."
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                  fontWeight: 350,
                  lineHeight: 1.8,
                  color: "#334155",
                  margin: 0,
                  maxWidth: "90%",
                }}
              />

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#4A55E8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                What I do
              </span>
              <TextReveal
                text="Full-stack development with React, Node.js, and MySQL. I focus on building seamless, interactive experiences that feel intuitive from the database to the interface."
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                  fontWeight: 350,
                  lineHeight: 1.7,
                  color: "#475569",
                  margin: 0,
                  maxWidth: "90%",
                }}
              />

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#4A55E8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Beyond code
              </span>
              <TextReveal
                text="When I'm not building, I'm learning exploring new tools and technologies, always trying to understand how things work and how they can work better."
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                  fontWeight: 350,
                  lineHeight: 1.7,
                  color: "#475569",
                  margin: 0,
                  maxWidth: "90%",
                }}
              />

              <TextReveal
                as="blockquote"
                text={
                  '"Clean code, honest design, and experiences that feel right."'
                }
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  borderLeft: "3px solid #4A55E8",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                  color: "#1e293b",
                  lineHeight: 1.6,
                  maxWidth: "90%",
                }}
              />
            </div>
          </LiquidGlass>
        </div>
      </div>

      <Canvas
        flat
        orthographic
        camera={{
          zoom: 90,
          position: [0, 0, 10],
          near: 0.1,
          far: 1000,
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        <hemisphereLight args={["#ffffff", "#ffffff", 0.8]} />
        <directionalLight
          position={[10, 15, -10]}
          intensity={0.6}
          color="#ffffff"
        />
        <directionalLight
          position={[10, 15, -5]}
          intensity={0.6}
          color="#ffffff"
        />

        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>

        <AboutMeshes driftTrigger={driftCount} />
      </Canvas>

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <>
            <h2 style={modalTitleStyle}>{selectedProject.title}</h2>
            <div style={modalBodyStyle}>
              <div style={gallerySidebarStyle}>
                <div style={{ ...imageContainerStyle, backgroundColor: selectedProject.circleBg + "15" }}>
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    selectedProject.images[currentImageIndex].startsWith("placeholder") ? (
                      <img src={noImageSvg} alt="No image available" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <img
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in" }}
                        onClick={() => setFullscreenIndex(currentImageIndex)}
                      />
                    )
                  ) : (
                    <img src={noImageSvg} alt="No image available" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  )}
                </div>

                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div style={galleryControlsStyle}>
                    <button
                      style={arrowBtnStyle}
                      onClick={() =>
                        setCurrentImageIndex(
                          (i) => (i - 1 + selectedProject.images!.length) % selectedProject.images!.length,
                        )
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e2e8f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f1f5f9";
                      }}
                    >
                      ←
                    </button>
                    <div style={{ display: "flex", gap: 6 }}>
                      {selectedProject.images.map((_, i) => (
                        <span
                          key={i}
                          style={{ ...dotBaseStyle, opacity: i === currentImageIndex ? 1 : 0.25 }}
                          onClick={() => setCurrentImageIndex(i)}
                        />
                      ))}
                    </div>
                    <button
                      style={arrowBtnStyle}
                      onClick={() =>
                        setCurrentImageIndex((i) => (i + 1) % selectedProject.images!.length)
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e2e8f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f1f5f9";
                      }}
                    >
                      →
                    </button>
                  </div>
                )}

                {selectedProject.links && selectedProject.links.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <h4 style={{ ...sectionTitleStyle, marginBottom: 12 }}>Links</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {selectedProject.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={linkButtonStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#e2e8f0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f1f5f9";
                          }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={contentAreaStyle}>
                <WordReveal text={selectedProject.detailedDescription} style={modalDescStyle} />

                <div style={sectionStyle}>
                  <h4 style={sectionTitleStyle}>Tech Stack</h4>
                  <style>{`@keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
                  <div style={marqueeContainerStyle}>
                    <div style={marqueeTrackStyle}>
                      {[...selectedProject.techStack, ...selectedProject.techStack].map((tech, i) => (
                        <span key={i} style={techBadgeStyle}>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "#4849FF",
                              flexShrink: 0,
                            }}
                          />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={sectionStyle}>
                  <h4 style={sectionTitleStyle}>Key Features</h4>
                  <div style={listStyle}>
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} style={listItemStyle}>
                        <span style={bulletStyle}>◆</span>
                        <WordReveal as="span" text={h} style={{ color: "inherit", fontSize: "inherit" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>

      {selectedProject && fullscreenIndex !== null && selectedProject.images && selectedProject.images[fullscreenIndex] && !selectedProject.images[fullscreenIndex].startsWith("placeholder") && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setFullscreenIndex(null)}
        >
          <button
            style={{
              position: "absolute",
              left: 24, top: "50%",
              transform: "translateY(-50%)",
              width: 48, height: 48,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              transition: "background 0.2s",
            }}
            onClick={(e) => { e.stopPropagation(); setFullscreenIndex((i) => (i! - 1 + selectedProject.images!.length) % selectedProject.images!.length); }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            ‹
          </button>

          <img
            src={selectedProject.images[fullscreenIndex]}
            alt={`${selectedProject.title} screenshot ${fullscreenIndex + 1}`}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 8,
              userSelect: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            style={{
              position: "absolute",
              right: 24, top: "50%",
              transform: "translateY(-50%)",
              width: 48, height: 48,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              transition: "background 0.2s",
            }}
            onClick={(e) => { e.stopPropagation(); setFullscreenIndex((i) => (i! + 1) % selectedProject.images!.length); }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            ›
          </button>

          <button
            style={{
              position: "absolute",
              top: 24, right: 24,
              width: 40, height: 40,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              transition: "background 0.2s",
            }}
            onClick={(e) => { e.stopPropagation(); setFullscreenIndex(null); }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            ✕
          </button>

          <div
            style={{
              position: "absolute",
              bottom: 24, left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {fullscreenIndex + 1} / {selectedProject.images.length}
          </div>
        </div>
      )}
      <CustomCursor containerRef={cardsInnerRef} isGrabbing={isCursorGrabbing} />
    </div>
  );
}
