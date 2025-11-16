const Button = ({ text, onClick, type = "button" }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
            {text}
        </button>
    )

}
export default Button;