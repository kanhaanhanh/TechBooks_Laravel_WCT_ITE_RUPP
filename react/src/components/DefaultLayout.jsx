import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../assets/new-logo.png";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#87ceeb", width: "100%", padding: "10px 0" }}>
        <div>
        <img src={Logo} alt="Logo" className="logo ml-auto" />
        </div>

        <div>
          {user.firstname} &nbsp; &nbsp;
          <a onClick={onLogout} className="btn-logout" href="#">
            Logout
          </a>
        </div>
      </header>

      <div className="content" style={{ flex: "1", display: "flex" }}>
        <aside style={{ flex: "0 0 auto", width: "200px", backgroundColor: "gray" }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
        </aside>

        <main style={{ flex: "1", padding: "20px" }}>
          <Outlet />
        </main>
      </div>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
}
