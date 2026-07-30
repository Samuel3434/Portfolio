import instagramIcon from "../assets/instagram.svg";
import githubIcon from "../assets/github.svg";
import telegramIcon from "../assets/telegram.svg";

function MenuIcon() {
  return (
    <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
      <line
        x1="0"
        y1="3"
        x2="26"
        y2="3"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="13"
        x2="26"
        y2="13"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        padding: "3.2rem 8vw 0 8vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
        boxSizing: "border-box",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left: Logo & Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "34px",
                backgroundColor: "#FFB0A0",
                marginRight: "-4px",
                zIndex: 1,
              }}
            />
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#553DE3",
                zIndex: 2,
              }}
            />
          </div>
          <span
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              letterSpacing: "2.5px",
              color: "#18181B",
            }}
          >
            FOLIO<span style={{ color: "#FF8C00" }}>.</span>
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <a
            href="https://instagram.com/o_t_u_r_a_n"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              color: "#18181B",
              fontWeight: 700,
              fontSize: "clamp(0.75rem, 1.2vw, 1.1rem)",
            }}
          >
            <img src={instagramIcon} alt="Instagram" width="18" height="18" />
            <span>Instagram</span>
          </a>
          <a
            href="https://github.com/Samuel3434"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              color: "#18181B",
              fontWeight: 700,
              fontSize: "clamp(0.75rem, 1.2vw, 1.1rem)",
            }}
          >
            <img src={githubIcon} alt="GitHub" width="18" height="18" />
            <span>GitHub</span>
          </a>
          <a
            href="https://t.me/Oturan1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              color: "#18181B",
              fontWeight: 700,
              fontSize: "clamp(0.75rem, 1.2vw, 1.1rem)",
            }}
          >
            <img src={telegramIcon} alt="Telegram" width="18" height="18" />
            <span>Telegram</span>
          </a>
        </nav>
      </div>

      {/* Right: Hamburger Menu */}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
        aria-label="Open Menu"
      >
        <MenuIcon />
      </button>
    </header>
  );
}
