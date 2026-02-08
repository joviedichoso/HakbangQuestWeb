import React from "react";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">

            {/* Brand Text */}
            <div className="mb-8 text-center animate-pulse">
                <h2 className="text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                    Hakbang<span className="text-yellow-500">Quest</span>
                </h2>
            </div>

            {/* Bouncing Dots Animation (The "Steps") */}
            <div className="flex items-center gap-4">
                {/* Dot 1 - Blue */}
                <div
                    className="w-5 h-5 rounded-full bg-blue-600 shadow-lg shadow-blue-500/50 animate-bounce"
                    style={{ animationDuration: '0.8s', animationDelay: '0s' }}
                ></div>

                {/* Dot 2 - Yellow */}
                <div
                    className="w-5 h-5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-bounce"
                    style={{ animationDuration: '0.8s', animationDelay: '0.15s' }}
                ></div>

                {/* Dot 3 - Pink */}
                <div
                    className="w-5 h-5 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50 animate-bounce"
                    style={{ animationDuration: '0.8s', animationDelay: '0.3s' }}
                ></div>
            </div>

            {/* Subtext */}
            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Initializing...
            </p>
        </div>
    );
};

export default Loading;