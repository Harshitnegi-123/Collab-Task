const Input = ({ label, type = "text", value, onChange, className = "" }) => {
    return (
        <div className="mb-4 w-full">
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full border px-3 py-2 rounded-md outline-none ${className}`}
            />
        </div>
    )
}
export default Input;