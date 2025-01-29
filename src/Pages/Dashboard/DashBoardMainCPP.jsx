import React, { useEffect, useState } from 'react';
import Welcome from './../../Components/Welcome';
import useRecentReq from './../../Hooks/useRecentReq';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import useDonating from '../../Hooks/useDonating';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { Link } from 'react-router-dom';
import useSecure from '../../Hooks/useSecure';
import Swal from 'sweetalert2';

const DashBoardMain = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const { RecentReq, isLoading, refetch } = useRecentReq()
    const { donating, isPending, refetch: DonatorRefetch, donarCount } = useDonating(currentPage, itemsPerPage)


    const axiosSec = useSecure()

    // PAGNIATION:  
    const NoOfPage = Math.ceil(donarCount / itemsPerPage)
    const pages = [...Array(NoOfPage).keys()]

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleItemChange = (e) => {
        const Num = parseInt(e.target.value) 
        setItemsPerPage(Num)
        setCurrentPage(0)
    }


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
    if (isPending) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome />
            </div>
            <div className='w-full box-border p-10 mx-auto bg-white shadow rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                {/* if Donating section */}
                {
                    donating.length > 0 ?

                        <div>
                            <div>
                                <h1 className='font-semibold text-3xl my-5'>Recently Donated</h1>
                            </div>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th className='border border-gray-300 p-1'>Rec. Name</Th>
                                        <Th className='border border-gray-300 p-1'>Rec. Location</Th>
                                        <Th className='border border-gray-300 p-1'>Req. Email</Th>
                                        <Th className='border border-gray-300 p-1'>Req. Name</Th>
                                        <Th className='border border-gray-300 p-1'>Donation Date</Th>
                                        <Th className='border border-gray-300 p-1'>Donation Time</Th>
                                        <Th className='border border-gray-300 p-1'>Group</Th>
                                        <Th className='border border-gray-300 p-1'>Status</Th>
                                        <Th className='border border-gray-300 p-1'>Activity</Th>
                                    </Tr>
                                </Thead>
                                <Tbody className='text-center'>
                                    {
                                        donating.map(data => (
                                            <Tr key={data._id} >
                                                <Td className='border border-gray-300 p-1'>{data.recipientName}</Td>
                                                <Td className='border border-gray-300 p-1'>
                                                    <div className='flex gap-1'>
                                                        <p>{data.recipientUpazila}</p>
                                                        <p>{data.recipientDistrict}</p>
                                                    </div>
                                                </Td>
                                                <Td className='border border-gray-300 p-1'>{data.requesterEmail}</Td>
                                                <Td className='border border-gray-300 p-1'>{data.requesterName}</Td>
                                                <Td className='border border-gray-300 p-1'>{data.donationDate}</Td>
                                                <Td className='border border-gray-300 p-1'>{data.donationTime}</Td>
                                                <Td className='border border-gray-300 p-1'>{data.bloodGroup}</Td>
                                                <Td className='border border-gray-300 p-1'>
                                                    <div className='badge badge-warning'>
                                                        {data.donationStatus}
                                                    </div>
                                                </Td>
                                                {
                                                    data.donationStatus === 'inprogress' ?
                                                        <Td className='border border-gray-300 p-1 text-center relative'>
                                                            <div className="flex gap-2 justify-center items-center">
                                                                <div className="lg:tooltip" data-tip="Done">
                                                                    <button
                                                                        onClick={() => handleStatusChange(data, "done")}
                                                                        className="btn bg-transparent border-2 border-red-500">
                                                                        <IoCheckmarkDoneSharp className='text-xl'></IoCheckmarkDoneSharp>
                                                                    </button>
                                                                </div>
                                                                <div className="lg:tooltip" data-tip="Cancel">
                                                                    <button
                                                                        onClick={() => handleStatusChange(data, "cancel")}
                                                                        className="btn bg-transparent border-2 border-red-500">
                                                                        <MdOutlineCancelPresentation className='text-xl'></MdOutlineCancelPresentation>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Td> :
                                                        <Td className='border border-gray-300 p-1'>
                                                            <Link to={`/requestDtls/${data.ReqID}`} className='text-lg flex justify-center items-center'>
                                                                <BiSolidDetail></BiSolidDetail>
                                                            </Link>
                                                        </Td>
                                                }
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                            <div >
                                <div className='flex justify-center my-4 gap-3'>
                                    <button onClick={handlePrev} className='btn'>Prev</button>
                                    {
                                        pages.map(page => (
                                            <button
                                                onClick={() => setCurrentPage(page)}
                                                className={currentPage === page ? 'selected join-item btn btn-square' : 'join-item btn btn-square'}
                                                key={page}>{page + 1}</button>
                                        ))
                                    }
                                    <button onClick={handleNext} className='btn'>Next</button>
                                    <select defaultValue={10} className='select select-info' onChange={handleItemChange}>
                                        <option disabled>Select</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                }


                {/* My Recent Requests */}


                <div>
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
        </div >
    );
};

export default DashBoardMain;