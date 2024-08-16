export default function H2({
  textColor = "text-gray-800",
  className,
  children,
}) {
  return (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-[0.010em] leading-8 ${textColor} ${className}`}
    >
      {children}
    </h2>
  );
}
