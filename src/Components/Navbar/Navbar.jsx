import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Navbar.css";

const Admin = () => {

    const location = useLocation()
    let openList = document.querySelectorAll(".active");
    for (var i = 0; i < openList.length; i++) {
        openList[i].classList.toggle("active");
        openList[i].parentElement.classList.toggle("showMenu");
    }

    function subMenu(target1) {
        let subList = document.querySelectorAll(".iocn-link");
        let openList = document.querySelectorAll(".active");
        for (var i = 0; i < openList.length; i++) {
            if (openList[i] !== subList[target1]) {
                openList[i].classList.toggle("active");
                openList[i].parentElement.classList.toggle("showMenu");
            }
        }
        subList[target1].classList.toggle("active")
        subList[target1].parentElement.classList.toggle("showMenu");
    }
    return (
        location.pathname!=="/" &&
        <div className="sidebar">
            <div className="logo-details">
                <i className='bx bxs-wallet'></i>
                <span className="logo_name">Expense Tracker</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to='/Home' >
                        <i className='bx bx-grid-alt'></i>
                        <span className="link_name">Dashboard</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/Home' className="link_name">Dashboard</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/Report'>
                        <i className='bx bxs-report'></i>
                        <span className="link_name">Report</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/Report' className="link_name">Report</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/Note'>
                        <i className='bx bx-note'></i>
                        <span className="link_name">Note</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/Note' className="link_name">Note</Link></li>
                    </ul>
                </li>
                
                <li>
                    <Link to='/Settings'>
                        <i className='bx bx-cog'></i>
                        <span className="link_name">Settings</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/Settings' className="link_name">Settings</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Admin;
