import { useState, useEffect } from "react";
import AuthLayout from "../Components/Auth/AuthLayout";
import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import ToggleAuth from "../Components/Auth/ToggleAuth";
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        setIsLogin(true);   // whenever page loads, force Login tab
    }, []);

    return (
        <AuthLayout>
            {/* RIGHT SIDE FORM */}
            <div>
                {isLogin ? <LoginForm /> : <RegisterForm />}
                <ToggleAuth isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
        </AuthLayout>
    )
}
export default AuthPage;