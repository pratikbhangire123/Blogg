function Button({
  children,
  type = "button",
  bgColor = "bg-gray-900",
  textColor = "text-gray-50",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-3 py-1 text-center rounded-md ${textColor} ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
