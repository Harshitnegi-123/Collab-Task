import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
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
        <form onSubmit={handleRegister}>
            <h2>Create Account</h2>
            <p>Set up your workspace</p>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            <Input label="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input label="Workspace Name" value={workspace} onChange={(e) => setWorkspace(e.target.value)} />

            <Button text="Create Account" type="submit" />
        </form>
    );
};

export default RegisterForm;
