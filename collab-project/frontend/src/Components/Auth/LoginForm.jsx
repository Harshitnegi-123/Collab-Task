import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { loginUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";

const inlineStyles = {
  root: { display: "flex", flexDirection: "column", gap: "1rem" },
  header: { textAlign: "center", marginBottom: "0.5rem" },
  title: { fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)" },
  subtitle: { fontSize: "0.875rem", color: "var(--color-muted)" },
  alert: {
    borderRadius: 8,
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  },
  error: { background: "var(--color-error)", color: "#fff" },
  success: { background: "var(--color-success)", color: "#0f2f1f" },
};

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await loginUser({ email, password });

            setSuccess("Login Successful");

            // Save token in localStorage
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            console.log("Logged in user:", response.data.user);

            setTimeout(() => {
                navigate("/");  // Once dashboard is built
            }, 1000);

        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong");
        }

    };

    return (
        <form onSubmit={handleLogin} style={inlineStyles.root}>
            <div style={inlineStyles.header}>
                <h2 style={inlineStyles.title}>Welcome Back</h2>
                <p style={inlineStyles.subtitle}>Login to your workspace</p>
            </div>

            {error && (
                <p style={{ ...inlineStyles.alert, ...inlineStyles.error }}>{error}</p>
            )}
            {success && (
                <p style={{ ...inlineStyles.alert, ...inlineStyles.success }}>{success}</p>
            )}

            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button text="Login" type="submit" />
        </form>
    )
}

export default LoginForm;