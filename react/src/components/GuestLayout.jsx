import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import GuestNav from "./Navbar/guestNav";

export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div id="guestLayout">
      <GuestNav/>
      <Outlet />
    </div>
  );
}
