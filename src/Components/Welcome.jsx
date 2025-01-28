import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import useAdmin from '../Hooks/useisAdmin'; 
import logo from "../assets/logo.json"; 
import Lottie from 'lottie-react';

const Welcome = () => {
    const { user, LogOut, setUser } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const date = new Date()
    const SignOut = () => {
        LogOut()
            .then(res => {
                setUser()
                Swal.fire({
                    title: "Success",
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

    return (
        <div className='flex justify-between p-4 md:p-6'>
            <div className='flex flex-col md:flex-row items-start md:items-center'>
                <h1 className="text-lg md:text-xl font-semibold">Welcome, {user?.displayName}</h1>
                <p className="text-sm md:text-base">{date.toDateString()}</p>
            </div>
            <div className='hidden  md:flex justify-center items-center'>
                <Lottie
                    autoplay
                    loop
                    animationData={logo}
                    className='w-8 h-8 md:w-12 md:h-12'
                />
                <Link to='/' className="text-2xl md:text-3xl font-semibold font-bebas ml-2">RedAid</Link>
            </div>
            <div className='w-12 h-12'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 md:w-10 rounded-full">
                            <img
                                referrerPolicy='no-referrer'
                                alt="Profile"
                                src={user?.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className=" menu bg-base-100 text-black menu-sm dropdown-content rounded-box z-30 mt-3 w-52 p-2 shadow-lg">
                        <li><NavLink to='/dashboard/profile'>{user?.displayName}</NavLink></li>
                        {
                            isAdmin ?
                                <li><NavLink to='/dashboard/adminDashboard'>Admin Dashboard</NavLink></li> :
                                <li><NavLink to='/dashboard/main'>Dashboard</NavLink></li>
                        }
                        <li><a onClick={SignOut}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
