import React from 'react';
import { FaUserPlus } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaBarsProgress } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { MdAddLocation } from "react-icons/md";

const HomeRequests = () => {
    const donationRequests = [
        {
            id: 1,
            title: "Urgent B+ Blood Needed for John Doe",
            recipientName: "John Doe",
            location: "Dhaka, Dhanmondi",
            date: "2025-01-15",
            bloodGroup: "B+",
            status: "inprogress",
            hospitalName: "Square Hospital, Dhaka",
            donor: { name: "Jane Smith", email: "jane.smith@example.com" },
        },
        {
            id: 2,
            title: "Urgent O- Blood Needed for Maria Khan",
            recipientName: "Maria Khan",
            location: "Chattogram, Halishahar",
            date: "2025-01-16",
            bloodGroup: "O-",
            status: "pending",
            hospitalName: "Chattogram Medical College Hospital",
            donor: null,
        },
        {
            id: 3,
            title: "Urgent AB+ Blood Needed for Ahsan Hossain",
            recipientName: "Ahsan Hossain",
            location: "Sylhet, Beanibazar",
            date: "2025-01-17",
            bloodGroup: "AB+",
            status: "done",
            hospitalName: "Sylhet MAG Osmani Medical College",
        },
    ];


    return (
        <div className='w-11/12 md:w-full container mx-auto'>
            <h2 className="text-center py-12 text-3xl md:text-5xl font-bold text-gray-800">
                Recent Blood Request
            </h2>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
                {
                    donationRequests.map(data => (
                        <div key={data.id} className="card bg-base-100 mx-auto w-11/12 shadow-xl">
                            <figure>
                                <img
                                    src="https://i.ibb.co.com/3CCRkrD/Types-of-Donations-squeezeball-768x384.webp"
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-base">{data.title}</h2>
                                <div>
                                    <div className='grid grid-cols-2 mb-2'>
                                        <div className='flex gap-1 items-center'>
                                            <FaUserPlus className='text-red-500 mr-1 text-lg'></FaUserPlus>
                                            <p>{data.recipientName}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <MdBloodtype  className='text-red-500 mr-1 text-lg'/>
                                            <p>{data.bloodGroup}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
                                        <div className='flex gap-1 items-center'>
                                            <FaHospital className='text-red-500 mr-1 text-lg'/>
                                            <p>{data.hospitalName}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <MdAddLocation className='text-red-500 mr-1 text-lg'/>
                                            <p>{data.location}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
                                        <div className='flex gap-1 items-center'>
                                            <BsCalendarDateFill className='text-red-500 mr-1 text-lg'></BsCalendarDateFill>
                                            <p>{data.date}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <FaBarsProgress className='text-red-500 mr-1 text-lg'/>
                                            <p>{data.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn w-full bg-red-500 text-white border-0 btn-primary">Donate Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomeRequests;