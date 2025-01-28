import React, { useContext } from "react";
import Countdown from "react-countdown";  
import { useLoaderData, useNavigate } from "react-router-dom";
import { BsCalendarDateFill } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import useSecure from './../Hooks/useSecure';
import { AuthContext } from "../Provider/AuthProvider";
import useRequests from "../Hooks/useRequests";
import Swal from "sweetalert2";

const RequestDetails = () => {
    const DetailsData = useLoaderData();
    const axiosSec = useSecure()
    const { user } = useContext(AuthContext)
    const { refetch } = useRequests()
    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-red-600 font-bold">Time is up!</span>;
        } else {
            return (
                <span>
                    {days} days {hours} hours {minutes} minutes {seconds} seconds
                </span>
            );
        }
    };

    const navigate = useNavigate()
    const handleDonate = (id) => {
        const userInfo = {
            DonarName: user?.displayName, DonorEmail: user?.email, donationStatus: "inprogress"
        }
        const { _id: ReqID, ...restDetailsData } = DetailsData.data;
        const Donator = {
            ReqID,
            ...restDetailsData, 
            DonarName: user?.displayName,
            DonorEmail: user?.email,
            donationStatus: "inprogress",
        };


        axiosSec.patch(`/requests/${id}`, userInfo)
            .then(res => {
                refetch()
                axiosSec.post('/donar', Donator)
                    .then(res => {
                        Swal.fire({
                            title: "Thanks for your kindness",
                            text: "Registered for donations",
                            icon: "success"
                        });
                        navigate('/dashboard/main')
                    })
            })
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg my-20">
            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold w-full sm:w-auto">Blood Donation Request Details</h1>
                <div className="flex flex-wrap items-center space-x-2">
                    <p className="text-lg font-medium">Group: <span className="text-red-500">{DetailsData.data?.bloodGroup}</span></p>
                    <span className="badge badge-warning">{DetailsData.data?.donationStatus}</span>
                </div>
            </div>

            {/* Donation Needed Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-100 border-2 border-gray-400 rounded-md mb-4">
                <div>
                    <p className="font-medium">Donation Needed By</p>
                    <p className="flex gap-2 items-center text-lg">
                        <BsCalendarDateFill />
                        {DetailsData.data?.donationDate}
                    </p>
                </div>
                <div>
                    <p className="font-medium">Time Remaining</p>
                    <p className="flex gap-2 items-center text-lg">
                        <CgSandClock />
                        <Countdown
                            date={new Date(DetailsData.data?.donationDate)}
                            renderer={countdownRenderer}
                        />
                    </p>
                </div>
            </div>

            {/* Recipient Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Recipient Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    <div>
                        <p>Recipient Name:</p>
                        <p className="font-medium">{DetailsData.data?.recipientName}</p>
                    </div>
                    <div>
                        <p>Location:</p>
                        <p className="font-medium">
                            {DetailsData.data?.recipientUpazila}, {DetailsData.data?.recipientDistrict}
                        </p>
                    </div>
                    <div>
                        <p>Hospital:</p>
                        <p className="font-medium">{DetailsData.data?.hospitalName}</p>
                    </div>
                    <div>
                        <p>Full Address:</p>
                        <p className="font-medium">{DetailsData.data?.fullAddress}</p>
                    </div>
                </div>
            </div>

            {/* Request Details */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Request Details</h2>
                <div className="bg-gray-100 p-6 rounded-md">
                    <p className="italic">{`"${DetailsData.data?.requestMessage}"`}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaClock className="text-lg" />
                        <span>Requested on {DetailsData.data?.createdDate}</span>
                    </p>
                </div>
            </div>

            {/* Requester Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Requester Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-100 py-8 rounded-md px-5">
                    <p>
                        <p>Name:</p>
                        <p className="font-medium">{DetailsData.data?.requesterName}</p>
                    </p>
                    <p>
                        <p>Email:</p>
                        <p className="font-medium">{DetailsData.data?.requesterEmail}</p>
                    </p>
                </div>
            </div>

            {DetailsData.DonorEmail ? 
                <h1 className="text-red-500">Already someone has donated, Contact Requester before Donate</h1> : ""
            }

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {
                    (DetailsData.data?.requesterEmail === user?.email) ?
                        <button className="btn btn-primary bg-red-600 text-white border-0">Can't Donate to own post</button>
                        :
                        <button onClick={() => handleDonate(DetailsData.data._id)} className="btn btn-primary bg-red-600 text-white border-0">
                            Donate Now
                        </button>
                }
                <button className="btn btn-outline border-2 border-red-500">Share Request</button>
                <button className="btn btn-secondary bg-black border-0">
                    Contact Requester
                </button>
            </div>
        </div>
    );
};

export default RequestDetails;
