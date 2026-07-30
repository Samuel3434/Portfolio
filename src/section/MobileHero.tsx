import Navbar from "../Components/NavBar";
import { useEffect } from "react";

export default function MobileHero() {
  useEffect(() => {
    if (window.location.hash) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      id="hero"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="hero-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "#553DE3",
          transformOrigin: "bottom",
          pointerEvents: "none",
        }}
      />
      <div className="hero-content">
        <Navbar />
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="line-shadow-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0.1"
                dy="0.25"
                stdDeviation="0.2"
                floodColor="#181818"
                floodOpacity="0.3"
                result="shadow"
              />

              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="0.3"
                result="glow"
              />

              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x="0" y="0" width="59.5" height="100" fill="#FFFFFF" />
          <rect x="59.5" y="0" width="40.5" height="100" fill="#553DE3" />
          <polygon points="45.2,100 59.5,92 59.5,100" fill="#3D32ED" />
          <polygon points="59.5,92 100,69.3 100,100 59.5,100" fill="#94A2F6" />
          <line
            x1="100"
            y1="80.0"
            x2="59.5"
            y2="102.67"
            stroke="#888888"
            strokeWidth="0.15"
            strokeOpacity="0.5"
          />
          <line
            x1="100"
            y1="90.0"
            x2="82.13"
            y2="100.0"
            stroke="#888888"
            strokeWidth="0.15"
            strokeOpacity="0.5"
          />
          <line
            x1="0"
            y1="100.0"
            x2="59.5"
            y2="66.71"
            stroke="#888888"
            strokeWidth="0.15"
            strokeOpacity="0.2"
            filter="url(#line-shadow-glow)"
          />
          <line
            x1="27.32"
            y1="100.0"
            x2="59.5"
            y2="82.0"
            stroke="#888888"
            strokeWidth="0.15"
            strokeOpacity="0.2"
            filter="url(#line-shadow-glow)"
          />
          <line
            x1="0"
            y1="85.29"
            x2="59.5"
            y2="52.0"
            stroke="#888888"
            strokeWidth="0.15"
            strokeOpacity="0.2"
            filter="url(#line-shadow-glow)"
          />
        </svg>

        <div
          className="hero-text"
          style={{
            position: "relative",
            zIndex: 2,
            width: "80%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "8vw",
            fontFamily: "sans-serif",
          }}
        >
          <span
            style={{
              color: "#553DE3",
              fontWeight: 700,
              fontSize: "clamp(0.8rem, 3vw, 1.1rem)",
              marginBottom: "1.5rem",
            }}
          >
            — Samuel
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 8vw, 3.8rem)",
              fontWeight: 800,
              color: "#18181B",
              lineHeight: "1.1",
              margin: 0,
            }}
          >
            Hello, my
            <br />
            name's Samuel.
            <br />
            I'm a Full-Stack
            <br />
            Developer.
          </h1>
        </div>
      </div>

      <style>{`
        .hero-overlay {
          animation: heroReveal 1.5s ease-in forwards;
        }
        @keyframes heroReveal {
          from { transform: scaleY(1); }
          to { transform: scaleY(0); }
        }
        .hero-content {
          animation: growin 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s forwards;
          transform-origin: center center;
          position: relative;
          width: 100%;
          height: 100%;
        }
        @keyframes growin {
          from { transform: scale(0.4); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
