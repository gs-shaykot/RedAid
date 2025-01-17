import React from 'react';
import Welcome from './../../Components/Welcome';
import useRecentReq from './../../Hooks/useRecentReq';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

const DashBoardMain = () => {
    const { RecentReq, isLoading, refetch } = useRecentReq()
    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome />
            </div>
            <div className='w-full box-border p-10 mx-auto bg-white shadow rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                <div className='py-6'>
                    <div>
                        <h1 className='font-semibold text-3xl'>My Recent Requests</h1>
                    </div>
                    <div>
                        {/* Pagination Design & Filter here */}
                    </div>
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th className='border border-gray-300 p-1'>Rec. Name</Th>
                            <Th className='border border-gray-300 p-1'>Rec. Location</Th>
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
                                            <p>{data.recipientUpazila}</p>
                                            <p>{data.recipientDistrict}</p>
                                        </div>
                                    </Td>
                                    <Td className='border border-gray-300 p-1'>{data.donationDate}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.donationTime}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.bloodGroup}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.donationStatus}</Td>
                                    <Td className='border border-gray-300 p-1'>
                                        <div className='flex gap-2 justify-center items-center text-xl'>
                                            <MdEditSquare className='text-orange-500'/>
                                            <MdDeleteForever className='text-red-500'/>
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </div>
        </div>
    );
};

export default DashBoardMain;