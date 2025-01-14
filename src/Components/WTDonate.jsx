import React from 'react';
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { FaTruckMedical } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";

const WTDonate = () => {
    return (
        <div >
            <div className='flex flex-col-reverse md:flex-row gap-4'>
                <div
                    className="md:w-6/12 bg-[url('https://i.ibb.co.com/GHCMHhD/wave-haikei-2.png')] md:bg-[url('https://i.ibb.co.com/zRggW9B/wave-haikei-1.png')]  bg-cover bg-no-repeat flex justify-center items-center"
                >
                    <img className='' src="https://i.ibb.co.com/kGnqrVc/rb-111266-min.png" alt="" />
                </div>
                <div className='py-10 p-5 md:pr-14 md:w-6/12'>
                    <h1 className=' mb-3 text-5xl text-gray-800 font-bold text-center'> Why Donate Blood?</h1>
                    <div>
                        <div>
                            <p className='text-lg mb-2 font-semibold flex gap-1 items-center'><FaBriefcaseMedical className='text-red-500'/>Save Lives</p>
                            <p className='mb-2'>Every blood donation can save up to three lives. From accident victims to cancer patients, your contribution can make the difference between life and death.</p>
                        </div>
                        <div>
                            <p className='text-lg mb-2 font-semibold flex gap-1 items-center'><FaHeartCircleMinus className='text-red-500'/>Address Blood Shortages</p>
                            <p className='mb-2'>Hospitals and clinics constantly face shortages of blood, especially rare types. By donating, you ensure that lifesaving blood is available when it’s needed most.</p>
                        </div>
                        <div>
                            <p className='text-lg mb-2 font-semibold flex gap-1 items-center'><FaTruckMedical className='text-red-500'/>Support Emergency Care</p>
                            <p className='mb-2'>Natural disasters, accidents, and medical emergencies often result in a sudden demand for blood. Your donation helps maintain a stable supply to meet unexpected needs.</p>
                        </div>
                        <div>
                            <p className='text-lg mb-2 font-semibold flex gap-1 items-center'><MdHealthAndSafety className='text-red-500'/>Health Benefits for Donors</p>
                            <p className='mb-2'>Maintain cardiovascular health by reducing iron levels in your body. Detect potential health issues through the free mini-health screening. Provide a sense of fulfillment and well-being by helping others.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WTDonate;