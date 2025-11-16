import AuthBranding from "./AuthBranding";
const AuthLayout = ({children})=>{
    return(
        <div className="flex">
            {/* LEFT SIDE */}
            <div className="w-1/2 bg-gray-900 text-white flex items-center justify-center p-10 ">
                <AuthBranding/>
            </div>
            {/* RIGHT SIDE */}
            <div className="w-1/2 flex items-center justify-center bg-gray-50">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;