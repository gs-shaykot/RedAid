import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tbody, Th, Thead, Tr, Td } from 'react-super-responsive-table';
import Welcome from '../../../Components/Welcome';
import useBlogs from '../../../Hooks/useBlogs';
import { GrTooltip } from 'react-icons/gr';
import useSecure from '../../../Hooks/useSecure';
import Swal from 'sweetalert2';

const ContentMng = () => {

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)


    const [blogStatus, setBlogStatus] = useState();
    const { AllBlogs, blogCount, isPending, refetch } = useBlogs(blogStatus, currentPage, itemsPerPage);
    const axiosSec = useSecure()

    if (isPending) {
        return <span className="loading loading-dots loading-lg"></span>
    }
    // PAGNIATION:  
    const NoOfPage = Math.ceil(blogCount / itemsPerPage)
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
        console.log(Num)
        setItemsPerPage(Num)
        setCurrentPage(0)
    }

    const handleStatusChange = (e) => {
        setBlogStatus(e.target.value);
    };

    const handlePublish = ({ id, action }) => {
        axiosSec.patch(`/blogs/${id}`, { blogStatus: action })
            .then(() => {
                Swal.fire({
                    title: "Successfull",
                    text: `${action} successfull`,
                    icon: "success"
                });
                refetch()
            })
    }

    const handleDelete = (id) => {
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
                axiosSec.delete(`/blogs/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Successfull",
                            text: `Deletion successfull`,
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });
    }

    // const handleUpdate = (id) => {
    //     const updatedPost = {

    //     }
    //     axiosSec.patch(`/blogs/${id}`, updatedPost)
    //         .then(() => {
    //             Swal.fire({
    //                 title: "Successfull",
    //                 text: `Deletion successfull`,
    //                 icon: "success"
    //             });
    //             refetch()
    //         })
    // }

    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome />
            </div>
            <div className='w-full box-border p-10 mx-auto bg-white shadow rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                <div className='py-6 flex justify-between'>
                    <div>
                        <h1 className='font-semibold text-3xl'>All Blogs</h1>
                    </div>
                    <div>
                        <select
                            className='select select-bordered w-48'
                            value={blogStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="">All</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th className='border border-gray-300 p-1'>Blog No.</Th>
                            <Th className='border border-gray-300 p-1'>Blog Image</Th>
                            <Th className='border border-gray-300 p-1'>Blog Title</Th>
                            <Th className='border border-gray-300 p-1'>Created Date</Th>
                            <Th className='border border-gray-300 p-1'>Publisher Name</Th>
                            <Th className='border border-gray-300 p-1'>Publisher Email</Th>
                            <Th className='border border-gray-300 p-1'>Status</Th>
                            <Th className='border border-gray-300 p-1'>Activity</Th>
                        </Tr>
                    </Thead>

                    <Tbody className="text-center">
                        {AllBlogs.map((data, index) => (
                            <Tr key={data._id}>
                                <Td className="border border-gray-300 p-1">{index + 1}</Td>
                                <Td className="border border-gray-300 p-1"><img src={data.image} alt={data.title} className="w-16 h-16 object-cover" /></Td>
                                <Td className="border border-gray-300 p-1">{data.title}</Td>
                                <Td className="border border-gray-300 p-1">{data.postedDate}</Td>
                                <Td className="border border-gray-300 p-1">{data.PosterName}</Td>
                                <Td className="border border-gray-300 p-1">{data.PosterEmail}</Td>
                                <Td className="border border-gray-300 p-1">{data.blogStatus}</Td>
                                <Td className='border border-gray-300 p-1 text-center relative'>
                                    <div className="tooltip-container">
                                        <GrTooltip
                                            id='tooltip'
                                            className='text-xl text-red-500 cursor-pointer'
                                        />
                                        <div className="tooltip-content">
                                            <div className="flex flex-col gap-2 justify-center">
                                                {data.blogStatus === 'draft' ? (
                                                    <button
                                                        onClick={() => handlePublish({ id: data._id, action: "published" })}
                                                        className='btn btn-xs bg-transparent border-2 border-red-500'
                                                    >
                                                        Publish
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePublish({ id: data._id, action: "draft" })}
                                                        className='btn btn-xs bg-red-500 text-white'
                                                    >
                                                        Draft
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(data._id)}
                                                    className='btn btn-xs bg-red-500 text-white'
                                                >Delete</button>
                                                <Link to={`/dashboard/Editblog/${data._id}`}
                                                    className='btn btn-xs bg-red-500 text-white'
                                                >Edit Blog</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <div className='flex justify-between gap-3'>
                    <Link to='/dashboard/addBlog' className='flex justify-center items-center pt-5'>
                        <h1 className='btn bg-transparent hover:bg-red-500 hover:text-white border-1 border-red-500'>Post a Blog</h1>
                    </Link>                 <div >
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
            </div>
        </div>
    );
};

export default ContentMng;
