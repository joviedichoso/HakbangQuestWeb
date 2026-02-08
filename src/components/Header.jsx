import React, { useState, useEffect } from "react";
import icon from "../../src/assets/image/icon.png";

// Reusable media query hook
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    // Modern vs Legacy listener support
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      mql.addListener(handler);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

const COLORS = {
  blue: "#4361EE",
  blueHover: "#3a55d6",
  yellow: "#FFC107",
  text: "#0F172A",
  border: "rgba(15, 23, 42, 0.08)",
};

function Header({
  isAdmin,
  onLogout,
  onLoginToggle,
  onInstall,
  isInstalling = false,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 480px)");

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        ...styles.header,
        background: isScrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: isScrolled
          ? `1px solid ${COLORS.border}`
          : "1px solid transparent",
        padding: isScrolled ? "12px 24px" : "20px 24px",
        boxShadow: isScrolled
          ? "0 4px 20px -2px rgba(0, 0, 0, 0.05)"
          : "none",
      }}
    >
      <div style={styles.container}>
        {/* Brand Section */}
        <div style={styles.brand}>
          <img src={icon} alt="Logo" style={styles.logo} />
          <div style={styles.brandText}>
            <span style={{ color: COLORS.blue }}>Hakbang</span>
            <span style={{ color: COLORS.yellow }}>Quest</span>
          </div>
        </div>

        {/* Actions Section */}
        <div style={styles.actions}>
          {/* Admin / Logout Button */}
          <NavButton
            onClick={isAdmin ? onLogout : onLoginToggle}
            label={isAdmin ? "Log Out" : "Admin"}
            variant="ghost"
          />

          {/* Install App Button (CTA) */}
          <NavButton
            onClick={onInstall}
            label={isInstalling ? "Installing..." : "Install App"}
            variant="primary"
            disabled={isInstalling}
          />
        </div>
      </div>
    </header>
  );
}

// Sub-component for Buttons to keep JSX clean
const NavButton = ({ onClick, label, variant, disabled, icon }) => {
  const [hover, setHover] = useState(false);

  const baseStyle = {
    ...styles.buttonBase,
    ...(variant === "primary" ? styles.primaryBtn : styles.ghostBtn),
    opacity: disabled ? 0.7 : 1,
    cursor: disabled ? "wait" : "pointer",
    transform: hover && !disabled ? "translateY(-1px)" : "none",
    boxShadow:
      hover && variant === "primary" && !disabled
        ? "0 6px 12px rgba(67, 97, 238, 0.3)"
        : "none",
    background:
      variant === "ghost" && hover
        ? "rgba(15, 23, 42, 0.05)"
        : variant === "primary" && hover
          ? COLORS.blueHover
          : variant === "primary"
            ? COLORS.blue
            : "transparent",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}
    >
      {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
      {label}
    </button>
  );
};

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    width: "100%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box", // Essential for padding transitions
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "default",
  },
  logo: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  brandText: {
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "-0.5px",
    userSelect: "none",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  buttonBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    border: "none",
    borderRadius: "12px",
    padding: "10px 16px",
    transition: "all 0.2s ease",
  },
  primaryBtn: {
    color: "#FFFFFF",
    background: COLORS.blue,
  },
  ghostBtn: {
    color: COLORS.text,
    background: "transparent",
  },
};

export default Header;