import { useState } from "react";
const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.625rem 1rem",
  borderRadius: 8,
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontWeight: 600,
  color: "#fff",
  background: "var(--color-primary)",
  transition: "background 160ms ease, transform 80ms ease",
};

const Button = ({ text, onClick, type = "button" }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const style = {
    ...baseStyle,
    background: hover ? "#3b82f6" : baseStyle.background,
    transform: active ? "scale(0.98)" : "none",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {text}
    </button>
  );
};
export default Button;