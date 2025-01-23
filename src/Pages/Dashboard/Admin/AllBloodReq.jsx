// place a counter on the table in TH
import React, { useState } from 'react';
import Welcome from '../../../Components/Welcome';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import Swal from 'sweetalert2';
import useSecure from '../../../Hooks/useSecure';
import { Link } from 'react-router-dom';
import { BiSolidDetail } from "react-icons/bi";
import useAllReqs from '../../../Hooks/useAllReqs';

const AllBloodReq = () => {
    const [donationStatus, setDonationStatus] = useState('');
    const [AllReq, isPending, refetch] = useAllReqs(donationStatus)
    const axiosSec = useSecure()

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

    const handleStatusChange = (event) => {
        setDonationStatus(event.target.value);
    };

    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome />
            </div>
            <div className='w-full box-border p-10 mx-auto bg-white shadow rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                <div className='py-6 flex justify-between  items-center'>
                    <div>
                        <h1 className='font-semibold text-3xl'>My All Requests</h1>
                    </div>
                    <div>
                        <select
                            className='select select-bordered w-48'
                            value={donationStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="">All</option>
                            <option value="done">
                                Done
                            </option>
                            <option value="pending">
                                Pending
                            </option>
                            <option value="cancel">
                                Cancel
                            </option>
                        </select>
                    </div>
                </div>
                {
                    isPending ? <span className="loading loading-dots loading-md"></span> : ''
                }
                <Table>
                    <Thead>
                        <Tr>
                            <Th className="border border-gray-300 p-1">Row No.</Th>
                            <Th className="border border-gray-300 p-1">Rec. Name</Th>
                            <Th className="border border-gray-300 p-1">Rec. Location</Th>
                            <Th className="border border-gray-300 p-1">Donor Name</Th>
                            <Th className="border border-gray-300 p-1">Donor Email</Th>
                            <Th className="border border-gray-300 p-1">Donation Date</Th>
                            <Th className="border border-gray-300 p-1">Donation Time</Th>
                            <Th className="border border-gray-300 p-1">Group</Th>
                            <Th className="border border-gray-300 p-1">Status</Th>
                            <Th className="border border-gray-300 p-1">Activity</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-center">
                        {AllReq.map((data, index) => (
                            <Tr key={data._id}>
                                <Td className="border border-gray-300 p-1">{index + 1}</Td>
                                <Td className="border border-gray-300 p-1">{data.recipientName}</Td>
                                <Td className="border border-gray-300 p-1">
                                    <div className="flex gap-1">
                                        <p>{data.recipientUpazila}</p>, <p>{data.recipientDistrict}</p>
                                    </div>
                                </Td>
                                <Td className="border border-gray-300 p-1">{data.DonarName}</Td>
                                <Td className="border border-gray-300 p-1">{data.DonorEmail}</Td>
                                <Td className="border border-gray-300 p-1">{data.donationDate}</Td>
                                <Td className="border border-gray-300 p-1">{data.donationTime}</Td>
                                <Td className="border border-gray-300 p-1">{data.bloodGroup}</Td>
                                <Td className="border border-gray-300 p-1">
                                    <div className="badge badge-warning">{data.donationStatus}</div>
                                </Td>
                                <Td className="border border-gray-300 p-1">
                                    <div className="flex gap-2 justify-center items-center text-xl">
                                        <Link to={`/reqUpdate/${data._id}`} className="btn bg-transparent">
                                            <MdEditSquare className="text-orange-500 text-xl" />
                                        </Link>
                                        <button className="btn bg-transparent" onClick={() => handleDeleteReq(data._id)}>
                                            <MdDeleteForever className="text-red-500 text-xl" />
                                        </button>
                                        <Link to={`/requestDtls/${data._id}`} className="btn bg-transparent text-lg flex justify-center items-center">
                                            <BiSolidDetail className="text-red-500 text-xl" />
                                        </Link>
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                <div className='flex justify-center my-4'>
                    <h1>ToDo: Pagination goes here</h1>
                </div>
            </div>
        </div>
    );
};

export default AllBloodReq; 