import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../redux/features/authSlice";
import { Button } from "../index";

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return <Button onClick={logoutHandler} className="text-lg">Logout</Button>;
}

export default Logout;
