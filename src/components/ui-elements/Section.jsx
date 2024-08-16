export default function Section({
  bgColor = "bg-blue-200",
  className,
  props,
  children,
}) {
  return (
    <section
      className={`flex flex-col justify-center min-h-[70vh] px-4 md:px-8 lg:px-12 xl:px-16 py-8 ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
