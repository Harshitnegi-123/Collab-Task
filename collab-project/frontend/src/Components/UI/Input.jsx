import { useState } from "react";
const styles = {
  container: { display: "flex", flexDirection: "column", gap: "0.375rem" },
  label: { fontSize: "0.875rem", color: "var(--color-muted)" },
  input: {
    width: "100%",
    padding: "0.625rem 0.75rem",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    color: "var(--color-text)",
    outline: "none",
    transition: "border-color 160ms ease, box-shadow 160ms ease",
  },
};

const Input = ({ label, type = "text", value, onChange, className = "" }) => {
  const [focused, setFocused] = useState(false);
  const inputStyle = {
    ...styles.input,
    borderColor: focused ? "#60a5fa" : styles.input.border,
    boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.25)" : "none",
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};
export default Input;