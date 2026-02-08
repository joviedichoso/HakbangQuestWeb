import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  IoMail, 
  IoGlobe, 
  IoPhonePortrait, 
  IoArrowUp, 
  IoBulb, 
  IoLogoAndroid 
} from "react-icons/io5";
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

// --- IMPORT YOUR TEAM IMAGE HERE ---
// Make sure this file exists in src/assets/image/
import TeamPhoto from "../assets/image/team.jpg";

const auth = getAuth();

// --- Footer Component ---
function Footer() {
  const footerLinks = [
    { section: "Features", links: ["Goal Tracking", "Activity Monitor", "Achievements", "Community Challenges"] },
    { section: "Support", links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"] }
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 mt-16 py-12 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-4">
              Hakbang<span className="text-yellow-500">Quest</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs text-sm">
              Transform your fitness journey into an exciting adventure with
              gamified tracking, achievements, and community challenges.
            </p>
          </div>

          {/* Links Loops */}
          {footerLinks.map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">{col.section}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#features" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © 2025 HakbangQuest. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[IoMail, IoGlobe, IoPhonePortrait].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all transform hover:scale-110">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Dashboard Screen ---
function DashboardScreen({ theme, toggleTheme }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Admin / Auth Logic
  useEffect(() => {
    const stored = localStorage.getItem("adminLoggedIn");
    if (stored === "true") setIsAdmin(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "admin@hakbang.com") setIsAdmin(true);
      else setIsAdmin(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("adminLoggedIn", isAdmin ? "true" : "false");
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (userCredential.user.email === "admin@hakbang.com") {
        setIsAdmin(true);
        setShowLogin(false);
        toast.success("Logged in as Admin!");
      } else {
        toast.error("Not authorized!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials!");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdmin(false);
    toast.info("Logged out successfully.");
  };

  const handleDownloadAPK = () => {
    setIsDownloading(true);
    const apkUrl = "https://github.com/joviedichoso/HakbangQuestWeb/releases/download/V1.4/HakbangQuest.apk";
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = "HakbangQuest.apk";
    link.click();

    setTimeout(() => {
      setIsDownloading(false);
      toast.success("APK downloaded! Tap to open.", { autoClose: 4000 });
    }, 2000);
  };

  const handleSubmitSuggestion = async () => {
    if (!userName.trim() || !suggestion.trim()) {
      toast.error("Please fill in all fields!");
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
      toast.success("Thanks for your suggestion!");
    } catch (err) {
      toast.error("Failed to send suggestion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onLoginToggle={() => setShowLogin(true)}
        onInstall={handleDownloadAPK}
        isInstalling={isDownloading}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Note: ID 'share-ideas' is now on the Suggestions section so this button scrolls there */}
      <Hero
        onGetApp={handleDownloadAPK}
        onShareSuggestion={() => document.getElementById("share-ideas")?.scrollIntoView({ behavior: "smooth" })}
      />

      <main className="container mx-auto max-w-7xl px-4 md:px-6 -mt-20 relative z-30">

        {/* Features Component */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl dark:shadow-slate-900/50 overflow-hidden mb-16 border border-slate-100 dark:border-slate-800">
          <Features />
        </div>

        {/* --- NEW: Team Section (Replaces Download Section) --- */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-slate-900/50 p-6 md:p-8 mb-12 border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              Behind the Scenes
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Meet the Team</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
              The creative minds and developer behind HakbangQuest.
            </p>
          </div>
          
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src={TeamPhoto} 
              alt="HakbangQuest Team" 
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Optional Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
              <p className="text-white font-bold text-lg">College of Computer Studies • The Lewis College</p>
            </div>
          </div>
        </section>

        {/* Suggestions Form (Now has the ID 'share-ideas') */}
        <section id="share-ideas" className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-slate-900/50 p-8 md:p-12 mb-16 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Share Your Ideas</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Help us improve HakbangQuest with your suggestions.</p>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <IoBulb className="text-yellow-500 text-xl" />
                  <span>We Value Your Input</span>
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your feedback helps us create a better fitness experience. Share your ideas for new features or improvements.
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Suggestion</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Share your ideas..."
                  className="w-full h-32 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitSuggestion}
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 shadow-blue-500/30"
                    }`}
                >
                  {isSubmitting ? "Sending..." : "Send Suggestion"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Section */}
        {isAdmin && (
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Admin Panel</h2>
              <span className="px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold uppercase tracking-wider">Admin</span>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 border border-slate-100 dark:border-slate-800">
              <SuggestionScreen />
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Scroll Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1 z-40 ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
      >
        <IoArrowUp size={20} />
      </button>

      {/* Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Login</h3>
              <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl leading-none">&times;</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none dark:text-white"
                  placeholder="admin@hakbang.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-6 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default DashboardScreen;