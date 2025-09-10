import React from "react";

// Features data
const featuresData = [
  {
    icon: "🎯",
    title: "Goal Tracking",
    description: "Set personalized fitness goals and track your progress with detailed analytics and milestones.",
    color: "#4361EE",
  },
  {
    icon: "🏃‍♂️",
    title: "Activity Monitoring",
    description: "Monitor your daily steps, distance, calories burned, and active minutes automatically.",
    color: "#FFC107",
  },
  {
    icon: "🏆",
    title: "Achievement System",
    description: "Unlock badges and achievements as you reach new fitness milestones and complete challenges.",
    color: "#E63946",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    description: "View detailed charts and insights about your fitness journey and performance trends.",
    color: "#06D6A0",
  },
  {
    icon: "🌍",
    title: "Community Challenges",
    description: "Join community challenges and compete with friends to stay motivated and engaged.",
    color: "#118AB2",
  },
  {
    icon: "🎮",
    title: "Gamified Experience",
    description: "Turn your fitness journey into an exciting game with quests, rewards, and level progression.",
    color: "#FFD166",
  },
];

const Features = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>⚡ Epic Features</h2>
          <p style={styles.subtitle}>
            Power up your HakbangQuest adventure with features designed to make
            fitness fun, competitive, and rewarding.
          </p>
        </div>

        <div style={styles.grid}>
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                ...styles.card,
                borderColor: feature.color,
                "--hoverColor": feature.color,
              }}
            >
              <div
                style={{
                  ...styles.iconContainer,
                  background: `radial-gradient(circle at center, ${feature.color}33, transparent)`,
                  color: feature.color,
                }}
              >
                <span style={styles.icon}>{feature.icon}</span>
              </div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes glowPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }

          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .feature-card:hover {
            transform: translateY(-6px) scale(1.05) rotate(-1deg);
            box-shadow: 0 0 20px var(--hoverColor);
          }
        `}
      </style>
    </section>
  );
};

const styles = {
  section: {
    margin: "80px 0",
    padding: "0 24px",
  },
  container: {
    maxWidth: 1120,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 900,
    margin: 0,
    marginBottom: 16,
    background: "linear-gradient(135deg, #4361EE, #FFC107, #FF4D6D)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    margin: 0,
    maxWidth: 640,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#0F172A",
    borderRadius: 20,
    padding: 28,
    border: "2px solid",
    borderColor: "#4361EE",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    textAlign: "center",
    color: "#fff",
    cursor: "pointer",
    position: "relative",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: 28,
    animation: "glowPulse 3s infinite ease-in-out",
  },
  icon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: "0 0 12px",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 15,
    color: "#d1d5db",
    margin: 0,
    lineHeight: 1.6,
  },
};

export default Features;
