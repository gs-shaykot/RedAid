// make a tool
import React, { useState } from 'react';
import Welcome from '../../../Components/Welcome';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever, MdEditSquare } from 'react-icons/md';
import { TiFlowSwitch } from "react-icons/ti";
import Swal from 'sweetalert2';
import useSecure from '../../../Hooks/useSecure';
import { Link } from 'react-router-dom';
import { BiSolidDetail } from 'react-icons/bi';
import useAllReqs from '../../../Hooks/useAllReqs';
import { GrTooltip } from 'react-icons/gr';
import useVolunteer from '../../../Hooks/useisVolunteer';

const AllBloodReq = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const [donationStatus, setDonationStatus] = useState('');
    const { AllReq, totalCount, isPending, refetch } = useAllReqs(donationStatus, currentPage, itemsPerPage);
    const axiosSec = useSecure();
    const NoOfPage = Math.ceil(totalCount / itemsPerPage);
    const pages = [...Array(NoOfPage).keys()];
    const [isVolunteer] = useVolunteer();

    const handlePrev = () => currentPage > 0 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < pages.length - 1 && setCurrentPage(currentPage + 1);
    const handleItemChange = (e) => setItemsPerPage(parseInt(e.target.value));

    const handleDeleteReq = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSec.delete(`/requests/${id}`).then(() => {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    refetch();
                });
            }
        });
    };

    const handleStatusChange = (event) => setDonationStatus(event.target.value);
    const handleStatusUpdate = ({ id, stats }) => {
        axiosSec.patch(`/requests/${id}`, { donationStatus: stats }).then(() => {
            Swal.fire("Status Changed!", "Status has been updated.", "success");
            refetch();
        });
    };

    return (
        <div className="bg-gray-100 px-5">
            <Welcome />
            <div className="w-full mx-auto bg-white shadow rounded-md p-4">
                <div className="h-28 bg-gradient-to-r from-red-500 to-pink-500 rounded-t-md"></div>
                <div className="flex flex-wrap justify-between items-center py-4 gap-4">
                    <h1 className="text-2xl font-semibold">My All Requests</h1>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={donationStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="">All</option>
                        <option value="done">Done</option>
                        <option value="pending">Pending</option>
                        <option value="cancel">Cancel</option>
                    </select>
                </div>
                {isPending && <span className="loading loading-dots loading-md"></span>}
                <div className="overflow-x-auto">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Rec. Name</Th>
                                <Th>Rec. Location</Th>
                                <Th>Donor Name</Th>
                                <Th>Donor Email</Th>
                                <Th>Donation Date</Th>
                                <Th>Donation Time</Th>
                                <Th>Group</Th>
                                <Th>Status</Th>
                                <Th>Activity</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {AllReq.map((data, index) => (
                                <Tr key={data._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{data.recipientName}</Td>
                                    <Td>
                                        {data.recipientUpazila}, {data.recipientDistrict}
                                    </Td>
                                    <Td>{data.DonarName}</Td>
                                    <Td>{data.DonorEmail}</Td>
                                    <Td>{data.donationDate}</Td>
                                    <Td>{data.donationTime}</Td>
                                    <Td>{data.bloodGroup}</Td>
                                    <Td>
                                        <span className="badge badge-warning">{data.donationStatus}</span>
                                    </Td>
                                    <Td>
                                        <div className="flex flex-wrap gap-2 justify-center items-center">
                                            {!isVolunteer && (
                                                <>
                                                    <Link to={`/reqUpdate/${data._id}`} className="text-orange-500">
                                                        <MdEditSquare />
                                                    </Link>
                                                    <button onClick={() => handleDeleteReq(data._id)} className="text-red-500">
                                                        <MdDeleteForever />
                                                    </button>
                                                </>
                                            )}

                                            <Link to={`/requestDtls/${data._id}`} className="text-red-500">
                                                <BiSolidDetail />
                                            </Link>
                                        </div>
                                        <div className="tooltip-container3">
                                            <TiFlowSwitch
                                                id='tooltip3'
                                                className='text-xl text-red-500 cursor-pointer'
                                            />
                                            <div className="tooltip-content3">
                                                <div className="flex flex-col gap-2 justify-center">
                                                    <button onClick={()=>handleStatusUpdate({id:data._id,stats:'pending'})} className='btn-xs btn'>Pending</button>
                                                    <button onClick={()=>handleStatusUpdate({id:data._id,stats:'done'})} className='btn-xs btn'>Done</button>
                                                    <button onClick={()=>handleStatusUpdate({id:data._id,stats:'cancel'})} className='btn-xs btn'>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="flex flex-wrap gap-2 justify-center items-center">
                                            {!isVolunteer && (
                                                <>
                                                    <Link to={`/reqUpdate/${data._id}`} className="text-orange-500">
                                                        <MdEditSquare />
                                                    </Link>
                                                    <button onClick={() => handleDeleteReq(data._id)} className="text-red-500">
                                                        <MdDeleteForever />
                                                    </button>
                                                </>
                                            )}
                                             
                                            <Link to={`/requestDtls/${data._id}`} className="text-red-500">
                                                <BiSolidDetail />
                                            </Link>
                                        </div> */}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 py-4">
                    <button onClick={handlePrev} className="btn">
                        Prev
                    </button>
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn ${currentPage === page ? 'btn-primary' : ''}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button onClick={handleNext} className="btn">
                        Next
                    </button>
                    <select defaultValue={10} onChange={handleItemChange} className="select select-bordered">
                        <option value="5">5</option>
                        <option value="10" defaultValue>
                            10
                        </option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AllBloodReq;
