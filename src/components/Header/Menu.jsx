import { useLocation, useNavigate } from "react-router-dom";

export default function Menu({ authStatus, className }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Articles",
      slug: "/all-articles",
      active: authStatus,
    },
    {
      name: "Write Article",
      slug: "/write-article",
      active: authStatus,
    },
  ];

  const navigationHandler = (slug) => {
    navigate(slug);
    setIsMenuOpen(false);
  };

  return (
    <>
      {navItems.map(
        (item, index) =>
          item.active && (
            <li
              key={index}
              className={`${
                pathname === item.slug ? "text-blue-800 font-semibold" : ""
              } ${className}`}
            >
              <button onClick={() => navigationHandler(item.slug)}>
                {item.name}
              </button>
            </li>
          )
      )}
    </>
  );
}
