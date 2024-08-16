import { useState } from "react";
import { useSelector } from "react-redux";
import { Logout, Menu } from "../index";
import { MdMenu, MdMenuOpen } from "react-icons/md";

export default function MobileMenu() {
  const authStatus = useSelector((state) => state?.auth?.status);
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <span
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-2xl"
      >
        {isMenuOpen ? <MdMenuOpen /> : <MdMenu />}
      </span>

      {isMenuOpen && (
        <ul className="absolute z-50 top-38 right-4 w-1/2 md:w-1/3 font-light bg-gray-50 rounded shadow-lg">
          <Menu authStatus={authStatus} className="px-4 py-2 border-b last:border-none border-b-gray-300" />

          {authStatus && (
            <li className="px-4 py-2">
              <Logout />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
