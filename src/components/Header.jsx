import React from "react";
import icon from "../../src/assets/image/icon.png";

// Small, reusable media query hook using matchMedia
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    // Set initial
    setMatches(mql.matches);

    const handler = (e) => setMatches(e.matches);
    // Modern API
    mql.addEventListener?.("change", handler);
    // Fallback for older browsers
    mql.addListener?.(handler);

    return () => {
      mql.removeEventListener?.("change", handler);
      mql.removeListener?.(handler);
    };
  }, [query]);

  return matches;
}

const COLORS = {
  blue: "#4361EE",
  yellow: "#FFC107",
};

const TRANSITION = "180ms ease";

function Header({ isAdmin, onLogout, onLoginToggle, onInstall, isInstalling = false }) {
  // Breakpoints
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

  // Local hover state for inline hover effects
  const [hoverGhost, setHoverGhost] = React.useState(false);
  const [hoverCTA, setHoverCTA] = React.useState(false);

  // Responsive computed styles derived from base styles
  const responsiveStyles = {
    headerWrapper: {
      ...styles.headerWrapper,
    },
    stickyHeader: {
      ...styles.stickyHeader,
      padding: isMobile ? "0.6rem 0.75rem" : isTablet ? "0.8rem 0.9rem" : "1rem 1rem",
    },
    brand: {
      ...styles.brand,
      gap: isMobile ? "0.4rem" : "0.5rem",
    },
    brandIcon: {
      ...styles.brandIcon,
      width: isMobile ? 24 : 50,
      height: isMobile ? 24 : 50,
      borderRadius: 6,
    },
    brandName: {
      ...styles.brandName,
      fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.05rem",
      display: isMobile ? "none" : "inline",
    },
    headerActions: {
      ...styles.headerActions,
      gap: isMobile ? "0.5rem" : isTablet ? "0.65rem" : "0.75rem",
    },
    ghostButton: {
      ...styles.ghostButton,
      padding: isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      // Hover styles
      background: hoverGhost ? "rgba(15,23,42,0.04)" : "transparent",
      borderColor: hoverGhost ? "rgba(15,23,42,0.22)" : "rgba(15,23,42,0.12)",
      transform: hoverGhost ? "translateY(-1px)" : "none",
    },
    ctaButton: {
      ...styles.ctaButton,
      padding: isMobile ? "0.5rem 0.9rem" : isTablet ? "0.55rem 1rem" : "0.6rem 1.2rem",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      // Hover styles
      boxShadow: hoverCTA
        ? "0 10px 22px rgba(67,97,238,0.45)"
        : isMobile
        ? "0 4px 12px rgba(67,97,238,0.30)"
        : "0 6px 16px rgba(67,97,238,0.35)",
      transform: hoverCTA ? "translateY(-1px)" : "none",
      opacity: isInstalling ? 0.8 : 1,
    },
  };

  return (
    <header style={responsiveStyles.headerWrapper}>
      <div style={responsiveStyles.stickyHeader}>
        <div style={responsiveStyles.brand}>
          <img src={icon} alt="HakbangQuest" style={responsiveStyles.brandIcon} loading="lazy" />
          <span style={responsiveStyles.brandName}>HakbangQuest</span>
        </div>

        <div style={responsiveStyles.headerActions}>
          {!isAdmin ? (
            <button
              style={responsiveStyles.ghostButton}
              onClick={onLoginToggle}
              onMouseEnter={() => setHoverGhost(true)}
              onMouseLeave={() => setHoverGhost(false)}
            >
              Admin Login
            </button>
          ) : (
            <button
              style={responsiveStyles.ghostButton}
              onClick={onLogout}
              onMouseEnter={() => setHoverGhost(true)}
              onMouseLeave={() => setHoverGhost(false)}
            >
              Logout
            </button>
          )}
          <button
            style={responsiveStyles.ctaButton}
            onClick={onInstall}
            disabled={isInstalling}
            aria-busy={isInstalling}
            onMouseEnter={() => setHoverCTA(true)}
            onMouseLeave={() => setHoverCTA(false)}
          >
            {isInstalling ? "Downloading…" : "Install Android App"}
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  headerWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  stickyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1rem",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(15,23,42,0.08)",
  },
  brand: { display: "flex", alignItems: "center", gap: "0.5rem" },
  brandIcon: { width: 28, height: 28, borderRadius: 6 },
  brandName: { fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", letterSpacing: 0.2 },

  headerActions: { display: "flex", gap: "0.75rem", alignItems: "center" },
  ghostButton: {
    padding: "0.5rem 1rem",
    borderRadius: 10,
    border: "1px solid rgba(15,23,42,0.12)",
    background: "transparent",
    color: "#0F172A",
    cursor: "pointer",
    transition: `transform ${TRANSITION}, box-shadow ${TRANSITION}, background ${TRANSITION}, border-color ${TRANSITION}`,
    fontSize: "0.9rem",
  },
  ctaButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: 12,
    background: COLORS.blue,
    color: "white",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    transition: `transform ${TRANSITION}, box-shadow ${TRANSITION}, opacity ${TRANSITION}`,
    boxShadow: "0 6px 16px rgba(67,97,238,0.35)",
    fontSize: "0.95rem",
  },
};

export default Header;
