import React, { useState } from 'react';
import Welcome from '../../../Components/Welcome';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import useRequests from '../../../Hooks/useRequests';
import Swal from 'sweetalert2';
import useSecure from '../../../Hooks/useSecure';
import { Link } from 'react-router-dom';
import { BiSolidDetail } from "react-icons/bi";

const MyRequest = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [donationStatus, setDonationStatus] = useState('');
    const { Requests, rqstCount, isPending, refetch } = useRequests(donationStatus, currentPage, itemsPerPage);
    console.log(Requests)
    const axiosSec = useSecure();
    const NoOfPage = Math.ceil(rqstCount / itemsPerPage);
    const pages = [...Array(NoOfPage).keys()];

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    };

    const handleItemChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

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
                axiosSec.delete(`/requests/${id}`).then(() => {
                    Swal.fire("Deleted!", "Your request has been deleted.", "success");
                    refetch();
                });
            }
        });
    };

    const handleStatusChange = (event) => {
        setDonationStatus(event.target.value);
    };

    return (
        <div className="bg-gray-100 px-4 sm:px-6 lg:px-10">
            <div>
                <Welcome />
            </div>
            <div className="w-full box-border p-5 sm:p-10 mx-auto bg-white shadow rounded-md">
                <div className="liear-bg w-full h-20 sm:h-28 rounded-t-md"></div>
                <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl">My All Requests</h1>
                    <select
                        className="select select-bordered w-full sm:w-48"
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
                <Table className="w-full">
                    <Thead>
                        <Tr>
                            {["Rec. Name", "Rec. Location", "Donar Name", "Donar Email", "Donation Date", "Donation Time", "Group", "Status", "Activity"].map((header) => (
                                <Th key={header} className="border border-gray-300 p-2 text-xs md:text-sm">{header}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody className="text-center">
                        {Requests.map(data => (
                            <Tr key={data._id}>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">{data.recipientName}</Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">
                                    <div className="flex flex-col md:flex-row gap-1 text-xs md:text-sm">
                                        <p>{data.recipientUpazila}</p>, <p>{data.recipientDistrict}</p>
                                    </div>
                                </Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">{data.DonarName}</Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">{data.DonorEmail}</Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">{data.donationDate}</Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">{data.donationTime}</Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">{data.bloodGroup}</Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">
                                    <div className="badge badge-warning">{data.donationStatus}</div>
                                </Td>
                                <Td className="border border-gray-300 p-2 text-xs md:text-sm">
                                    <div className="flex flex-wrap gap-2 justify-center items-center text-xl">
                                        <Link to={`/reqUpdate/${data._id}`} className="btn bg-transparent">
                                            <MdEditSquare className="text-orange-500" />
                                        </Link>
                                        <button className="btn bg-transparent" onClick={() => handleDeleteReq(data._id)}>
                                            <MdDeleteForever className="text-red-500" />
                                        </button>
                                        <Link to={`/requestDtls/${data._id}`} className="btn bg-transparent">
                                            <BiSolidDetail className="text-red-500" />
                                        </Link>
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
                    <div className="flex gap-3">
                        <button onClick={handlePrev} className="btn  btn-xs md:btn">Prev</button>
                        {pages.map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={currentPage === page ? 'btn btn-xs md:btn  bg-red-500 text-white' : 'btn btn-xs md:btn'}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button onClick={handleNext} className="btn  btn-xs md:btn">Next</button>
                    </div>
                    <select defaultValue={10} className="select select-info" onChange={handleItemChange}>
                        <option disabled>Select</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MyRequest;
