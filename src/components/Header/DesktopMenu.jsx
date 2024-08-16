import { useSelector } from "react-redux";
import { Logout, Menu } from "../index";

export default function DesktopMenu() {
  const authStatus = useSelector((state) => state?.auth?.status);

  return (
    <ul className="hidden lg:flex items-center ml-auto xl:text-lg">
      <Menu authStatus={authStatus} className="inline-block px-3" />

      {authStatus && (
        <li className="inline-block pl-3">
          <Logout />
        </li>
      )}
    </ul>
  );
}
