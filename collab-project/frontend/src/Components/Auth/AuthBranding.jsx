const styles = {
  root: { maxWidth: "48rem", animation: "fade-in-up 400ms ease-out both" },
  title: {
    fontWeight: 700,
    fontSize: "2.5rem",
    marginBottom: "1rem",
    backgroundImage:
      "linear-gradient(90deg, #93c5fd 0%, #7dd3fc 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 2px 4px rgba(0,0,0,0.35)",
  },
  subtitle: { fontSize: "1.125rem", color: "rgba(255,255,255,0.92)", marginBottom: "1.5rem" },
  list: { listStyle: "none", margin: 0, padding: 0 },
  item: { display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(255,255,255,0.9)", marginBottom: "0.75rem" },
  badge: { display: "inline-flex", height: 24, width: 24, alignItems: "center", justifyContent: "center", borderRadius: 9999, background: "rgba(255,255,255,0.2)" },
};

const AuthBranding = () => {
  return (
    <div style={styles.root}>
      <h1 style={styles.title}>CollabTask</h1>
      <p style={styles.subtitle}>Organize your work. Track progress. Collaborate in real-time.</p>

      <ul style={styles.list}>
        <li style={styles.item}>
          <span style={styles.badge}>✓</span>
          Real-time task updates
        </li>
        <li style={styles.item}>
          <span style={styles.badge}>✓</span>
          Team workspace management
        </li>
        <li style={styles.item}>
          <span style={styles.badge}>✓</span>
          Smart collaboration tools
        </li>
      </ul>
    </div>
  );
};

export default AuthBranding;