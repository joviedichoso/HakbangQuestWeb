import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import SuggestionScreen from "./SuggestionScreen";
import Header from "../components/Header";
import Hero from "../components/Hero";

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const COLORS = {
  blue: "#4361EE",
  yellow: "#FFC107",
  ink: "#0F172A",
  text: "#1F2937",
  subtext: "#6B7280",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  divider: "rgba(15, 23, 42, 0.06)"
};

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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100
    });
  }, []);

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
    const apkUrl = "https://github.com/joviedichoso/HakbangQuestWeb/releases/download/v1.0.0/HakbangQuest.apk";
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
        user: {
          email: "guest",
          role: "user"
        },
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

  // Enhanced styles with hover effects and larger cards
  const styles = {
    app: {
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: "100dvh",
      lineHeight: 1.45,
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    },
    main: {
      maxWidth: isLaptop ? 1000 : 1120,
      margin: "0 auto",
      padding: isMobile ? "16px 12px 48px" : isTablet ? "20px 14px 56px" : "24px 16px 64px",
    },
    cardsSection: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(1, minmax(0, 1fr))" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? 16 : isTablet ? 20 : 24,
      marginBottom: isTablet ? 32 : 40,
    },
    // Enhanced card with hover effects and larger size
    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minHeight: isMobile ? 280 : isTablet ? 320 : 360, // Increased heights
      borderRadius: 20, // Slightly more rounded
      overflow: "hidden",
      boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)", // Enhanced shadow
      backgroundSize: "cover",
      backgroundPosition: "center",
      transform: "translateZ(0)",
      cursor: "pointer",
      transition: "all 200ms ease-in-out",
      // Hover effects
      ":hover": {
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: "0 20px 40px rgba(67, 97, 238, 0.25)",
      }
    },
    // Enhanced gradient for better text contrast
    cardOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)",
      pointerEvents: "none",
    },
    cardContent: {
      position: "relative",
      zIndex: 1,
      padding: isMobile ? 16 : isTablet ? 20 : 24, // Increased padding
      color: "#fff",
      display: "grid",
      gap: isMobile ? 8 : 10,
      textShadow: "0 2px 4px rgba(0,0,0,0.6)", // Enhanced text shadow
    },
    cardTitle: {
      margin: 0,
      fontSize: isMobile ? 18 : isTablet ? 20 : 22, // Larger font sizes
      fontWeight: 800,
      letterSpacing: 0.2,
    },
    cardText: {
      margin: 0,
      fontSize: isMobile ? 14 : 15, // Slightly larger text
      opacity: 0.95,
      lineHeight: 1.5,
    },
    // Future-proofing: Button styles for cards
    cardButton: {
      marginTop: 12,
      padding: "10px 16px",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      color: "#fff",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 200ms ease-in-out",
      alignSelf: "flex-start",
      ":hover": {
        background: "rgba(255, 255, 255, 0.3)",
        transform: "scale(1.05)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }
    },
    suggestSection: {
      marginTop: isTablet ? 28 : 32,
      display: "grid",
      gap: isMobile ? 12 : 16
    },
    suggestHeader: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    },
    h2: {
      margin: 0,
      fontSize: isMobile ? 20 : 22,
      fontWeight: 900,
      color: COLORS.ink
    },
    suggestSub: {
      margin: 0,
      color: COLORS.subtext,
      fontSize: isMobile ? 13.5 : 14
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
      gap: isMobile ? 10 : 12
    },
    inputGroup: {
      display: "grid",
      gap: isMobile ? 6 : 8
    },
    label: {
      fontWeight: 700,
      color: COLORS.ink,
      fontSize: isMobile ? 13.5 : 14
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
      resize: "vertical"
    },
    formActions: {
      display: "flex",
      justifyContent: "flex-end"
    },
    adminSection: {
      marginTop: isTablet ? 32 : 40,
      display: "grid",
      gap: isMobile ? 10 : 12
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
      fontSize: isMobile ? 16 : 18
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
      padding: isMobile ? 12 : 16
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

  // Custom CSS for hover effects (since inline styles don't support :hover)
  const cardHoverStyles = `
    .feature-card {
      transition: all 200ms ease-in-out !important;
    }
    .feature-card:hover {
      transform: translateY(-8px) scale(1.02) !important;
      box-shadow: 0 20px 40px rgba(67, 97, 238, 0.25) !important;
    }
    .card-button {
      transition: all 200ms ease-in-out !important;
    }
    .card-button:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      transform: scale(1.05) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    }
  `;

  const features = [
    {
      image: Build,
      title: "Build Strength",
      description: "Transform your fitness journey with personalized workouts and progress tracking.",
    },
    {
      image: Goals,
      title: "Set Goals",
      description: "Define your objectives and watch as you achieve them step by step.",
    },
    {
      image: Community,
      title: "Join Community",
      description: "Connect with like-minded individuals and share your fitness achievements.",
    },
  ];

  return (
    <div style={styles.app}>
      <style dangerouslySetInnerHTML={{ __html: cardHoverStyles }} />
      <Header />
      <Hero />
      
      <main style={styles.main}>
        {/* Enhanced Feature Cards with AOS animations */}
        <section style={styles.cardsSection}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                ...styles.card,
                backgroundImage: `url(${feature.image})`,
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
            >
              <div style={styles.cardOverlay}></div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{feature.title}</h3>
                <p style={styles.cardText}>{feature.description}</p>
                {/* Future-proofing: Uncomment to add buttons */}
                {/* 
                <button className="card-button" style={styles.cardButton}>
                  Learn More
                </button>
                */}
              </div>
            </div>
          ))}
        </section>

        {/* Suggestion Section with AOS animation */}
        <section style={styles.suggestSection} data-aos="fade-up" data-aos-delay="200">
          <div style={styles.suggestHeader}>
            <h2 style={styles.h2}>Share Your Suggestions</h2>
            <p style={styles.suggestSub}>Help us improve HakbangQuest with your feedback</p>
          </div>
          
          <div style={styles.formCard}>
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your name"
                />
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Suggestion</label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                style={{...styles.input, ...styles.textarea}}
                placeholder="Share your ideas or feedback..."
              />
            </div>
            
            <div style={styles.formActions}>
              <button
                onClick={handleSubmitSuggestion}
                disabled={isSubmitting}
                style={styles.primaryBtn}
              >
                {isSubmitting ? "Sending..." : "Submit Suggestion"}
              </button>
            </div>
          </div>
        </section>

        {/* Admin Section */}
        {isAdmin && (
          <section style={styles.adminSection} data-aos="fade-up" data-aos-delay="300">
            <div style={styles.sectionHead}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={styles.h2}>Admin Panel</h2>
                <span style={styles.badge}>Admin</span>
              </div>
              <button onClick={handleLogout} style={styles.secondaryBtn}>
                Logout
              </button>
            </div>
            <SuggestionScreen />
          </section>
        )}

        {/* Login Modal */}
        {showLogin && (
          <div style={styles.modalOverlay} onClick={() => setShowLogin(false)}>
            <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>Admin Login</h3>
                <button
                  style={styles.modalClose}
                  onClick={() => setShowLogin(false)}
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
                    style={styles.input}
                    placeholder="admin@hakbang.com"
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={styles.input}
                    placeholder="Enter password"
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
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <ToastContainer />
    </div>
  );
}

export default DashboardScreen;
