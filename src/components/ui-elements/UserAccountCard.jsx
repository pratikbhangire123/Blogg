import { Link } from "react-router-dom";

export default function UserAccountCard({
  title,
  accountAvailability,
  linkSlug,
  linkText,
  error,
  onSubmitHandler,
  children,
}) {
  return (
    <section className="p-8 md:p-12 lg:p-16 xl:p-24">
      <div className="flex flex-col md:w-1/2 xl:w-[35vw] items-center justify-center mx-auto p-4 border rounded shadow">
        <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-blue-800">
          {title}
        </h2>

        <p className="mt-2 text-sm md:text-base xl:text-lg">
          {accountAvailability}&nbsp;
          <Link to={linkSlug} className="font-semibold underline">
            {linkText}
          </Link>
        </p>

        {error && (
          <p className="mt-2 text-sm md:text-base xl:text-lg text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={onSubmitHandler} className="w-full mt-2 px-2">
          {children}
        </form>
      </div>
    </section>
  );
}
