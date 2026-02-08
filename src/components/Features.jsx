import React from "react";
import {
  IoFlag,
  IoWalk,
  IoTrophy,
  IoBarChart,
  IoPeople,
  IoGameController
} from "react-icons/io5";

const featuresData = [
  {
    icon: <IoFlag />,
    title: "Goal Tracking",
    description: "Set personalized fitness goals and track your progress with detailed analytics.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    glow: "shadow-blue-500/50",
    size: "md:col-span-2", // Spans 2 columns
  },
  {
    icon: <IoWalk />,
    title: "Activity Monitor",
    description: "Auto-track steps & distance.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    glow: "shadow-yellow-500/50",
    size: "md:col-span-1",
  },
  {
    icon: <IoGameController />,
    title: "Gamified",
    description: "Turn workouts into quests.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    glow: "shadow-purple-500/50",
    size: "md:col-span-1",
  },
  {
    icon: <IoPeople />,
    title: "Community Challenges",
    description: "Join challenges, compete with friends, and climb the global leaderboards together.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    glow: "shadow-cyan-500/50",
    size: "md:col-span-2", // Spans 2 columns
  },
  {
    icon: <IoTrophy />,
    title: "Achievements",
    description: "Unlock badges as you go.",
    color: "text-red-500",
    bg: "bg-red-500/10",
    glow: "shadow-red-500/50",
    size: "md:col-span-1",
  },
  {
    icon: <IoBarChart />,
    title: "Analytics",
    description: "See your trends over time.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    glow: "shadow-emerald-500/50",
    size: "md:col-span-1",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Everything you need
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Powerful Features. <br />
              <span className="text-slate-400 dark:text-slate-600">Zero Clutter.</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs text-sm md:text-base leading-relaxed text-center md:text-right">
            We packed HakbangQuest with everything you need to stay moving, without the complicated menus.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`
                ${feature.size} 
                group relative overflow-hidden rounded-[2rem] p-8 
                bg-slate-50 dark:bg-slate-900 
                border border-slate-100 dark:border-slate-800 
                transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-slate-900/50
              `}
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent dark:from-white dark:to-transparent pointer-events-none`} />

              <div className="relative z-10 flex flex-col h-full justify-between">

                {/* Icon Box */}
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 
                  ${feature.bg} ${feature.color} 
                  group-hover:scale-110 transition-transform duration-300
                  shadow-lg ${feature.glow}
                `}>
                  {React.cloneElement(feature.icon, { size: 28 })}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;