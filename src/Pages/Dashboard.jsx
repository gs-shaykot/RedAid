import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHireAHelper } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
const Dashboard = () => {
    return (
        <div className='flex'>
            {/* SIDEBAR */}
            <div className='w-2/12'>
                <div className="drawer z-30">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="navbar items-start bg-white shadow-md w-full h-screen">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="hidden flex-none lg:block">
                                <ul className="menu flex-col menu-horizontal gap-3">
                                    {/* Navbar menu content here */}
                                    <li>
                                        <NavLink to='profile'><ImProfile />My Profile</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to='main'><MdSpaceDashboard />Dashboard</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to='MyRequest'><FaHireAHelper />My Donation Requests</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to='CreateRequest'><MdCreateNewFolder />Create Donation Requests</NavLink>
                                    </li>
                                </ul>
                                <div className="divider divider-neutral">Or</div>
                                <ul className="menu flex-col menu-horizontal">
                                    {/* Navbar menu content here */}
                                    <li>

                                        <NavLink to='/'><ImProfile />Home</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to='/donationRqst'><MdSpaceDashboard />Donation Request</NavLink>
                                    </li>
                                    <li>

                                        <NavLink to='/login'><FaHireAHelper />Logout</NavLink>
                                    </li>
                                    <li>
                                        
                                        <NavLink to='/funding'><MdCreateNewFolder />Donate Funding</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-10/12'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;