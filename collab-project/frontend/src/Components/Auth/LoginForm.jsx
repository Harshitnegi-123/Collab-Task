import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { loginUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleLogin}>

            <h2>Welcome Back</h2>
            <p>Login to your workspace</p>



            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}

            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button text="Login" type="submit" />

        </form>
    )
}

export default LoginForm;