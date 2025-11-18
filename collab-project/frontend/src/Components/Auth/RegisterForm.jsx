import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
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
import { registerUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [workspace, setWorkspace] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await registerUser({
                username: fullname,
                email: email,
                password: password
            });

            setSuccess("Account created successfully");


            setFullname("");
            setEmail("");
            setPassword("");
            setWorkspace("");


            // Delay 1 sec then redirect to login
            setTimeout(() => {
                navigate("/", { replace: true }); // loads AuthPage again → shows login
            }, 1000);
            console.log(response.data);
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleRegister} style={inlineStyles.root}>
            <div style={inlineStyles.header}>
                <h2 style={inlineStyles.title}>Create Account</h2>
                <p style={inlineStyles.subtitle}>Set up your workspace</p>
            </div>

            {error && (
                <p style={{ ...inlineStyles.alert, ...inlineStyles.error }}>{error}</p>
            )}
            {success && (
                <p style={{ ...inlineStyles.alert, ...inlineStyles.success }}>{success}</p>
            )}

            <Input label="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input label="Workspace Name" value={workspace} onChange={(e) => setWorkspace(e.target.value)} />

            <Button text="Create Account" type="submit" />
        </form>
    );
};

export default RegisterForm;
