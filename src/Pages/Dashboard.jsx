import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';  

const Dashboard = () => {
    return (
        <div className='flex gap-10'>
            {/* SIDEBAR */}
            <div className='w-2/12'>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="navbar items-start bg-base-300 w-full h-screen">
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
                                        <Link to='profile'>My Profile</Link>
                                    </li>
                                    <li>
                                        <Link to=''>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to='MyRequest'>My Donation Requests</Link>
                                    </li>
                                    <li>
                                        <Link to='CreateRequest'>Create Donation Requests</Link>
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