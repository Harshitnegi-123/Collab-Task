import AuthBranding from "./AuthBranding";
const styles = {
  container: { minHeight: "100vh", display: "flex" },
  left: {
    position: "relative",
    width: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
    backgroundImage:
      "linear-gradient(135deg, #0e1a3a 0%, #1e3a8a 35%, #2563eb 70%, #0ea5e9 100%)",
    overflow: "hidden",
  },
  blobBase: {
    position: "absolute",
    borderRadius: 9999,
    filter: "blur(32px)",
    animation: "float 6s ease-in-out infinite",
  },
  blob1: { top: -40, left: -40, width: 220, height: 220, background: "rgba(255,255,255,0.10)" },
  blob2: { bottom: 40, right: -40, width: 280, height: 280, background: "rgba(14,165,233,0.18)" },
  blob3: { top: "50%", left: "25%", width: 160, height: 160, background: "rgba(99,102,241,0.18)" },
  right: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-surface)",
  },
  card: {
    width: "100%",
    maxWidth: "28rem",
    borderRadius: "12px",
    padding: "2rem",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.12)",
    animation: "fade-in-up 400ms ease-out both",
  },
};

const AuthLayout = ({ children }) => {
  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        {/* Decorative blobs */}
        <div style={{ ...styles.blobBase, ...styles.blob1 }} />
        <div style={{ ...styles.blobBase, ...styles.blob2 }} />
        <div style={{ ...styles.blobBase, ...styles.blob3 }} />

        <AuthBranding />
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <div style={styles.card}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;