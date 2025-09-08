import React, { useEffect, useMemo, useRef, useState } from "react";
import backgroundImage from "../../src/assets/image/jogging.jpg";

const COLORS = {
  blue: "#4361EE",
  blueHover: "#3a55d6",
  blueActive: "#3249b9",
  yellow: "#FFC107",
  pink: "#FF4D6D",
  textLight: "#E5E7EB",
  white: "#FFFFFF",
};

const TRANSITION = "180ms ease";

// Inject gradient text styles once
if (typeof document !== "undefined" && !document.getElementById("hkq-animated-gradient-text")) {
  const styleEl = document.createElement("style");
  styleEl.id = "hkq-animated-gradient-text";
  styleEl.textContent = `
    .hkq-gradient-text {
      background-image: linear-gradient(90deg, ${COLORS.blue}, ${COLORS.yellow}, ${COLORS.pink}, ${COLORS.blue});
      background-size: 300% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      animation: hkq-move-gradient 10s ease-in-out infinite;
      transition: opacity 0.6s ease;
    }

    @keyframes hkq-move-gradient {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @media (prefers-reduced-motion: reduce) {
      .hkq-gradient-text {
        animation: hkq-move-gradient 20s linear infinite;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

function Hero({ onGetApp, onShareSuggestion }) {
  // Buttons hover states
  const [primaryState, setPrimaryState] = useState("idle");
  const [linkState, setLinkState] = useState("idle");

  // Rotating words
  const words = useMemo(
    () => ["level up your journey.", "push your limits.", "celebrate progress."],
    []
  );
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [words.length]);

  // Parallax: subtle translateY on the background image
  const imageRef = useRef(null);
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (prefersReduced) return;
    const el = imageRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY || window.pageYOffset || 0;
        // Subtle mapping: 0.06 factor, clamp to ±18px
        const shift = Math.max(-18, Math.min(18, scrolled * 0.06));
        el.style.transform = `translateY(${shift}px) scale(1.03)`;
        el.style.willChange = "transform";
        ticking = false;
      });
    };

    onScroll(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReduced]);

  const primaryStyles = getPrimaryBtnStyles(primaryState);
  const linkStyles = getLinkBtnStyles(linkState);

  return (
    <section style={styles.hero} aria-label="HakbangQuest introduction">
      <div style={styles.bg} />
      <div style={styles.content}>
        <h1 style={styles.h1}>
          Track distance, build strength,{" "}
          <span className="hkq-gradient-text" style={styles.h1AccentAnimated}>
            {words[current]}
          </span>
        </h1>
        <p style={styles.subtitle}>
          From running and cycling to push-ups and beyond—HakbangQuest keeps progress simple, minimal, and motivating.
        </p>
        <div style={styles.actions}>
          <button
            style={primaryStyles}
            onClick={onGetApp}
            onMouseEnter={() => setPrimaryState("hover")}
            onMouseLeave={() => setPrimaryState("idle")}
            onMouseDown={() => setPrimaryState("active")}
            onMouseUp={() => setPrimaryState("hover")}
          >
            Get the App
          </button>
          <button
            style={linkStyles}
            onClick={onShareSuggestion}
            onMouseEnter={() => setLinkState("hover")}
            onMouseLeave={() => setLinkState("idle")}
            onMouseDown={() => setLinkState("active")}
            onMouseUp={() => setLinkState("hover")}
          >
            Share a suggestion →
          </button>
        </div>
      </div>

      <div
        ref={imageRef}
        style={{
          ...styles.image,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${backgroundImage})`,
        }}
        aria-hidden="true"
      />
    </section>
  );
}

function getPrimaryBtnStyles(state) {
  const base = {
    background: COLORS.blue,
    color: COLORS.white,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    fontWeight: 800,
    cursor: "pointer",
    transition: TRANSITION,
    boxShadow: "0 6px 16px rgba(67,97,238,0.35)",
  };
  if (state === "hover") return { ...base, background: COLORS.blueHover };
  if (state === "active") return { ...base, background: COLORS.blueActive };
  return base;
}

function getLinkBtnStyles(state) {
  const base = {
    background: "rgba(255,255,255,0.06)",
    color: COLORS.white,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(229,231,235,0.25)",
    fontWeight: 700,
    cursor: "pointer",
    transition: TRANSITION,
    backdropFilter: "blur(2px)",
  };
  if (state === "hover") return { ...base, background: "rgba(255,255,255,0.12)" };
  if (state === "active") return { ...base, background: "rgba(255,255,255,0.10)" };
  return base;
}

const styles = {
  hero: {
    position: "relative",
    width: "100%",
    minHeight: "74vh",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(80% 60% at 50% 20%, rgba(67,97,238,0.12) 0%, rgba(255,193,7,0.08) 35%, rgba(0,0,0,0) 70%)",
    pointerEvents: "none",
  },
  image: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.03)", // base scale; parallax adds translateY
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: 880,
    padding: "48px 16px",
    textAlign: "center",
    color: "#fff",
    display: "grid",
    gap: 16,
  },
  h1: {
    margin: 0,
    fontSize: "clamp(30px, 6vw, 56px)",
    fontWeight: 900,
    lineHeight: 1.1,
  },
  h1AccentAnimated: {
    display: "inline-block",
  },
  subtitle: {
    margin: "8px auto 0",
    maxWidth: 720,
    color: COLORS.textLight,
    fontSize: "clamp(15px, 2.4vw, 18px)",
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },
};

export default Hero;
