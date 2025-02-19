import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.json";
import Lottie from 'lottie-react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAdmin from '../Hooks/useisAdmin';
import useVolunteer from '../Hooks/useisVolunteer';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, LogOut, setUser } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isVolunteer, isLoading] = useVolunteer()
    const navigate = useNavigate()
    const SignOut = () => {
        LogOut()
            .then(res => {
                setUser()
                Swal.fire({
                    title: "Succeess",
                    text: "Logged Out Successfully",
                    icon: "success"
                });
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    title: "ERROR",
                    text: error.message,
                    icon: "error"
                });
            })
    }
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`w-full fixed top-0 z-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md p-1' : 'bg-transparent'}`}>
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
                            {
                                user ?
                                    <>
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
                                            <NavLink to='/showfunding'>Our Patrons</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/findBanks'>Blood Banks</NavLink>
                                        </li>
                                    </> :
                                    <>
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
                                            <Link to='/login' className=' md:inline-flex btn border-red-500 bg-transparent h-1'>LogIn</Link>
                                        </li>
                                        <li>
                                            <Link to='/register' className=' md:inline-flex btn bg-red-500 text-white h-1'>Register</Link>
                                        </li>
                                    </>
                            }

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
                    {
                        user ?
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
                                <li>
                                    <NavLink to='/showfunding'>Our Patrons</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/findBanks'>Blood Banks</NavLink>
                                </li>
                            </ul> :

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
                    }
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-8 md:w-10 rounded-full">
                                        <img
                                            referrerPolicy='no-referrer'
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu bg-base-100 text-black menu-sm dropdown-content rounded-box z-30 mt-3 w-52 p-2 shadow">
                                    <li><NavLink to='/dashboard/profile'>{user?.displayName}</NavLink></li>
                                    {
                                        isAdmin || isVolunteer ?
                                            <li><NavLink to='/dashboard/adminDashboard'>Dashboard</NavLink></li> :
                                            <li><NavLink to='/dashboard/main'>Dashboard</NavLink></li>
                                    }
                                    <li><a onClick={SignOut}>Logout</a></li>
                                </ul>
                            </div>
                            :

                            <div className='flex gap-2'>
                                <Link to='/login' className='hidden md:inline-flex btn border-1 hover:text-white hover:bg-red-500 border-red-600 rounded-full px-8 bg-transparent'>LogIn</Link>
                                <Link to='/register' className='hidden md:inline-flex btn bg-red-500 hover:bg-[#b91c1c] rounded-full px-8 text-white'>Register</Link>
                            </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default NavBar;
