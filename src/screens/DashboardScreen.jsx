import React, { useState } from "react";
import backgroundImage from '../../src/assets/image/jogging.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardScreen() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadAPK = () => {
        setIsDownloading(true);

        const apkUrl = "/HakbangQuest.apk";

        // Trigger APK download
        const link = document.createElement("a");
        link.href = apkUrl;
        link.download = "HakbangQuest.apk";
        link.click();

        // Simulate download
        setTimeout(() => {
            setIsDownloading(false);

            // Game-like toast
            toast.success("APK downloaded! Tap to open.", {
                position: "top-center",
                autoClose: 4000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClick: () => window.open(apkUrl, "_blank"),
                className: "game-toast",
                bodyClassName: "game-toast-body",
                icon: "🎮",
            });
        }, 2000);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(18, 24, 38, 0.3), rgba(18, 24, 38, 0.8), rgba(18, 24, 38, 0.95))',
                }}
            ></div>

            {/* Header */}
            <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl px-8 py-4 border border-white border-opacity-30 shadow-lg">
                    <div className="flex items-center">
                        <img
                            src="../src/assets/image/icon.png"
                            alt="HakbangQuest Icon"
                            className="w-8 h-8 object-contain rounded-md mr-3"
                        />
                        <h1 className="text-[#4361EE] text-2xl font-bold tracking-wide">HakbangQuest</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center p-6 pb-12 mt-28 z-10">
                {/* Features */}
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        {[
                            { icon: '🏆', color: '#FFD166', label: 'Achievements' },
                            { icon: '🤝', color: '#06D6A0', label: 'Community' },
                            { icon: '📈', color: '#4361EE', label: 'Progress' },
                        ].map((feature) => (
                            <div key={feature.label} className="flex flex-col items-center mx-4">
                                <div className={`p-4 rounded-full mb-2 border-2 border-white border-opacity-20 shadow-md`} style={{ backgroundColor: feature.color + '20' }}>
                                    <span className="text-2xl" style={{ color: feature.color }}>{feature.icon}</span>
                                </div>
                                <p className="text-white text-sm opacity-90 font-medium">{feature.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="mb-10 text-center">
                    <h2 className="text-white text-4xl mb-4 leading-tight font-bold">
                        Welcome to Your<br />
                        <span className="text-[#4361EE]">Dashboard</span>
                    </h2>
                    <p className="text-white text-base opacity-90 leading-relaxed px-4">
                        Manage your fitness journey, track progress, and connect with the community.
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
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />

            {/* Loader and Toast CSS */}
            /* Loader and Toast CSS */
            <style>{`
  /* Loader dots */
  .loader-dots {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader-dots span {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 0 3px;
    background: white;
    border-radius: 50%;
    animation: pulse 0.6s infinite ease-in-out;
  }
  .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loader-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse {
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* Game-like toast */
  .game-toast {
    background: linear-gradient(135deg, #4361EE, #3651D4); /* Primary gradient */
    border-radius: 16px;
    color: #fff;
    font-weight: bold;
    padding: 14px 18px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    border: 2px solid rgba(255,255,255,0.3);
    transform: scale(0.9);
    animation: pop 0.35s forwards;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 90%;
    margin: 0 auto;
  }
  .game-toast-body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  .game-toast .close-btn {
    margin-left: 10px;
    border: none;
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-weight: bold;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .game-toast .close-btn:hover {
    background: rgba(255,255,255,0.4);
  }

  @keyframes pop {
    0% { transform: scale(0.6); opacity: 0; }
    80% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }

  /* Mobile responsive toast */
  @media (max-width: 480px) {
    .game-toast {
      font-size: 14px;
      padding: 12px 14px;
      border-radius: 14px;
      max-width: 95%;
    }
    .game-toast-body {
      font-size: 13px;
    }
    .game-toast .close-btn {
      width: 20px;
      height: 20px;
      font-size: 12px;
    }
  }
`}</style>

        </div>
    );
}

export default DashboardScreen;
