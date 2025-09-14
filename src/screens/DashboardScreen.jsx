import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import SuggestionScreen from "./SuggestionScreen";
import Header from "../components/Header";
import Hero from "../components/Hero";

// Local images
import Build from "../assets/image/build.webp";
import Goals from "../assets/image/goals.webp";
import Community from "../assets/image/community.webp";

const auth = getAuth();

// Small media query hook
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
    mql.addListener?.(handler); // legacy
    return () => {
      mql.removeEventListener?.("change", handler);
      mql.removeListener?.(handler);
    };
  }, [query]);
  return matches;
}

const COLORS = { blue: "#4361EE", yellow: "#FFC107", ink: "#0F172A", text: "#1F2937", subtext: "#6B7280", bg: "#F8FAFC", card: "#FFFFFF", divider: "rgba(15, 23, 42, 0.06)" };
const RADIUS = "16px";
const SHADOW = "0 8px 24px rgba(15, 23, 42, 0.08)";
const TRANSITION = "180ms ease";

function DashboardScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Breakpoints
  const isLaptop = useMediaQuery("(max-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

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
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (userCredential.user.email === "admin@hakbang.com") {
        setIsAdmin(true);
        setShowLogin(false);
        toast.success("✅ Logged in as Admin!", { position: isMobile ? "top-center" : "top-right" });
      } else {
        toast.error("❌ Not authorized!", { position: isMobile ? "top-center" : "top-right" });
      }
    } catch (err) {
      console.error("Login failed", err);
      toast.error("❌ Invalid credentials!", { position: isMobile ? "top-center" : "top-right" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      toast.info("👋 Logged out successfully.", { position: isMobile ? "top-center" : "top-right" });
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("❌ Logout failed.", { position: isMobile ? "top-center" : "top-right" });
    }
  };

  const handleDownloadAPK = () => {
    setIsDownloading(true);
<<<<<<< HEAD
    const apkUrl = "https://github.com/joviedichoso/HakbangQuestWeb/releases/download/v1.0.0/HakbangQuest.apk";
=======
    const apkUrl =
      "https://github.com/joviedichoso/HakbangQuest02/releases/download/v1.0.1/HakbangQuest.apk";
>>>>>>> updateWeb
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
      toast.error("Please enter a name!", { position: isMobile ? "top-center" : "top-right" });
      return;
    }
    if (!suggestion.trim()) {
      toast.error("Please write a suggestion!", { position: isMobile ? "top-center" : "top-right" });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "suggestions"), {
        name: userName,
        text: suggestion,
        createdAt: serverTimestamp(),
        user: { email: "guest", role: "user" },
      });
      setUserName("");
      setSuggestion("");
      toast.success("✅ Thanks for your suggestion!", { position: isMobile ? "top-center" : "top-right" });
    } catch (err) {
      console.error("Error adding suggestion:", err);
      toast.error("❌ Failed to send suggestion.", { position: isMobile ? "top-center" : "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
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
      padding: isMobile ? "16px 12px 48px" : isTablet ? "20px 14px 56px" : "24px 16px 64px",
    },
    cardsSection: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(1, minmax(0, 1fr))"
        : isTablet
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? 12 : 16,
    },
    // Image card: background image with bottom-aligned content on a dark gradient
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
      // subtle zoom for crisp look
      transform: "translateZ(0)",
    },
    // Gradient layer to ensure readability across images
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
    suggestSection: { marginTop: isTablet ? 28 : 32, display: "grid", gap: isMobile ? 12 : 16 },
    suggestHeader: { display: "flex", flexDirection: "column", gap: 6 },
    h2: { margin: 0, fontSize: isMobile ? 20 : 22, fontWeight: 900, color: COLORS.ink },
    suggestSub: { margin: 0, color: COLORS.subtext, fontSize: isMobile ? 13.5 : 14 },
    formCard: {
      background: COLORS.card,
      borderRadius: RADIUS,
      boxShadow: SHADOW,
      padding: isMobile ? 12 : 16,
      display: "grid",
      gap: isMobile ? 10 : 12,
    },
    formRow: { display: "grid", gridTemplateColumns: "1fr", gap: isMobile ? 10 : 12 },
    inputGroup: { display: "grid", gap: isMobile ? 6 : 8 },
    label: { fontWeight: 700, color: COLORS.ink, fontSize: isMobile ? 13.5 : 14 },
    input: {
      background: "#fff",
      border: `1px solid ${COLORS.divider}`,
      borderRadius: 12,
      padding: isMobile ? "10px 11px" : "12px 12px",
      outline: "none",
      transition: "180ms ease",
      fontSize: isMobile ? 13.5 : 14,
    },
    textarea: { minHeight: isMobile ? 100 : 120, resize: "vertical" },
    formActions: { display: "flex", justifyContent: "flex-end" },
    adminSection: { marginTop: isTablet ? 32 : 40, display: "grid", gap: isMobile ? 10 : 12 },
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
    modalTitle: { margin: 0, fontWeight: 900, color: "#0F172A", fontSize: isMobile ? 16 : 18 },
    modalClose: {
      border: "none",
      background: "transparent",
      fontSize: isMobile ? 22 : 24,
      lineHeight: 1,
      cursor: "pointer",
      color: "#6B7280",
    },
    modalBody: { display: "grid", gap: isMobile ? 10 : 12, padding: isMobile ? 12 : 16 },
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
        onLoginToggle={() => setShowLogin((s) => !s)}
        onInstall={handleDownloadAPK}
        isInstalling={isDownloading}
      />

      <Hero
        onGetApp={handleDownloadAPK}
        onShareSuggestion={() => {
          const el = document.getElementById("suggest");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <main style={styles.main}>
        {/* Feature cards */}
        <section style={styles.cardsSection}>
          {/* Build Strength */}
          <article
            style={{
              ...styles.card,
              backgroundImage: `url(${Build})`,
            }}
            aria-label="Build Strength"
          >
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Build Strength</h3>
              <p style={styles.cardText}>Push limits with structured sets, groups, and reps.</p>
              <p style={styles.cardText}>Track every rep and watch strength grow.</p>
            </div>
          </article>

          {/* Goals */}
          <article
            style={{
              ...styles.card,
              backgroundImage: `url(${Goals})`,
            }}
            aria-label="Goals"
          >
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Goals</h3>
              <p style={styles.cardText}>Set targets, keep streaks, and measure steady progress.</p>
            </div>
          </article>

          {/* Community */}
          <article
            style={{
              ...styles.card,
              backgroundImage: `url(${Community})`,
            }}
            aria-label="Community"
          >
            <div style={styles.cardOverlay} />
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Community</h3>
              <p style={styles.cardText}>Share milestones and stay motivated together.</p>
            </div>
          </article>
        </section>

        {/* Suggestion form */}
        <section id="suggest" style={styles.suggestSection}>
          <div style={styles.suggestHeader}>
            <h2 style={styles.h2}>Suggest a feature</h2>
            <p style={styles.suggestSub}>Keep it short and actionable—every idea helps improve HakbangQuest.</p>
          </div>

          <div style={styles.formCard}>
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={{ ...styles.inputGroup, width: "100%" }}>
                <label htmlFor="suggestion" style={styles.label}>Suggestion</label>
                <textarea
                  id="suggestion"
                  placeholder="Share your idea…"
                  rows={4}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  style={{ ...styles.input, ...styles.textarea }}
                />
              </div>
            </div>

            <div style={styles.formActions}>
              <button
                style={{ ...styles.primaryBtn }}
                onClick={handleSubmitSuggestion}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
        </section>

        {/* Admin table */}
        {isAdmin && (
          <section style={styles.adminSection}>
            <div style={styles.sectionHead}>
              <h2 style={styles.h2}>Suggestions</h2>
              <span style={styles.badge}>Admin</span>
            </div>
            <SuggestionScreen />
          </section>
        )}
      </main>

      {/* Admin Login Modal */}
      {showLogin && !isAdmin && (
        <div role="dialog" aria-modal="true" style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Admin login</h3>
              <button onClick={() => setShowLogin(false)} style={styles.modalClose}>×</button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ display: "grid", gap: 8 }}>
                <label htmlFor="email" style={{ fontWeight: 700, color: "#0F172A" }}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@hakbang.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{
                    background: "#fff",
                    border: `1px solid ${COLORS.divider}`,
                    borderRadius: 12,
                    padding: isMobile ? "10px 11px" : "12px 12px",
                    outline: "none",
                    fontSize: isMobile ? 13.5 : 14,
                  }}
                />
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                <label htmlFor="password" style={{ fontWeight: 700, color: "#0F172A" }}>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    background: "#fff",
                    border: `1px solid ${COLORS.divider}`,
                    borderRadius: 12,
                    padding: isMobile ? "10px 11px" : "12px 12px",
                    outline: "none",
                    fontSize: isMobile ? 13.5 : 14,
                  }}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowLogin(false)} style={styles.secondaryBtn}>Cancel</button>
              <button onClick={handleLogin} style={styles.primaryBtn}>Login</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position={isMobile ? "top-center" : "top-right"} />
    </div>
  );
}

export default DashboardScreen;
