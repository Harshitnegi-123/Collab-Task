import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
                <AnimatePresence mode="wait">
                    {isLogin ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <LoginForm />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <RegisterForm />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div style={{ marginTop: "1rem" }}>
                    <ToggleAuth isLogin={isLogin} setIsLogin={setIsLogin} />
                </div>
            </div>
        </AuthLayout>
    )
}
export default AuthPage;