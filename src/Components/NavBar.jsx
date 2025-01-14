import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/logo.json";
import Lottie from 'lottie-react';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false); 
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);  
        };

        window.addEventListener('scroll', handleScroll);

        // return () => {
        //     window.removeEventListener('scroll', handleScroll); // Cleanup event listener
        // };
    }, []);

    return (
        <div className={`w-full fixed top-0 z-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 gap-3 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/donationRqst'>Donation Request</NavLink>
                            </li>
                            <li>
                                <NavLink to='/blogs'>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to='/login' className=' md:inline-flex btn border-red-500 bg-transparent h-1'>LogIn</NavLink>
                            </li>
                            <li>
                                <NavLink to='/register' className=' md:inline-flex btn bg-red-500 text-white h-1'>Register</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className='flex justify-center items-center'>
                        <Lottie
                            autoplay
                            loop
                            animationData={logo}
                            className='w-8 h-8 md:w-10 md:h-10'
                        />
                        <Link to='/' className="text-2xl md:text-3xl font-semibold font-bebas">RedAid</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3 text-lg">
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/donationRqst'>Donation Request</NavLink>
                        </li>
                        <li>
                            <NavLink to='/blogs'>Blog</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex gap-2'>
                        <NavLink to='/login' className='hidden md:inline-flex btn border-1 border-red-600 rounded-full px-8 bg-transparent'>LogIn</NavLink>
                        <NavLink to='/register' className='hidden md:inline-flex btn bg-red-500 hover:bg-[#b91c1c] rounded-full px-8 text-white'>Register</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
