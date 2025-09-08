import React, { useState } from "react";
import backgroundImage from "../../src/assets/image/jogging.jpg";

const COLORS = {
    blue: "#4361EE",
    blueHover: "#3a55d6",
    blueActive: "#3249b9",
    yellow: "#FFC107",
    textLight: "#E5E7EB",
    white: "#FFFFFF",
};

const TRANSITION = "180ms ease";

function Hero({ onGetApp, onShareSuggestion }) {
    // Local hover/active states for inline-style hover effects
    const [primaryState, setPrimaryState] = useState("idle"); // idle | hover | active
    const [linkState, setLinkState] = useState("idle");       // idle | hover | active

    const primaryStyles = getPrimaryBtnStyles(primaryState);
    const linkStyles = getLinkBtnStyles(linkState);

    return (
        <section style={styles.hero} aria-label="HakbangQuest introduction">
            <div style={styles.bg} />
            <div style={styles.content}>
                <h1 style={styles.h1}>
                    Track distance, build strength, <span style={styles.h1Accent}>level up your journey.</span>
                </h1>
                <p style={styles.subtitle}>
                    More than steps: track your distance, your strength, and every milestone along the way.
                </p>
                <div style={styles.actions}>
                    <button
                        style={primaryStyles}
                        onClick={onGetApp}
                        onMouseEnter={() => setPrimaryState("hover")}
                        onMouseLeave={() => setPrimaryState("idle")}
                        onMouseDown={() => setPrimaryState("active")}
                        onMouseUp={() => setPrimaryState("hover")}
                        onFocus={() => setPrimaryState("hover")}
                        onBlur={() => setPrimaryState("idle")}
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
                        onFocus={() => setLinkState("hover")}
                        onBlur={() => setLinkState("idle")}
                    >
                        Share a suggestion →
                    </button>
                </div>
            </div>

            {/* Background image layer */}
            <div
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
        transform: "translateY(0)",
        outline: "none",
    };

    if (state === "hover") {
        return {
            ...base,
            background: COLORS.blueHover,
            boxShadow: "0 10px 22px rgba(67,97,238,0.45)",
            transform: "translateY(-1px)",
        };
    }

    if (state === "active") {
        return {
            ...base,
            background: COLORS.blueActive,
            boxShadow: "0 4px 12px rgba(67,97,238,0.35)",
            transform: "translateY(0)",
        };
    }

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
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        transform: "translateY(0)",
        outline: "none",
        backdropFilter: "blur(2px)",
    };

    if (state === "hover") {
        return {
            ...base,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 8px 18px rgba(15,23,42,0.25)",
            transform: "translateY(-1px)",
        };
    }

    if (state === "active") {
        return {
            ...base,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 4px 10px rgba(15,23,42,0.2)",
            transform: "translateY(0)",
        };
    }

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
    // subtle radial brand highlight
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
        transform: "scale(1.02)",
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
        letterSpacing: -0.3,
        lineHeight: 1.1,
    },
    h1Accent: { color: COLORS.yellow },
    subtitle: {
        margin: "8px auto 0",
        maxWidth: 720,
        color: COLORS.textLight,
        lineHeight: 1.6,
        fontSize: "clamp(15px, 2.4vw, 18px)",
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
