const ToggleAuth = ({isLogin , setIsLogin}) =>{
    return(
        <div>
            {isLogin?(
                <p>
                    Don't have an account?{" "} 
                    <span
                    onClick={()=>setIsLogin(false)}
                    >
                        Register
                    </span>
                </p>

            ):(
                <p>
                    Already have an account?{" "}
                    <span
                    onClick={()=>setIsLogin(true)}
                    >
                        Login
                    </span>
                </p>
            )}
        </div>
    )

}
export default ToggleAuth;