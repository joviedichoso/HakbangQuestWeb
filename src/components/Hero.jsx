import React, { useEffect, useState, useMemo, useRef } from "react";
// Ensure this path matches your project structure based on the previous file
import backgroundImage from "../../src/assets/image/jogging.jpg";

const COLORS = {
  blue: "#4361EE",
  blueHover: "#3a55d6",
  yellow: "#FFC107",
  pink: "#FF4D6D",
  textLight: "#F1F5F9", // Slate-100
  white: "#FFFFFF",
};

// Inject animations and global styles for this component
if (typeof document !== "undefined" && !document.getElementById("hkq-hero-styles")) {
  const styleEl = document.createElement("style");
  styleEl.id = "hkq-hero-styles";
  styleEl.textContent = `
    .hkq-gradient-text {
      background: linear-gradient(to right, ${COLORS.blue}, ${COLORS.yellow}, ${COLORS.pink}, ${COLORS.blue});
      background-size: 300% auto;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      animation: hkq-gradient 8s linear infinite;
    }

    @keyframes hkq-gradient {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }

    @keyframes hkq-fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hkq-animate-entry {
      animation: hkq-fade-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
  `;
  document.head.appendChild(styleEl);
}

const Hero = ({ onGetApp, onShareSuggestion }) => {
  const [scrollY, setScrollY] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = useMemo(
    () => ["Level Up Your Journey", "Push Your Limits", "Celebrate Progress"],
    []
  );

  // Text Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  // Parallax Logic
  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={styles.heroWrapper} aria-label="HakbangQuest Hero">
      {/* Background Image with Parallax */}
      <div
        style={{
          ...styles.bgImage,
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${scrollY * 0.4}px) scale(1.1)`, // Parallax effect
        }}
      />

      {/* Gradient Overlay for Readability */}
      <div style={styles.overlay} />

      {/* Content Container */}
      <div style={styles.container}>
        <div className="hkq-animate-entry" style={styles.content}>
          <div style={styles.badge}>
            <span style={{ marginRight: 6 }}></span> FITNESS GAMIFIED
          </div>

          <h1 style={styles.title}>
            Track distance, <br />
            build strength, <br />
            <span className="hkq-gradient-text" style={styles.gradientText}>
              {words[wordIndex]}.
            </span>
          </h1>

          <p style={styles.subtitle}>
            From running and cycling to push-ups and beyond—HakbangQuest keeps
            your progress simple, minimal, and motivating.
          </p>

          <div style={styles.buttonGroup}>
            <PrimaryButton onClick={onGetApp}>
              Get the App
            </PrimaryButton>
            <SecondaryButton onClick={onShareSuggestion}>
              Share a Suggestion
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Sub-Components for Clean Code ---

const PrimaryButton = ({ children, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.btnBase,
        ...styles.btnPrimary,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 10px 25px -5px rgba(67, 97, 238, 0.5)" : "0 4px 6px -1px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({ children, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.btnBase,
        ...styles.btnSecondary,
        background: hover ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {children}
    </button>
  );
};

// --- Styles Object ---

const styles = {
  heroWrapper: {
    position: "relative",
    height: "85vh",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: COLORS.white,
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    willChange: "transform",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.7) 60%, rgba(15, 23, 42, 0.95) 100%)",
    zIndex: 1,
  },
  container: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "1200px",
    padding: "0 24px",
    margin: "0 auto",
  },
  content: {
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    justifyContent: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1px",
    width: "fit-content",
    color: "#E2E8F0",
  },
  title: {
    fontSize: "clamp(40px, 6vw, 72px)",
    fontWeight: "900",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  gradientText: {
    display: "block",
    marginTop: "8px",
  },
  subtitle: {
    fontSize: "clamp(16px, 2vw, 20px)",
    lineHeight: 1.6,
    color: COLORS.textLight,
    maxWidth: "600px",
    margin: 0,
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "16px",
  },
  btnBase: {
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "700",
    borderRadius: "14px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    background: COLORS.blue,
    color: COLORS.white,
  },
  btnSecondary: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: COLORS.white,
  },
};

export default Hero;