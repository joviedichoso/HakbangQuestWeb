import React, { useState } from "react";

// Features data
const featuresData = [
  {
    icon: "🎯",
    title: "Goal Tracking",
    description:
      "Set personalized fitness goals and track your progress with detailed analytics and milestones.",
    color: "#4361EE",
  },
  {
    icon: "🏃‍♂️",
    title: "Activity Monitoring",
    description:
      "Monitor your daily steps, distance, calories burned, and active minutes automatically.",
    color: "#FFC107",
  },
  {
    icon: "🏆",
    title: "Achievement System",
    description:
      "Unlock badges and achievements as you reach new fitness milestones and complete challenges.",
    color: "#E63946",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    description:
      "View detailed charts and insights about your fitness journey and performance trends.",
    color: "#06D6A0",
  },
  {
    icon: "🌍",
    title: "Community Challenges",
    description:
      "Join community challenges and compete with friends to stay motivated and engaged.",
    color: "#118AB2",
  },
  {
    icon: "🎮",
    title: "Gamified Experience",
    description:
      "Turn your fitness journey into an exciting game with quests, rewards, and level progression.",
    color: "#FFD166",
  },
];

const Features = () => {
  return (
    <section style={styles.section} id="features">
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>POWER UP</span>
          <h2 style={styles.title}>Epic Features</h2>
          <p style={styles.subtitle}>
            Power up your <span style={{ color: "#4361EE", fontWeight: "bold" }}>HakbangQuest</span> adventure with features designed to make
            fitness fun, competitive, and rewarding.
          </p>
        </div>

        <div style={styles.grid}>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Extracted Card Component for cleaner state management
const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        borderColor: isHovered ? feature.color : "transparent",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 20px 40px -15px ${feature.color}40`
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...styles.iconContainer,
          background: isHovered
            ? `${feature.color}20`
            : "rgba(67, 97, 238, 0.05)",
          color: feature.color,
        }}
      >
        <span style={{ fontSize: "32px" }}>{feature.icon}</span>
      </div>
      <h3 style={styles.cardTitle}>{feature.title}</h3>
      <p style={styles.cardDescription}>{feature.description}</p>
    </div>
  );
};

const styles = {
  section: {
    padding: "100px 24px",
    background: "#F8FAFC",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 64,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  badge: {
    background: "#EEF2FF",
    color: "#4361EE",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "clamp(32px, 5vw, 42px)",
    fontWeight: 900,
    margin: 0,
    color: "#0F172A",
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: "clamp(16px, 2vw, 18px)",
    color: "#64748B",
    margin: 0,
    maxWidth: 600,
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 32,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "32px",
    border: "2px solid transparent",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    height: "100%",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
    transition: "background 0.3s ease",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 800,
    margin: 0,
    color: "#0F172A",
  },
  cardDescription: {
    fontSize: "15px",
    color: "#64748B",
    margin: 0,
    lineHeight: 1.6,
  },
};

export default Features;