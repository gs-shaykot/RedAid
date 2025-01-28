import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useAllReqs from '../Hooks/useAllReqs';
import { Link, NavLink } from 'react-router-dom';

const DonationRqst = () => {

    const { AllReq, isPending, refetch } = useAllReqs()

    const handleSeeDetails = () => {

    }

    return (
        <div className='container mx-auto my-24'>
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
                        AllReq?.map(data => (
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
                                <Td className='border border-gray-300 p-1'>
                                    <div className='badge badge-warning'>
                                        {data.donationStatus}
                                    </div>
                                </Td>
                                <Td className='border border-gray-300 p-1'>
                                    <div className='flex gap-2 justify-center items-center text-xl'>
                                        <Link to={`/requestDtls/${data._id}`} className='btn bg-red-500 text-white'>Details</Link>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </div>
    );
};

export default DonationRqst;