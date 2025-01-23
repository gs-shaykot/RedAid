// place a counter on the table in TH
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

const AdminDashboard = () => {
    const [Alluser] = useAllUser()
    const [AllReq] = useAllReqs()
    const { RecentReq, isLoading, refetch } = useRecentReq()
    return (
        <div className='bg-gray-100 h-screen'>
            <div className='bg-white'>
                <Welcome />
            </div>
            <div className='grid grid-cols-3 gap-3 mt-5 w-[95%] box-border mx-auto '>
                <div className='bg-white p-5 flex gap-3 items-center'>
                    <div className='p-2 bg-red-500 rounded-full'>
                        <FaUsers className='text-white text-xl' />
                    </div>
                    <div>
                        <h1 className='font-medium text-'>Total Users</h1>
                        <h1 className='text-2xl font-bold'>
                            <SlotCounter value={Alluser.length} />
                        </h1>
                    </div>
                </div>
                <div className='bg-white p-5 flex gap-3 items-center'>
                    <div className='p-2 bg-red-500 rounded-full'>
                        <FaHandHoldingUsd className='text-white text-xl' />
                    </div>
                    <div>
                        <h1 className='font-medium text-'>Total Fundings</h1>
                        <h1 className='text-2xl font-bold'>
                            $<SlotCounter value={123456} />
                        </h1>
                    </div>
                </div>
                <div className='bg-white p-5 flex gap-3 items-center'>
                    <div className='p-2 bg-red-500 rounded-full'>
                        <MdBloodtype className='text-white text-xl' />
                    </div>
                    <div>
                        <h className='font-medium text-'>Total Donation Requests</h>
                        <h1 className='text-2xl font-bold'>
                            <SlotCounter value={AllReq.length} />
                        </h1>
                    </div>
                </div>
            </div>
            <div className='container mx-auto px-5'>
                <div className='py-6 flex justify-between'>
                    <div>
                        <h1 className='font-semibold text-3xl'>My Recent Requests</h1>
                    </div>
                    <div>
                        <h1> Pagination Design & Filter here </h1>
                    </div>
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th className='border border-gray-300 p-1'>Rec. Name</Th>
                            <Th className='border border-gray-300 p-1'>Rec. Location</Th>
                            <Th className='border border-gray-300 p-1'>Donar Name</Th>
                            <Th className='border border-gray-300 p-1'>Donar Email</Th>
                            <Th className='border border-gray-300 p-1'>Donation Date</Th>
                            <Th className='border border-gray-300 p-1'>Donation Time</Th>
                            <Th className='border border-gray-300 p-1'>Group</Th>
                            <Th className='border border-gray-300 p-1'>Status</Th>
                            <Th className='border border-gray-300 p-1'>Activity</Th>
                        </Tr>
                    </Thead>
                    <Tbody className='text-center'>
                        {
                            RecentReq.map(data => (
                                <Tr key={data._id}>
                                    <Td className='border border-gray-300 p-1'>{data.recipientName}</Td>
                                    <Td className='border border-gray-300 p-1'>
                                        <div className='flex gap-1'>
                                            <p>{data.recipientUpazila}</p>,
                                            <p>{data.recipientDistrict}</p>
                                        </div>
                                    </Td>
                                    <Td className='border border-gray-300 p-1'>{data.DonarName}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.DonorEmail}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.donationDate}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.donationTime}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.bloodGroup}</Td>
                                    <Td className='border border-gray-300 p-1'>
                                        <div className='badge badge-warning'>
                                            {data.donationStatus}
                                        </div>
                                    </Td>
                                    <Td className='border border-gray-300 p-1'>
                                        <div className='flex gap-2 justify-center items-center text-xl'>
                                            <Link to={`/reqUpdate/${data._id}`} className="btn bg-transparent ">
                                                <MdEditSquare className='text-orange-500 text-xl' />
                                            </Link>
                                            <button className='btn bg-transparent ' onClick={() => handleDeleteReq(data._id)} >
                                                <MdDeleteForever className='text-red-500 text-xl' />
                                            </button>
                                            <Link to={`/requestDtls/${data._id}`} className='btn bg-transparent text-lg flex justify-center items-center'>
                                                <BiSolidDetail className='text-red-500 text-xl' ></BiSolidDetail>
                                            </Link>
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </div>
            <div>
                <Link to='/dashboard/MyRequest' className='flex justify-center items-center pt-5'>
                    <h1 className='btn bg-transparent hover:bg-red-500 hover:text-white border-1 border-red-500'>View All Request</h1>
                </Link>
            </div>
        </div >
    );
};

export default AdminDashboard; 