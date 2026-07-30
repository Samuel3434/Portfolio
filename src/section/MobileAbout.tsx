import { useRef, useEffect, useState } from "react";
import { LiquidGlass } from "react-liquid-glass-svg";
import { TextReveal } from "../Components/TextReveal";
import { WordReveal } from "../Components/WordReveal";
import { ProjectCard } from "../Components/ProjectCard";
import { Modal } from "../Components/Modal";
import { experiences, type Experience } from "../data/experiences";
import noImageSvg from "../assets/imgs/no-image.svg";

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

const modalTitleStyle: React.CSSProperties = {
  fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
  fontWeight: 800,
  color: "#0f172a",
  margin: "0 0 16px 0",
};

const modalDescStyle: React.CSSProperties = {
  fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
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
  flexWrap: "wrap",
};

const gallerySidebarStyle: React.CSSProperties = {
  flex: "1 1 100%",
  maxWidth: "100%",
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

export default function MobileAbout() {
  const [selectedProject, setSelectedProject] = useState<Experience | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const cardsScrollerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

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
      if (match) setSelectedProject(match);
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
        if (match) { setSelectedProject(match); return; }
      }
      setSelectedProject(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const scrollCards = (dir: "left" | "right") => {
    const el = cardsScrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return;
    const snap = el.scrollLeft;
    let currentIdx = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - snap);
      if (dist < closestDist) { closestDist = dist; currentIdx = i; }
    });
    const targetIdx = dir === "left"
      ? Math.max(0, currentIdx - 1)
      : Math.min(cards.length - 1, currentIdx + 1);
    el.scrollLeft = cards[targetIdx].offsetLeft;
  };

  return (
    <>
      {/* === ABOUT === */}
      <section
        id="about"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <LiquidGlass
          glassBorder
          backdropBlur={6}
          tintColor="rgba(59,130,246,0.08)"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
            padding: "10vh 8vw",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2.5vh, 24px)",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 10vw, 5rem)",
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
                fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
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
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                fontWeight: 350,
                lineHeight: 1.8,
                color: "#334155",
                margin: 0,
              }}
            />

            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.65rem, 2vw, 0.7rem)",
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
                fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
                fontWeight: 350,
                lineHeight: 1.7,
                color: "#475569",
                margin: 0,
              }}
            />

            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.65rem, 2vw, 0.7rem)",
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
                fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
                fontWeight: 350,
                lineHeight: 1.7,
                color: "#475569",
                margin: 0,
              }}
            />

            <TextReveal
              as="blockquote"
              text={'"Clean code, honest design, and experiences that feel right."'}
              style={{
                margin: 0,
                paddingLeft: 20,
                borderLeft: "3px solid #4A55E8",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                color: "#1e293b",
                lineHeight: 1.6,
              }}
            />
          </div>
        </LiquidGlass>
      </section>

      {/* === EXPERIENCES === */}
      <section
        id="experiences"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            padding: "0 8vw",
          }}
        >
          <span
            style={{
              fontFamily: "'Eroded', serif",
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: 1000,
              color: "#4A55E8",
              letterSpacing: "0.15em",
              userSelect: "none",
              marginBottom: "clamp(24px, 4vh, 48px)",
            }}
          >
            Experiences
          </span>

            <div
              ref={cardsScrollerRef}
              style={{
                display: "flex",
                gap: 24,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                padding: "16px max(0px, calc(42vw - 160px))",
                width: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                WebkitScrollSnapType: "x mandatory",
                boxSizing: "border-box",
              }}
            >
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    scrollSnapAlign: "center",
                  }}
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

        <button
          onClick={() => scrollCards("left")}
          style={{
            position: "absolute",
            top: "50%",
            left: 12,
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontSize: 24,
            color: "#4A55E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            touchAction: "manipulation",
          }}
          aria-label="Previous projects"
        >
          ‹
        </button>
        <button
          onClick={() => scrollCards("right")}
          style={{
            position: "absolute",
            top: "50%",
            right: 12,
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontSize: 24,
            color: "#4A55E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            touchAction: "manipulation",
          }}
          aria-label="Next projects"
        >
          ›
        </button>
      </section>

      {/* === MODAL === */}
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
                      onClick={() => setCurrentImageIndex((i) => (i - 1 + selectedProject.images!.length) % selectedProject.images!.length)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
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
                      onClick={() => setCurrentImageIndex((i) => (i + 1) % selectedProject.images!.length)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
                    >
                      →
                    </button>
                  </div>
                )}

                {selectedProject.links && selectedProject.links.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <h4 style={{ ...sectionTitleStyle, marginBottom: 12 }}>Links</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {selectedProject.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={linkButtonStyle}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
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

      {/* === FULLSCREEN OVERLAY === */}
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
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
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
              zIndex: 1,
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
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
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
              zIndex: 1,
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
              top: 12,
              right: 12,
              width: 40,
              height: 40,
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
              zIndex: 1,
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
              bottom: 24,
              left: "50%",
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
    </>
  );
}
