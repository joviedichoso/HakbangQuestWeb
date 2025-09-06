import React, { useState, useEffect } from "react";
import backgroundImage from "../../src/assets/image/jogging.jpg";
import icon from "../../src/assets/image/icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Firebase
import { db } from "../firebaseConfig"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// Import the SuggestionScreen for Admin view
import SuggestionScreen from "./SuggestionScreen";

function DashboardScreen() {
    // Initialize admin state from localStorage
    const [isAdmin, setIsAdmin] = useState(() => {
        const stored = localStorage.getItem("adminLoggedIn");
        return stored === "true";
    });

    const [showLogin, setShowLogin] = useState(false);
    const [userName, setUserName] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Sync localStorage with isAdmin
    useEffect(() => {
        localStorage.setItem("adminLoggedIn", isAdmin ? "true" : "false");
    }, [isAdmin]);

    // Verify Firebase auth state on load
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === "admin@hakbang.com") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // Handle Admin Login
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
                toast.success("✅ Logged in as Admin!");
            } else {
                toast.error("❌ Not authorized!");
            }
        } catch (err) {
            console.error("Login failed", err);
            toast.error("❌ Invalid credentials!");
        }
    };

    // Handle Admin Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsAdmin(false);
            toast.info("👋 Logged out successfully.");
        } catch (err) {
            console.error("Logout failed", err);
            toast.error("❌ Logout failed.");
        }
    };

    // Download APK
    const handleDownloadAPK = () => {
        setIsDownloading(true);
        const apkUrl =
            "https://github.com/joviedichoso/HakbangQuestWeb/releases/download/v1.0.0/HakbangQuest.apk";

        const link = document.createElement("a");
        link.href = apkUrl;
        link.download = "HakbangQuest.apk";
        link.click();

        setTimeout(() => {
            setIsDownloading(false);
            toast.success("APK downloaded! Tap to open.", {
                position: "top-center",
                autoClose: 4000,
                onClick: () => window.open(apkUrl, "_blank"),
                className: "game-toast",
                bodyClassName: "game-toast-body",
                icon: "🎮",
            });
        }, 2000);
    };

    // Submit Suggestion (for guest users only)
    const handleSubmitSuggestion = async () => {
        if (!userName.trim()) {
            toast.error("Please enter your name before submitting!");
            return;
        }
        if (!suggestion.trim()) {
            toast.error("Please write something before submitting!");
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
            toast.success("✅ Thanks for your suggestion!");
        } catch (err) {
            console.error("Error adding suggestion:", err);
            toast.error("❌ Failed to send suggestion.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(18, 24, 38, 0.3), rgba(18, 24, 38, 0.8), rgba(18, 24, 38, 0.95))",
                }}
            ></div>

            {/* Header */}
            <div className="absolute top-12 inset-x-4 z-10 flex flex-col md:flex-row items-center justify-between bg-white bg-opacity-20 backdrop-blur-md rounded-3xl px-4 py-2 border border-white border-opacity-30 shadow-lg max-w-7xl mx-auto">
                {/* Logo & Title */}
                <div className="flex items-center space-x-3">
                    <img
                        src={icon}
                        alt="HakbangQuest Icon"
                        className="w-8 h-8 object-contain rounded-md"
                    />
                    <h1 className="text-[#4361EE] text-2xl font-bold tracking-wide whitespace-nowrap">
                        HakbangQuest
                    </h1>
                </div>

                {/* Admin Button / Logout */}
                <div className="mt-4 md:mt-0">
                    {isAdmin ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-[#4361EE] font-semibold">👑 Admin</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="bg-[#4361EE] text-white px-4 py-2 rounded-lg shadow hover:bg-[#3651D4] transition"
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center p-6 pb-12 mt-28 z-10 w-full">
                {/* If Admin → Show SuggestionScreen */}
                {isAdmin ? (
                    <SuggestionScreen />
                ) : (
                    <>
                        {/* Features */}
                        <div className="mb-8 mt-16">
                            <div className="flex justify-center mb-6">
                                {[
                                    { icon: "🏆", color: "#FFD166", label: "Achievements" },
                                    { icon: "🤝", color: "#06D6A0", label: "Community" },
                                    { icon: "📈", color: "#4361EE", label: "Progress" },
                                ].map((feature) => (
                                    <div
                                        key={feature.label}
                                        className="flex flex-col items-center mx-4"
                                    >
                                        <div
                                            className="p-4 rounded-full mb-2 border-2 border-white border-opacity-20 shadow-md"
                                            style={{ backgroundColor: feature.color + "20" }}
                                        >
                                            <span
                                                className="text-2xl"
                                                style={{ color: feature.color }}
                                            >
                                                {feature.icon}
                                            </span>
                                        </div>
                                        <p className="text-white text-sm opacity-90 font-medium">
                                            {feature.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Welcome Message */}
                        <div className="mb-10 text-center">
                            <h2 className="text-white text-4xl mb-4 leading-tight font-bold">
                                Welcome to 
                                <br />
                                <span className="text-[#4361EE]">Hakbang</span>
                                <span className="text-[#FFC107]">Quest</span>
                            </h2>
                            <p className="text-white text-base opacity-90 leading-relaxed px-4">
                                Manage your fitness journey, track progress, and connect with the
                                community.
                            </p>
                        </div>

                        {/* Download Section */}
                        <div className="w-full max-w-sm flex flex-col items-center">
                            <p className="mb-4 text-lg font-medium text-white opacity-90 text-center">
                                Install HakbangQuest on your Android device now!
                            </p>
                            <button
                                onClick={handleDownloadAPK}
                                disabled={isDownloading}
                                className={`w-full mb-6 shadow-lg
                       bg-gradient-to-r from-[#4361EE] to-[#3651D4]
                       py-3 px-6 rounded-3xl items-center flex justify-center
                       border border-white border-opacity-20
                       text-white text-lg font-bold
                       hover:from-[#3651D4] hover:to-[#4361EE] transition-all duration-300
                       ${isDownloading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                            >
                                {isDownloading ? (
                                    <div className="flex items-center">
                                        <div className="loader-dots mr-2">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        Downloading...
                                    </div>
                                ) : (
                                    <>
                                        <i className="fas fa-rocket mr-3"></i> Download APK
                                    </>
                                )}
                            </button>

                            <small className="text-white text-xs opacity-60 mt-2 block select-none">
                                APK size - ~163MB | Version 1.0.0
                            </small>
                        </div>

                        {/* Suggestion Box (for guest users only) */}
                        <div className="w-full max-w-md mt-10 bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white border-opacity-20">
                            <h3 className="text-[#4361EE] text-lg font-semibold mb-3">
                                💡 Got a suggestion?
                            </h3>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4361EE] resize-none mb-3"
                            />
                            <textarea
                                value={suggestion}
                                onChange={(e) => setSuggestion(e.target.value)}
                                placeholder="Write your suggestion..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4361EE] resize-none"
                                rows="3"
                            />
                            <button
                                onClick={handleSubmitSuggestion}
                                disabled={isSubmitting}
                                className="mt-3 w-full bg-[#4361EE] text-white font-bold py-2 rounded-lg hover:bg-[#3651D4] transition-all disabled:opacity-60"
                            >
                                {isSubmitting ? "Sending..." : "Send Suggestion"}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Admin Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-2xl w-80 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full p-2 mb-3 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full p-2 mb-3 border rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleLogin}
                                className="bg-[#4361EE] text-white px-4 py-2 rounded-lg hover:bg-[#3651D4]"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setShowLogin(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer position="top-center" autoClose={4000} theme="dark" />

            {/* Loader Animation */}
            <style>{`
        .loader-dots { display: flex; align-items: center; justify-content: center; }
        .loader-dots span {
          display: inline-block; width: 6px; height: 6px; margin: 0 3px;
          background: white; border-radius: 50%;
          animation: pulse 0.6s infinite ease-in-out;
        }
        .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loader-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { 0%, 80%, 100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
      `}</style>
        </div>
    );
}

export default DashboardScreen;