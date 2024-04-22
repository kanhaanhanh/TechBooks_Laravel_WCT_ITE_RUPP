import React from 'react'
import { Link, Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/new-logo.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SearchBar from './searchBar';

export default function GuestNav() {

    // const {token} = useStateContext()
    // if (!token) {
    //   console.log("It is work");
    //   return <Navigate to="/signup" />;
      
    // }
    const handleToHomePage = () => {
        // Add any logic you need when returning to the home page
      };
  return (
    <div>
    <Navbar
      expand="lg"
      sticky="top"
      className="navbar-light shadow-sm p-3 mb-5 rounded navbar"
    >
      <Navbar.Brand as={Link} to="/" onClick={handleToHomePage}>
        <img src={Logo} alt="Logo" className="logo ml-auto" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav" style={{ background: "inherit", width: "inherit" }}>
        <Nav className="ms-auto back" style={{ display: "flex", flexDirection: "row" }}>
          <li className="nav-item search">
            {/* <SearchBar /> */}
          </li>
          <li className="nav-item btn-pro-set">
            <Button as={Link} to="/login" variant="primary">
              <b>Log In</b>
            </Button>
          </li>
          <li className="nav-item btn-pro-set">
            <Button as={Link} to="/signup" variant="light">
              <b>Sign Up</b>
            </Button>
          </li>
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
    <Outlet/>
    </div>
  )
}
