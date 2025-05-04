import React from 'react';
import { FaUserPlus } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaHandHoldingMedical } from "react-icons/fa";
const How = () => {
    return (
        <div className='bg-red-100'>
            <div className='container mx-auto'>
                <div className="  py-12 px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            How Blood Donation Works
                        </h2>
                        <p className="text-gray-600">
                            Your simple guide to saving lives through blood donation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1: Register */}
                        <div className="card bg-white shadow-lg p-6 text-center">
                            <div className="flex justify-center items-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-500 text-2xl">
                                        <FaUserPlus />
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Register</h3>
                            <p className="text-gray-600">
                                Complete a brief registration form with your personal information and medical history.
                            </p>
                        </div>

                        {/* Step 2: Donate */}
                        <div className="card bg-white shadow-lg p-6 text-center">
                            <div className="flex justify-center items-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-500 text-2xl">
                                        <BiSolidDonateHeart />
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Donate</h3>
                            <p className="text-gray-600">
                                The actual donation takes only 8-10 minutes in a safe, sterile environment.
                            </p>
                        </div>

                        {/* Step 3: Save Lives */}
                        <div className="card bg-white shadow-lg p-6 text-center">
                            <div className="flex justify-center items-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-500 text-2xl">
                                        <FaHandHoldingMedical />
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Save Lives</h3>
                            <p className="text-gray-600">
                                Your donation can save up to three lives and help countless others.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default How;