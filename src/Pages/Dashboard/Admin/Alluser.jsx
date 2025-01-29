// make this page
import React, { useState } from 'react';
import Welcome from '../../../Components/Welcome';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useAllUser from '../../../Hooks/useAllUser';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { GrTooltip } from 'react-icons/gr';
import useAdmin from '../../../Hooks/useisAdmin';
import useSecure from '../../../Hooks/useSecure';
import Swal from 'sweetalert2';
import useVolunteer from '../../../Hooks/useisVolunteer';

const Alluser = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    const [statusFilter, setStatusFilter] = useState('')
    const { Alluser, userCount, isPending, refetch } = useAllUser(statusFilter, currentPage, itemsPerPage);
    const [isAdmin] = useAdmin();
    const axiosSec = useSecure();
    const [isVolunteer] = useVolunteer()

    if (isPending) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    // PAGNIATION:  
    const NoOfPage = Math.ceil(userCount / itemsPerPage)
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

    const handleStatus = ({ id, action }) => {
        if (action === 'blocked' || action === 'active') {
            axiosSec.patch(`/users/${id}`, { status: action })
                .then(() => {
                    Swal.fire({
                        title: "Successfull",
                        text: `${action} successfull`,
                        icon: "success"
                    });
                    refetch()
                })
        }
        else {
            axiosSec.patch(`/users/${id}`, { role: action })
                .then(() => {
                    Swal.fire({
                        title: "Successfull",
                        text: `${action} successfull`,
                        icon: "success"
                    });
                    refetch()
                })
        }
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value)
    }

    return (
        <div className='bg-gray-100 px-5 pb-10'>
            <div>
                <Welcome />
            </div>
            <div className='w-full mx-auto bg-white shadow rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                <div className='p-5'>
                    <div className='flex flex-col md:flex-row mb-4 justify-between items-center'>
                        <h1 className='font-semibold text-3xl my-5'>All Users</h1>
                        <div>
                            <select
                                className='select select-bordered w-48'
                                value={statusFilter}
                                onChange={handleStatusChange}
                            >
                                <option value="">All</option>
                                <option value="active">
                                    Active
                                </option>
                                <option value="blocked">
                                    Blocked
                                </option>
                            </select>
                        </div>
                        {
                            isPending ? <span className="loading loading-dots loading-md"></span> : ''
                        }
                    </div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th className='border border-gray-300 p-1'>User Avatar</Th>
                                <Th className='border border-gray-300 p-1'>User Email</Th>
                                <Th className='border border-gray-300 p-1'>User Name</Th>
                                <Th className='border border-gray-300 p-1'>User Role</Th>
                                <Th className='border border-gray-300 p-1'>Status</Th>
                                <Th className='border border-gray-300 p-1'>Activity</Th>
                            </Tr>
                        </Thead>
                        <Tbody className='text-center'>
                            {Alluser.map((data) => (
                                <Tr key={data._id}>
                                    <Td className='border border-gray-300 p-1'>
                                        <img className='w-10 h-10' src={data.image} alt="User Avatar" />
                                    </Td>
                                    <Td className='border border-gray-300 p-1'>{data.email}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.name}</Td>
                                    <Td className='border border-gray-300 p-1'>{data.role}</Td>
                                    <Td className='border border-gray-300 p-1'>
                                        <div
                                            className={
                                                data.status !== 'blocked'
                                                    ? 'badge badge-warning bg-green-500'
                                                    : 'badge badge-warning bg-red-500 text-white'
                                            }
                                        >
                                            {data.status}
                                        </div>
                                    </Td>
                                    {data.donationStatus === 'inprogress' ? (
                                        <Td className='border border-gray-300 p-1 text-center relative'>
                                            <div className="flex gap-2 justify-center items-center">
                                                <div className="lg:tooltip" data-tip="Done">
                                                    <button className="btn bg-transparent border-2 border-red-500">
                                                        <IoCheckmarkDoneSharp className='text-xl' />
                                                    </button>
                                                </div>
                                                <div className="lg:tooltip" data-tip="Cancel">
                                                    <button className="btn bg-transparent border-2 border-red-500">
                                                        <MdOutlineCancelPresentation className='text-xl' />
                                                    </button>
                                                </div>
                                            </div>
                                        </Td>
                                    ) : (
                                        <Td className='border border-gray-300 p-1 text-center relative'>
                                            <div className="tooltip-container2">
                                                <GrTooltip
                                                    id='tooltip2'
                                                    className='text-xl text-red-500 cursor-pointer'
                                                />
                                                <div className="tooltip-content2">
                                                    <div className="flex flex-col gap-2 justify-center">
                                                        {data.status === 'blocked' ? (
                                                            <button
                                                                onClick={() => handleStatus({ id: data._id, action: 'active' })}
                                                                className='btn btn-xs bg-transparent border-2 border-red-500'
                                                            >
                                                                Unblock
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleStatus({ id: data._id, action: 'blocked' })}
                                                                className='btn btn-xs bg-red-500 text-white'
                                                            >
                                                                Block
                                                            </button>
                                                        )}
                                                        {(!isVolunteer && data.status !== 'blocked') && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleStatus({ id: data._id, action: 'volunteer' })}
                                                                    className='btn btn-xs bg-transparent border-2 border-red-500'
                                                                >
                                                                    Make Volunteer
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatus({ id: data._id, action: 'admin' })}
                                                                    className='btn btn-xs bg-transparent border-2 border-red-500'
                                                                >
                                                                    Make Admin
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Td>
                                    )}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <div >
                        <div className='flex flex-wrap justify-center items-center gap-4 py-4'>
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
            </div>
        </div>
    );
};

export default Alluser;
