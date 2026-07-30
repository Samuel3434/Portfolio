import React from "react";

export interface ProjectCardProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  circleBg?: string;
  width?: string;
  className?: string;
}

const cardStyle: React.CSSProperties = {
  width: "clamp(320px, 28vw, 480px)",
  background: "rgba(255, 255, 255, 0.65)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: "40px",
  padding: "80px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
  border: "1px solid rgba(255,255,255,0.6)",
  transition:
    "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, background 0.35s ease",
  boxSizing: "border-box",
  height: "640px",
  overflow: "hidden",
};

const iconCircleStyle = (bg: string): React.CSSProperties => ({
  width: "170px",
  height: "170px",
  borderRadius: "50%",
  backgroundColor: bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "44px",
  flexShrink: 0,
  overflow: "hidden",
  boxShadow: `inset 0 -2px 8px rgba(0,0,0,0.08), 0 8px 24px ${bg}44`,
});

const iconImgStyle: React.CSSProperties = {
  width: "100px",
  height: "100px",
  objectFit: "contain",
  filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  fontWeight: 800,
  color: "#0f172a",
  margin: "0 0 28px 0",
  letterSpacing: "-0.02em",
};

const descStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 400,
  color: "#64748b",
  lineHeight: 1.7,
  margin: "0 0 52px 0",
  flexGrow: 1,
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#030B2E",
  color: "#ffffff",
  border: "none",
  borderRadius: "16px",
  padding: "16px 36px",
  fontSize: "0.95rem",
  fontWeight: 700,
  cursor: "pointer",
  transition: "background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
  boxShadow: "0 4px 12px rgba(3, 11, 46, 0.15)",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  icon,
  title,
  description,
  buttonText = "Find out more",
  onButtonClick,
  circleBg = "#4849FF",
  width,
  className = "",
}) => {
  return (
    <div
      className={`feature-card ${className}`}
      style={{
        ...cardStyle,
        ...(width ? { width } : {}),
        pointerEvents: "none",
      }}
    >
      <div style={iconCircleStyle(circleBg)}>
        {typeof icon === "string" ? (
          <img src={icon} alt={title} style={iconImgStyle} />
        ) : (
          icon
        )}
      </div>

      <h3 style={titleStyle}>{title}</h3>

      <p style={descStyle}>{description}</p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          style={{ ...buttonStyle, pointerEvents: "auto" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#10194A";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(3,11,46,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#030B2E";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(3,11,46,0.15)";
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
