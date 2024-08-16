export default function P({ className, children }) {
  return (
    <p
      className={`md:text-lg lg:text-xl xl:text-2xl font-light tracking-tight text-gray-600 ${className}`}
    >
      {children}
    </p>
  );
}
