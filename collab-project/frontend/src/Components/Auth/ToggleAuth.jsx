const styles = {
  root: { marginTop: "1rem", textAlign: "center", color: "var(--color-muted)" },
  link: {
    color: "var(--color-primary)",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "none",
  },
};
const ToggleAuth = ({ isLogin, setIsLogin }) => {
  return (
    <div style={styles.root}>
      {isLogin ? (
        <p>
          Don't have an account?{" "}
          <span onClick={() => setIsLogin(false)} style={styles.link}>
            Register
          </span>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <span onClick={() => setIsLogin(true)} style={styles.link}>
            Login
          </span>
        </p>
      )}
    </div>
  );
};
export default ToggleAuth;