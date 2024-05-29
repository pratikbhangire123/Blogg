import { forwardRef, useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full mt-2">
      {label && (
        <label htmlFor={id} className="inline-block mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`px-2 py-1 border ${className}`}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
