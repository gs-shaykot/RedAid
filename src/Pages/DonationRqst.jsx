import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useAllReqs from '../Hooks/useAllReqs';
import { Link, NavLink } from 'react-router-dom';
import useDonationRqst from '../Hooks/useDonationRqst';

const DonationRqst = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const { DonationRqst, totalCount, isPending, refetch } = useDonationRqst(currentPage, itemsPerPage)
    console.log("filtered: ", DonationRqst.length)
    // PAGNIATION:  
    const NoOfPage = Math.ceil(totalCount / itemsPerPage)
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
    return (
        <div className='container mx-auto my-24 w-11/12 md:w-auto'>
            {
                isPending ?
                    <div className='w-full h-screen flex justify-center items-center'>
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                    :
                    <>
                        <Table >
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
                                    DonationRqst?.map(data => (
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
                    </>

            }
        </div>
    );
};

export default DonationRqst;