import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo, Logout } from "../index";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useState } from "react";

function Header() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state?.auth?.status);
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
      slug: "/add-article",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-5 lg:px-6 xl:px-7 py-3 text-gray-800 bg-gray-50 shadow">
      <nav className="flex items-center justify-between">
        <Logo />

        <div>
          <span
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl"
          >
            {isMenuOpen ? <MdMenuOpen /> : <MdMenu />}
          </span>

          {isMenuOpen && (
            <ul className="absolute z-50 top-38 right-4 w-1/2 md:w-1/3 font-light bg-gray-50 rounded shadow-lg">
              {navItems.map((item, index) =>
                item.active ? (
                  <li
                    key={index}
                    className={`px-4 py-2 ${
                      pathname === item.slug
                        ? "text-blue-800 font-semibold"
                        : ""
                    } border-b last:border-none border-b-gray-300`}
                  >
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="px-4 py-2">
                  <Logout />
                </li>
              )}
            </ul>
          )}
        </div>

        <DesktopMenu
          navItems={navItems}
          authStatus={authStatus}
          navigate={navigate}
          pathname={pathname}
        />
      </nav>
    </header>
  );
}

function DesktopMenu({ navItems, authStatus, navigate, pathname }) {
  return (
    <ul className="hidden lg:flex items-center ml-auto xl:text-lg">
      {navItems.map((item, index) =>
        item.active ? (
          <li
            className={`inline-block px-3 ${
              pathname === item.slug ? "text-blue-800 font-semibold" : ""
            }`}
            key={index}
          >
            <button onClick={() => navigate(item.slug)}>{item.name}</button>
          </li>
        ) : null
      )}
      {authStatus && (
        <li className="inline-block pl-3">
          <Logout />
        </li>
      )}
    </ul>
  );
}

export default Header;
