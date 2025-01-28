// make
import React from 'react';
import Welcome from '../../../Components/Welcome';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import Swal from 'sweetalert2';
import SlotCounter from 'react-slot-counter';
import useSecure from '../../../Hooks/useSecure';
import { Link } from 'react-router-dom';
import { BiSolidDetail } from "react-icons/bi";
import useAllReqs from '../../../Hooks/useAllReqs';
import { FaUsers } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import useAllUser from '../../../Hooks/useAllUser';
import useRecentReq from '../../../Hooks/useRecentReq';
import useFunding from '../../../Hooks/useFunding';

const AdminDashboard = () => {
    const { Alluser } = useAllUser()
    const { AllReq } = useAllReqs()
    const { RecentReq, isLoading, refetch } = useRecentReq()
    const { haveFund, isPending, fundReload } = useFunding()
    const totalFund = haveFund.reduce((accumulator, currentItem) => accumulator + Number(currentItem.price), 0);

    const handleDeleteReq = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSec.delete(`/requests/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }
                    )
            }
        });
    }

    const handleStatusChange = (data, stats) => {
        axiosSec.patch(`/donar/${data._id}`, { donationStatus: stats })
            .then(() => {
                DonatorRefetch()
                if (stats === 'done') {
                    axiosSec.patch(`/requests/${data.ReqID}`, { donationStatus: stats })
                        .then(() => {
                            refetch()
                            Swal.fire({
                                title: "Donation Completed!",
                                text: "Thanks For your kindness",
                                icon: "success"
                            });
                        })
                }
                else {
                    axiosSec.patch(`/requests/${data.ReqID}`, { donationStatus: stats })
                        .then(() => {
                            refetch()
                            Swal.fire({
                                title: "Donation Canceled!",
                                text: "Thanks For your interest",
                                icon: "info"
                            });
                        })
                }
            })
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white">
                <Welcome />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 w-[95%] mx-auto">
                {/* Card Component */}
                <div className="bg-white p-5 flex gap-4 items-center shadow-md rounded-lg">
                    <div className="p-3 bg-red-500 rounded-full">
                        <FaUsers className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-lg font-medium">Total Users</h1>
                        <h1 className="text-3xl font-bold">
                            <SlotCounter value={Alluser.length} />
                        </h1>
                    </div>
                </div>
                <div className="bg-white p-5 flex gap-4 items-center shadow-md rounded-lg">
                    <div className="p-3 bg-red-500 rounded-full">
                        <FaHandHoldingUsd className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-lg font-medium">Total Fundings</h1>
                        <h1 className="text-3xl font-bold">
                            $<SlotCounter value={totalFund} />
                        </h1>
                    </div>
                </div>
                <div className="bg-white p-5 flex gap-4 items-center shadow-md rounded-lg">
                    <div className="p-3 bg-red-500 rounded-full">
                        <MdBloodtype className="text-white text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-lg font-medium">Total Donation Requests</h1>
                        <h1 className="text-3xl font-bold">
                            <SlotCounter value={AllReq.length} />
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-6">
                <div className="py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">My Recent Requests</h1>
                </div>
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <Thead>
                            <Tr>
                                <Th className="border border-gray-300 p-2">Rec. Name</Th>
                                <Th className="border border-gray-300 p-2">Rec. Location</Th>
                                <Th className="border border-gray-300 p-2">Donar Name</Th>
                                <Th className="border border-gray-300 p-2">Donar Email</Th>
                                <Th className="border border-gray-300 p-2">Donation Date</Th>
                                <Th className="border border-gray-300 p-2">Donation Time</Th>
                                <Th className="border border-gray-300 p-2">Group</Th>
                                <Th className="border border-gray-300 p-2">Status</Th>
                                <Th className="border border-gray-300 p-2">Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {RecentReq.map((data) => (
                                <Tr key={data._id}>
                                    <Td className="border border-gray-300 p-2">{data.recipientName}</Td>
                                    <Td className="border border-gray-300 p-2">
                                        {data.recipientUpazila}, {data.recipientDistrict}
                                    </Td>
                                    <Td className="border border-gray-300 p-2">{data.DonarName}</Td>
                                    <Td className="border border-gray-300 p-2">{data.DonorEmail}</Td>
                                    <Td className="border border-gray-300 p-2">{data.donationDate}</Td>
                                    <Td className="border border-gray-300 p-2">{data.donationTime}</Td>
                                    <Td className="border border-gray-300 p-2">{data.bloodGroup}</Td>
                                    <Td className="border border-gray-300 p-2">
                                        <div className="badge badge-warning">{data.donationStatus}</div>
                                    </Td>
                                    <Td className="border border-gray-300 p-2">
                                        <div className="flex gap-2 justify-center">
                                            <Link
                                                to={`/reqUpdate/${data._id}`}
                                                className="btn btn-xs bg-transparent hover:text-orange-500"
                                            >
                                                <MdEditSquare />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteReq(data._id)}
                                                className="btn btn-xs bg-transparent hover:text-red-500"
                                            >
                                                <MdDeleteForever />
                                            </button>
                                            <Link
                                                to={`/requestDtls/${data._id}`}
                                                className="btn btn-xs bg-transparent hover:text-red-500"
                                            >
                                                <BiSolidDetail />
                                            </Link>
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
                <div className="flex justify-center mt-4">
                    <Link
                        to="/dashboard/MyRequest"
                        className="btn border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                        View All Requests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 