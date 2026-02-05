import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMail, IoGlobe, IoPhonePortrait } from "react-icons/io5";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import SuggestionScreen from "./SuggestionScreen";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";

// Local images
import Build from "../assets/image/build.webp";
import Goals from "../assets/image/goals.webp";
import Community from "../assets/image/community.webp";

const auth = getAuth();

// Enhanced media query hook
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener?.("change", handler);
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
  ink: "#0F172A",
  text: "#1F2937",
  subtext: "#6B7280",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  divider: "rgba(15, 23, 42, 0.06)",
};

const RADIUS = "16px";
const SHADOW = "0 8px 24px rgba(15, 23, 42, 0.08)";
const TRANSITION = "180ms ease";

// Footer Component
function Footer() {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const footerStyles = {
    footer: {
      background: COLORS.card,
      borderTop: `1px solid ${COLORS.divider}`,
      marginTop: isTablet ? 48 : 64,
      padding: isMobile ? "32px 16px 24px" : "48px 24px 32px",
    },
    container: {
      maxWidth: 1120,
      margin: "0 auto",
    },
    content: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "1fr 1fr"
        : "2fr 1fr 1fr",
      gap: isMobile ? 32 : isTablet ? 40 : 48,
      marginBottom: isMobile ? 24 : 32,
    },
    brand: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    logo: {
      fontSize: isMobile ? 22 : 26,
      fontWeight: 900,
      color: COLORS.blue,
      margin: 0,
      marginBottom: 4,
    },
    tagline: {
      color: COLORS.subtext,
      fontSize: isMobile ? 14 : 15,
      margin: 0,
      lineHeight: 1.6,
      maxWidth: 280,
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 12 : 16,
    },
    sectionTitle: {
      fontSize: isMobile ? 15 : 16,
      fontWeight: 700,
      color: COLORS.ink,
      margin: 0,
      marginBottom: 4,
    },
    linkList: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    link: {
      color: COLORS.subtext,
      fontSize: isMobile ? 14 : 15,
      textDecoration: "none",
      transition: TRANSITION,
      cursor: "pointer",
      padding: "2px 0",
    },
    linkHover: {
      color: COLORS.blue,
    },
    divider: {
      height: 1,
      background: COLORS.divider,
      border: "none",
      margin: 0,
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 16 : 12,
      paddingTop: isMobile ? 24 : 28,
    },
    copyright: {
      color: COLORS.subtext,
      fontSize: isMobile ? 13 : 14,
      margin: 0,
    },
    social: {
      display: "flex",
      gap: "1rem",
    },
    socialLink: {
      color: "#0F172A", // default dark color
      fontSize: "20px",
      transition: "color 0.3s ease, transform 0.2s ease",
      textDecoration: "none",
      cursor: "pointer", // 👈 makes it clear it's clickable
    },
    socialLinkHover: {
      color: "#4361EE", // hover blue
    },
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.content}>
          <div style={footerStyles.brand}>
            <h3 style={footerStyles.logo}>
              Hakbang<span style={{ color: "#FFC107" }}>Quest</span>
            </h3>
            <p style={footerStyles.tagline}>
              Transform your fitness journey into an exciting adventure with
              gamified tracking, achievements, and community challenges.
            </p>
          </div>

          <div style={footerStyles.section}>
            <h4 style={footerStyles.sectionTitle}>Features</h4>
            <ul style={footerStyles.linkList}>
              <li>
                <a
                  href="#features"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Goal Tracking
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Activity Monitor
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Community Challenges
                </a>
              </li>
            </ul>
          </div>

          <div style={footerStyles.section}>
            <h4 style={footerStyles.sectionTitle}>Support</h4>
            <ul style={footerStyles.linkList}>
              <li>
                <a
                  href="#help"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  style={footerStyles.link}
                  onMouseEnter={(e) =>
                    Object.assign(e.target.style, footerStyles.linkHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.target.style, footerStyles.link)
                  }
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr style={footerStyles.divider} />

        <div style={footerStyles.bottom}>
          <p style={footerStyles.copyright}>
            © 2025 HakbangQuest. All rights reserved.
          </p>
          <div style={footerStyles.social}>
            <a
              href="mailto:support@hakbangquest.com"
              style={footerStyles.socialLink}
              title="Email Support"
            >
              <IoMail size={20} />
            </a>

            <a href="#" style={footerStyles.socialLink} title="Website">
              <IoGlobe size={20} />
            </a>

            <a href="#" style={footerStyles.socialLink} title="Mobile App">
              <IoPhonePortrait size={20} />
            </a>

            <style>
              {`
          a:hover {
            color: ${footerStyles.socialLinkHover.color};
          }
        `}
            </style>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DashboardScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Breakpoints
  const isLaptop = useMediaQuery("(max-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adminLoggedIn");
      setIsAdmin(stored === "true");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("adminLoggedIn", isAdmin ? "true" : "false");
    } catch {}
  }, [isAdmin]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "admin@hakbang.com") setIsAdmin(true);
      else setIsAdmin(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (userCredential.user.email === "admin@hakbang.com") {
        setIsAdmin(true);
        setShowLogin(false);
        toast.success("✅ Logged in as Admin!", {
          position: isMobile ? "top-center" : "top-right",
        });
      } else {
        toast.error("❌ Not authorized!", {
          position: isMobile ? "top-center" : "top-right",
        });
      }
    } catch (err) {
      console.error("Login failed", err);
      toast.error("❌ Invalid credentials!", {
        position: isMobile ? "top-center" : "top-right",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      toast.info("👋 Logged out successfully.", {
        position: isMobile ? "top-center" : "top-right",
      });
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("❌ Logout failed.", {
        position: isMobile ? "top-center" : "top-right",
      });
    }
  };

  const handleDownloadAPK = () => {
    setIsDownloading(true);
    const apkUrl =
      "https://github.com/joviedichoso/HakbangQuestWeb/releases/download/v1.1/HakbangQuest.apk";
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = "HakbangQuest.apk";
    link.click();

    setTimeout(() => {
      setIsDownloading(false);
      toast.success("APK downloaded! Tap to open.", {
        position: isMobile ? "top-center" : "top-right",
        autoClose: 4000,
        onClick: () => window.open(apkUrl, "_blank"),
        className: "game-toast",
        bodyClassName: "game-toast-body",
        icon: "🎮",
      });
    }, 2000);
  };

  const handleSubmitSuggestion = async () => {
    if (!userName.trim()) {
      toast.error("Please enter a name!", {
        position: isMobile ? "top-center" : "top-right",
      });
      return;
    }
    if (!suggestion.trim()) {
      toast.error("Please write a suggestion!", {
        position: isMobile ? "top-center" : "top-right",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "suggestions"), {
        name: userName,
        text: suggestion,
        createdAt: serverTimestamp(),
        user: {
          email: "guest",
          role: "user",
        },
      });
      setUserName("");
      setSuggestion("");
      toast.success("Thanks for your suggestion!", {
        position: isMobile ? "top-center" : "top-right",
      });
    } catch (err) {
      console.error("Error adding suggestion:", err);
      toast.error("Failed to send suggestion.", {
        position: isMobile ? "top-center" : "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles without parallax effects
  const styles = {
    app: {
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: "100dvh",
      lineHeight: 1.45,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    },
    main: {
      maxWidth: isLaptop ? 1000 : 1120,
      margin: "0 auto",
      padding: isMobile
        ? "16px 12px 0"
        : isTablet
        ? "20px 14px 0"
        : "24px 16px 0",
    },
    cardsSection: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(1, minmax(0, 1fr))"
        : isTablet
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? 12 : 16,
      marginBottom: isMobile ? 32 : 48,
    },
    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minHeight: 220,
      borderRadius: RADIUS,
      overflow: "hidden",
      boxShadow: SHADOW,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    cardOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.65) 100%)",
      pointerEvents: "none",
    },
    cardContent: {
      position: "relative",
      zIndex: 1,
      padding: isMobile ? 12 : 16,
      color: "#fff",
      display: "grid",
      gap: isMobile ? 6 : 8,
      textShadow: "0 1px 2px rgba(0,0,0,0.35)",
    },
    cardTitle: {
      margin: 0,
      fontSize: isMobile ? 16 : 18,
      fontWeight: 800,
      letterSpacing: 0.2,
    },
    cardText: {
      margin: 0,
      fontSize: isMobile ? 13.5 : 14,
      opacity: 0.95,
    },
    suggestSection: {
      marginBottom: isMobile ? 40 : 56,
      marginTop: isTablet ? 28 : 32,
      display: "grid",
      gap: isMobile ? 12 : 16,
      background: COLORS.card,
      borderRadius: RADIUS,
      padding: isMobile ? 16 : 24,
      boxShadow: SHADOW,
    },
    suggestHeader: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
    },
    h2: {
      margin: 0,
      fontSize: isMobile ? 20 : 22,
      fontWeight: 900,
      color: COLORS.ink,
    },
    suggestSub: {
      margin: 0,
      color: COLORS.subtext,
      fontSize: isMobile ? 13.5 : 14,
    },
    suggestPrompt: {
      background:
        "linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(255, 193, 7, 0.05))",
      border: `1px solid ${COLORS.divider}`,
      borderRadius: 12,
      padding: isMobile ? 12 : 16,
      marginBottom: isMobile ? 8 : 12,
    },
    promptTitle: {
      margin: 0,
      fontSize: isMobile ? 14 : 15,
      fontWeight: 700,
      color: COLORS.ink,
      marginBottom: 6,
    },
    promptText: {
      margin: 0,
      fontSize: isMobile ? 13 : 14,
      color: COLORS.subtext,
      lineHeight: 1.5,
    },
    promptHighlight: {
      color: COLORS.blue,
      fontWeight: 600,
    },
    formCard: {
      background: COLORS.card,
      borderRadius: RADIUS,
      boxShadow: SHADOW,
      padding: isMobile ? 12 : 16,
      display: "grid",
      gap: isMobile ? 10 : 12,
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: isMobile ? 10 : 12,
    },
    inputGroup: {
      display: "grid",
      gap: isMobile ? 6 : 8,
    },
    label: {
      fontWeight: 700,
      color: COLORS.ink,
      fontSize: isMobile ? 13.5 : 14,
    },
    input: {
      background: "#fff",
      border: `1px solid ${COLORS.divider}`,
      borderRadius: 12,
      padding: isMobile ? "10px 11px" : "12px 12px",
      outline: "none",
      transition: "180ms ease",
      fontSize: isMobile ? 13.5 : 14,
    },
    textarea: {
      minHeight: isMobile ? 100 : 120,
      resize: "vertical",
    },
    formActions: {
      display: "flex",
      justifyContent: "flex-end",
    },
    adminSection: {
      marginBottom: isMobile ? 40 : 56,
      marginTop: isTablet ? 32 : 40,
      display: "grid",
      gap: isMobile ? 10 : 12,
    },
    sectionHead: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      gap: 8,
      flexDirection: isMobile ? "column" : "row",
    },
    badge: {
      background: COLORS.yellow,
      color: "#111827",
      borderRadius: 999,
      padding: isMobile ? "5px 9px" : "6px 10px",
      fontWeight: 800,
      fontSize: 12,
      alignSelf: isMobile ? "flex-start" : "center",
    },
    scrollTopBtn: {
      position: "fixed",
      bottom: isMobile ? 20 : 24,
      right: isMobile ? 20 : 24,
      width: isMobile ? 48 : 52,
      height: isMobile ? 48 : 52,
      borderRadius: "50%",
      background: COLORS.blue,
      color: "#fff",
      border: "none",
      boxShadow: "0 8px 24px rgba(67, 97, 238, 0.4)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? 18 : 20,
      transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      transform: showScrollTop
        ? "translateY(0) scale(1)"
        : "translateY(100px) scale(0.8)",
      opacity: showScrollTop ? 1 : 0,
      zIndex: 50,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,0.42)",
      backdropFilter: "blur(3px)",
      display: "grid",
      placeItems: "center",
      padding: isMobile ? 12 : 16,
      zIndex: 60,
    },
    modalCard: {
      width: "100%",
      maxWidth: isMobile ? 360 : 440,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
      overflow: "hidden",
    },
    modalHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? 12 : 16,
      borderBottom: `1px solid ${COLORS.divider}`,
    },
    modalTitle: {
      margin: 0,
      fontWeight: 900,
      color: "#0F172A",
      fontSize: isMobile ? 16 : 18,
    },
    modalClose: {
      border: "none",
      background: "transparent",
      fontSize: isMobile ? 22 : 24,
      lineHeight: 1,
      cursor: "pointer",
      color: "#6B7280",
    },
    modalBody: {
      display: "grid",
      gap: isMobile ? 10 : 12,
      padding: isMobile ? 12 : 16,
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      padding: isMobile ? 12 : 16,
      gap: 8,
      borderTop: `1px solid ${COLORS.divider}`,
    },
    primaryBtn: {
      padding: isMobile ? "10px 14px" : "12px 16px",
      borderRadius: 12,
      background: COLORS.blue,
      color: "#fff",
      fontWeight: 800,
      border: "none",
      boxShadow: "0 6px 16px rgba(67,97,238,0.35)",
      cursor: "pointer",
      transition: TRANSITION,
    },
    secondaryBtn: {
      padding: isMobile ? "8px 10px" : "10px 12px",
      borderRadius: 12,
      border: `1px solid ${COLORS.divider}`,
      background: "transparent",
      color: "#0F172A",
      fontWeight: 600,
      cursor: "pointer",
      transition: TRANSITION,
    },
  };

  return (
    <div style={styles.app}>
      <Header
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onLoginToggle={() => setShowLogin(true)}
        onInstall={handleDownloadAPK}
        isInstalling={isDownloading}
      />

      <Hero
        onGetApp={handleDownloadAPK}
        onShareSuggestion={() => {
          const el = document.getElementById("share-ideas");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main style={styles.main}>
        {/* Feature Cards Section */}
        <section style={styles.cardsSection}>
          <div
            style={{ ...styles.card, backgroundImage: `url(${Build})` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Build Your Journey</h3>
              <p style={styles.cardText}>
                Create personalized fitness plans and track your progress with
                intelligent insights.
              </p>
            </div>
          </div>

          <div
            style={{ ...styles.card, backgroundImage: `url(${Goals})` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Achieve Your Goals</h3>
              <p style={styles.cardText}>
                Set ambitious targets and celebrate every milestone on your
                fitness adventure.
              </p>
            </div>
          </div>

          <div
            style={{ ...styles.card, backgroundImage: `url(${Community})` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Join the Community</h3>
              <p style={styles.cardText}>
                Connect with like-minded individuals and compete in exciting
                challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Features Component */}
        <Features />

        {/* Download Section */}
        <section id="share-ideas" style={styles.suggestSection}>
          <div style={styles.suggestHeader}>
            <h2 style={styles.h2}>Download HakbangQuest</h2>
            <p style={styles.suggestSub}>
              Ready to start your fitness adventure? Download the app now!
            </p>
          </div>

          <div style={styles.suggestPrompt}>
            <h4 style={styles.promptTitle}>🎮 Get the Mobile App</h4>
            <p style={styles.promptText}>
              Experience the full{" "}
              <span style={styles.promptHighlight}>HakbangQuest</span> adventure
              on your mobile device with real-time tracking, achievements, and
              social features.
            </p>
          </div>

          <div style={styles.formActions}>
            <button
              onClick={handleDownloadAPK}
              disabled={isDownloading}
              style={{
                ...styles.primaryBtn,
                opacity: isDownloading ? 0.7 : 1,
                cursor: isDownloading ? "not-allowed" : "pointer",
              }}
            >
              {isDownloading ? "Downloading..." : "Download APK"}
            </button>
          </div>
        </section>

        {/* Suggestions Section */}
        <section style={styles.suggestSection}>
          <div style={styles.suggestHeader}>
            <h2 style={styles.h2}>Share Your Ideas</h2>
            <p style={styles.suggestSub}>
              Help us improve HakbangQuest with your suggestions and feedback
            </p>
          </div>

          <div style={styles.suggestPrompt}>
            <h4 style={styles.promptTitle}>💡 We Value Your Input</h4>
            <p style={styles.promptText}>
              Your feedback helps us create a better{" "}
              <span style={styles.promptHighlight}>fitness experience</span>.
              Share your ideas for new features, improvements, or report any
              issues you've encountered.
            </p>
          </div>

          <div style={styles.formCard}>
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Your Suggestion</label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Share your ideas, feedback, or report issues..."
                style={{ ...styles.input, ...styles.textarea }}
              />
            </div>

            <div style={styles.formActions}>
              <button
                onClick={handleSubmitSuggestion}
                disabled={isSubmitting}
                style={{
                  ...styles.primaryBtn,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "Sending..." : "Send Suggestion"}
              </button>
            </div>
          </div>
        </section>

        {/* Admin Section - Only show if admin is logged in */}
        {isAdmin && (
          <section style={styles.adminSection}>
            <div style={styles.sectionHead}>
              <div>
                <h2 style={styles.h2}>Admin Panel</h2>
                <span style={styles.badge}>ADMIN</span>
              </div>
            </div>
            <SuggestionScreen />
          </section>
        )}
      </main>

      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button onClick={scrollToTop} style={styles.scrollTopBtn}>
          ↑
        </button>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div style={styles.modalOverlay} onClick={() => setShowLogin(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Admin Login</h3>
              <button
                onClick={() => setShowLogin(false)}
                style={styles.modalClose}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@hakbang.com"
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                onClick={() => setShowLogin(false)}
                style={styles.secondaryBtn}
              >
                Cancel
              </button>
              <button onClick={handleLogin} style={styles.primaryBtn}>
                🔓 Login
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default DashboardScreen;
