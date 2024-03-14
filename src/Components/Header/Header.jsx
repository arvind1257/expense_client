import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
// import { Link, NavLink } from "react-router-dom";
// import { Dropdown } from "rsuite";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import * as solid from "@fortawesome/free-solid-svg-icons";
// import * as regular from "@fortawesome/free-regular-svg-icons";
import "./Header.css";
//import { logout } from "../../actions/logout";

import "../Navbar/Navbar.css";
const Header = () => {
    const location = useLocation()


    return (
        <div className="top-navbar">
            {location.pathname!=='/' ?
                <div className="search-bar">
                    <i className="bx bx-search"></i>
                    <input type="search" placeholder="Search" />
                </div>
                :
                <div className="websiteTitle"> 
                    <i className='bx bxs-wallet'></i>&ensp;
                    <span className="logo_name">Expense Tracker</span>
                </div>
            }
        </div>
    );
};

export default Header;
