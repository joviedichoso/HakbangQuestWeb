import React, { useEffect, useState, useMemo } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import appMockup from "../assets/image/168shots_so.png";

// Inject custom animations
const heroStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes textSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-gradient-text {
    background-size: 200%;
    animation: gradientText 4s ease infinite;
  }
  .animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  .animate-text-change {
    animation: textSlideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  .animate-blob {
    animation: blob 10s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

const Hero = ({ onGetApp, onShareSuggestion }) => {
  const [wordIndex, setWordIndex] = useState(0);

  const words = useMemo(
    () => ["Level Up Your Life", "Push Your Limits", "Celebrate Progress"],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    // FIXED: Reduced min-height logic and padding to fit better on mobile screens
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-12 lg:py-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      <style>{heroStyles}</style>

      {/* --- Background Blobs --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-40 animate-blob dark:bg-blue-600/10"></div>
        <div className="absolute top-[10%] -right-[10%] w-[18rem] md:w-[35rem] h-[18rem] md:h-[35rem] bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-40 animate-blob animation-delay-2000 dark:bg-yellow-600/10"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[22rem] md:w-[45rem] h-[22rem] md:h-[45rem] bg-pink-400/20 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-40 animate-blob animation-delay-4000 dark:bg-pink-600/10"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* --- Left Column: Text Content --- */}
          <div className="flex-1 text-center lg:text-left animate-fade-up max-w-2xl z-20">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-blue-600 dark:text-blue-300 uppercase w-fit mb-6 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Fitness Gamified
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6">
              Track distance, <br />
              build strength, <br />

              <div className="h-[1.5em] relative overflow-visible pb-2">
                <span
                  key={wordIndex}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient-text animate-text-change block pb-1"
                >
                  {words[wordIndex]}.
                </span>
              </div>
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed mb-8 mx-auto lg:mx-0">
              HakbangQuest isn't just a tracker—it's an adventure. Turn your daily steps into quests and your workouts into victories.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={onGetApp}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-blue-600/30 flex items-center gap-3"
              >
                <IoDownloadOutline size={22} />
                <span>Get the App</span>
              </button>
              <button
                onClick={onShareSuggestion}
                className="px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                Share Feedback
              </button>
            </div>
          </div>

          {/* --- Right Column: App Mockup --- */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            {/* FIXED: Added negative margin top (-mt-12) on mobile to pull image closer to buttons */}
            <div className="relative w-full max-w-[380px] md:max-w-[800px] animate-float -mt-9 lg:mt-0 lg:-mr-20">
              <img
                src={appMockup}
                alt="HakbangQuest App Interface"
                // FIXED: Increased mobile scale to 125 to match desktop zoom and hide padding
                className="w-full h-auto object-contain drop-shadow-2xl transform scale-125 origin-center"
              />

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/20 blur-3xl rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;