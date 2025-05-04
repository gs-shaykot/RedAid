import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const { logInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    console.log(email);
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData.entries());

        logInUser(email, password)
            .then(() => {
                setEmail('');
                Swal.fire({
                    title: "Success",
                    text: "Logged in successfully",
                    icon: "success"
                });
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                setEmail('');
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                });
            });
    };

    // Auto-fill credentials for Admin or User
    const autoFillCredentials = (role) => {
        const admin = { email: "sarowar@gmail.com", password: "Admin@123" };
        const volunteer = { email: "gsshaykot53@gmail.com", password: "Admin@123" };
        const user = { email: "siam@gmail.com", password: "Admin@123" };

        let credentials;
        if (role === "admin") credentials = admin;
        else if (role === "volunteer") credentials = volunteer;
        else credentials = user;

        document.getElementById('email').value = credentials.email;
        document.getElementById('password').value = credentials.password;
        setEmail(credentials.email); // update state for forgot password link
    };


    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-end">
                    {/* Image Section */}
                    <div className="order-2 lg:order-first text-center lg:text-left">
                        <img src="https://i.ibb.co.com/23yZhD5b/blood-donation-concept-illustration-vector-removebg-preview-min.png" alt="Blood Donation" />
                    </div>

                    {/* Login Form */}
                    <div className="card bg-base-100 w-11/12 shadow-2xl mt-20 md:mt-0">
                        <form onSubmit={handleLogin} className="card-body pb-0">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label flex justify-between">
                                    <NavLink to={`/forgotPassword?email=${email}`} className="label-text-alt link link-hover font-semibold">
                                        Forgot password?
                                    </NavLink>
                                    <NavLink to="/register" className="label-text-alt link link-hover font-semibold">
                                        Register
                                    </NavLink>
                                </label>
                            </div>

                            {/* Login Button */}
                            <div className="form-control mt-6 pb-0">
                                <button className="btn bg-red-600 hover:bg-[#b91c1c] text-white border-0">
                                    Login
                                </button>
                            </div>

                            {/* Admin & User Quick Login Buttons */}
                            <div className="flex flex-col md:flex-row justify-center gap-4 my-2">
                                <button
                                    type="button"
                                    onClick={() => autoFillCredentials("admin")}
                                    className="btn bg-red-600 hover:bg-[#b91c1c] text-white w-full md:w-auto"
                                >
                                    Login as Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => autoFillCredentials("volunteer")}
                                    className="btn bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                                >
                                    Login as Volunteer
                                </button>

                                <button
                                    type="button"
                                    onClick={() => autoFillCredentials("user")}
                                    className="btn bg-gray-800 hover:bg-gray-900  text-white w-full md:w-auto"
                                >
                                    Login as User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
