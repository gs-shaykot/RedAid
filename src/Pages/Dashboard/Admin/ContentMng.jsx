import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tbody, Th, Thead, Tr, Td } from 'react-super-responsive-table';
import Welcome from '../../../Components/Welcome';
import useBlogs from '../../../Hooks/useBlogs';
import { GrTooltip } from 'react-icons/gr';
import useSecure from '../../../Hooks/useSecure';
import Swal from 'sweetalert2';
import useVolunteer from './../../../Hooks/useisVolunteer';

const ContentMng = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [blogStatus, setBlogStatus] = useState();
  const { AllBlogs, blogCount, isPending, refetch } = useBlogs(blogStatus, currentPage, itemsPerPage);
  const axiosSec = useSecure();
  const [isVolunteer] = useVolunteer();

  if (isPending) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const NoOfPage = Math.ceil(blogCount / itemsPerPage);
  const pages = [...Array(NoOfPage).keys()];

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemChange = (e) => {
    const Num = parseInt(e.target.value);
    setItemsPerPage(Num);
    setCurrentPage(0);
  };

  const handleStatusChange = (e) => {
    setBlogStatus(e.target.value);
  };

  const handlePublish = ({ id, action }) => {
    axiosSec.patch(`/blogs/${id}`, { blogStatus: action }).then(() => {
      Swal.fire({
        title: "Success",
        text: `${action} successful`,
        icon: "success",
      });
      refetch();
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSec.delete(`/blogs/${id}`).then(() => {
          Swal.fire({
            title: "Success",
            text: `Deletion successful`,
            icon: "success",
          });
          refetch();
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-10">
      <div>
        <Welcome />
      </div>
      <div className="max-w-7xl mx-auto bg-white shadow rounded-md overflow-hidden">
        <div className="liear-bg w-full h-28 rounded-t-md"></div>
        <div className="py-6 px-4 sm:px-6 flex flex-wrap justify-between items-center gap-4">
          <h1 className="font-semibold text-2xl sm:text-3xl">All Blogs</h1>
          <select
            className="select select-bordered w-full sm:w-48"
            value={blogStatus}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Table className="w-full text-sm">
          <Thead>
            <Tr>
              <Th className="border border-gray-300 px-2 py-1">Blog No.</Th>
              <Th className="border border-gray-300 px-2 py-1">Blog Image</Th>
              <Th className="border border-gray-300 px-2 py-1">Blog Title</Th>
              <Th className="border border-gray-300 px-2 py-1">Created Date</Th>
              <Th className="border border-gray-300 px-2 py-1">Publisher Name</Th>
              <Th className="border border-gray-300 px-2 py-1">Publisher Email</Th>
              <Th className="border border-gray-300 px-2 py-1">Status</Th>
              <Th className="border border-gray-300 px-2 py-1">Activity</Th>
            </Tr>
          </Thead>
          <Tbody className="text-center">
            {AllBlogs.map((data, index) => (
              <Tr key={data._id}>
                <Td className="border border-gray-300 px-2 py-1">{index + 1}</Td>
                <Td className="border border-gray-300 px-2 py-1">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </Td>
                <Td className="border border-gray-300 px-2 py-1">{data.title}</Td>
                <Td className="border border-gray-300 px-2 py-1">{data.postedDate}</Td>
                <Td className="border border-gray-300 px-2 py-1">{data.PosterName}</Td>
                <Td className="border border-gray-300 px-2 py-1">{data.PosterEmail}</Td>
                <Td className="border border-gray-300 px-2 py-1">{data.blogStatus}</Td>
                <Td className="border border-gray-300 px-2 py-1 text-center relative">
                  <div className="flex flex-col gap-2 justify-center">
                    {!isVolunteer && (
                      <>
                        {data.blogStatus === 'draft' ? (
                          <button
                            onClick={() => handlePublish({ id: data._id, action: 'published' })}
                            className="btn btn-xs bg-transparent border-2 border-red-500"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePublish({ id: data._id, action: 'draft' })}
                            className="btn btn-xs bg-red-500 text-white"
                          >
                            Draft
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="btn btn-xs bg-red-500 text-white"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <Link
                      to={`/dashboard/Editblog/${data._id}`}
                      className="btn btn-xs bg-red-500 text-white"
                    >
                      Edit Blog
                    </Link>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-6">
          <Link
            to="/dashboard/addBlog"
            className="btn bg-transparent hover:bg-red-500 hover:text-white border border-red-500 px-4 py-2"
          >
            Post a Blog
          </Link>
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <button onClick={handlePrev} className="btn">Prev</button>
            {pages.map((page) => (
              <button
                onClick={() => setCurrentPage(page)}
                className={`join-item btn btn-square ${currentPage === page ? 'selected' : ''}`}
                key={page}
              >
                {page + 1}
              </button>
            ))}
            <button onClick={handleNext} className="btn">Next</button>
            <select
              defaultValue={10}
              className="select select-info"
              onChange={handleItemChange}
            >
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
  );
};

export default ContentMng;
