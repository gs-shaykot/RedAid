import React from 'react';
import banner from "../assets/banner.json"
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { FaRegHandshake } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
    return (
        <div className='bg-red-100 '>
            <div className="container mx-auto hero min-h-screen"><div className="hero-content flex-col-reverse lg:flex-row-reverse">
                {/* Lottie Animation */}
                <Lottie
                    autoplay
                    loop
                    animationData={banner}
                    className="lg:w-[600px] md:h-[600px]"
                />
                {/* Hero Texts */}
                <div id="heroTexts" className="mt-24 w-full lg:w-6/12">
                    <h1 className="text-5xl font-bold">Save Lives Through Blood Donation</h1>
                    <p className="py-6">
                        Your single donation can save up to three lives. Join our community of lifesavers <br />
                        today and make a real difference in someone's life.
                    </p>
                    <div className="flex gap-2">
                        <Link>
                            <button className="btn bg-transparent border-red-600 text-sm hover:bg-red-500 hover:text-white">
                                <FaRegHandshake className="text-base" />
                                Join as a donor
                            </button>
                        </Link>
                        <Link>
                            <button className="btn bg-red-500 text-white text-sm hover:bg-red-500">
                                <FaSearch className="text-base" />
                                Search Donors
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
};

export default Banner;