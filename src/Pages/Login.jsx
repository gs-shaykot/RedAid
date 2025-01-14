 
import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-end">
                    <div className="order-2 lg:order-first text-center lg:text-left">
                        <img src="https://i.ibb.co.com/ZWD8Xvx/blood-donation-concept-illustration-vector-removebg-preview.png" alt="" />
                    </div>

                    {/* Login Form */}
                    <div className="card bg-base-100 w-11/12 shadow-2xl mt-20 md:mt-0">
                        <form className="card-body pb-0" >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <NavLink
                                        to="/forgot-password"
                                        className="label-text-alt link link-hover font-semibold"
                                    >
                                        Forgot password?
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="label-text-alt link link-hover font-semibold"
                                    >
                                        Register
                                    </NavLink>
                                </label>
                            </div>
                            <div className="form-control mt-6 pb-5">
                                <button className="btn btn-primary bg-red-600 hover:bg-[#b91c1c]  text-white border-0">
                                    Login
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