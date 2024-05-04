import React, { useState } from 'react';
import './Navbar1.css';
import { IoIosNotifications } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { IoCardSharp } from "react-icons/io5";
import { CiBitcoin } from "react-icons/ci";
import { PiContactlessPayment } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { GiStatic } from "react-icons/gi";

const Navbar = ({ onLogin, onLogout, user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className='header-1'>
                <div className="top-area">
                    <div className="logo-search-notification-container">
                        <div className="logo">
                            <img src="/logo.png" alt="Logo" />
                        </div>
                        <div className="search-bar gap-between-elements">
                            <input type="text" placeholder="Search..." />
                            <button><i className="fa fa-search"></i></button>
                        </div>
                        <div className="notification-icons gap-between-elements">
                            <IoIosNotifications />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="profile">
                    <p>{user ? user.username : 'Amreen Bee'}</p>
                    <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
                        <div className="sidebar-content">
                            <ul>
                                <li>
                                    <button className="rounded-button">
                                        <MdOutlineRemoveRedEye style={{ color: '#DD58E1' }} /> Overview
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <CiUser style={{ color: '#DD58E1' }} /> Users
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <MdSupportAgent style={{ color: '#DD58E1' }} /> Agents
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <IoCardSharp style={{ color: '#DD58E1' }} /> Cards
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <CiBitcoin style={{ color: '#DD58E1' }} /> Bitcoin & Ethereum
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <PiContactlessPayment style={{ color: '#DD58E1' }} /> Payments
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <AiOutlineTransaction style={{ color: '#DD58E1' }} /> Transactions
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <GiStatic style={{ color: '#DD58E1' }} /> Statics
                                    </button>
                                </li>
                                <li>
                                    <button className="rounded-button">
                                        <CiLogout style={{ color: '#DD58E1' }} /> Logout
                                    </button>
                                </li>
                                {user ? (
                                    <>
                                        <li>Profile</li>
                                        <li>
                                            <button className="rounded-button" onClick={onLogout}>
                                                <CiLogout style={{ color: '#DD58E1' }} /> Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <button className="rounded-button" onClick={onLogin}>
                                            <CiLogin style={{ color: '#DD58E1' }} /> Login
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vertical-line"></div>
        </div>
    );
}

export default Navbar;
