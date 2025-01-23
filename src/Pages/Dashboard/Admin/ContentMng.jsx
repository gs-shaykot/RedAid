import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Tbody, Th, Thead, Tr, Td } from 'react-super-responsive-table';
import Welcome from '../../../Components/Welcome';

const ContentMng = () => {
    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome />
            </div>
            <div className='w-full box-border p-10 mx-auto bg-white shadow rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                <div className='py-6 flex justify-between'>
                    <div>
                        <h1 className='font-semibold text-3xl'>My Recent Requests</h1>
                    </div>
                    <div>
                        <h1> Pagination Design & Filter here </h1>
                    </div>
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th className='border border-gray-300 p-1'>Blog Image</Th>
                            <Th className='border border-gray-300 p-1'>Blog Title</Th>
                            <Th className='border border-gray-300 p-1'>Created Date</Th>
                            <Th className='border border-gray-300 p-1'>Publisher Name</Th>
                            <Th className='border border-gray-300 p-1'>Publisher Email</Th>
                            <Th className='border border-gray-300 p-1'>Publisher Role</Th>
                            <Th className='border border-gray-300 p-1'>Activity</Th>
                        </Tr>
                    </Thead>
                    <Tbody className='text-center'>
                        <Tr>
                            <Td className='border border-gray-300 p-1'>image pore</Td>
                            <Td className='border border-gray-300 p-1'>test 1</Td>
                            <Td className='border border-gray-300 p-1'>23/1/25</Td>
                            <Td className='border border-gray-300 p-1'>GS SHAYKOT</Td>
                            <Td className='border border-gray-300 p-1'>gsshaykot53@gmail.com</Td>
                            <Td className='border border-gray-300 p-1'>admin</Td>
                            <Td className='border border-gray-300 p-1'>
                                <div className='flex gap-2'>
                                    <button>Btn 1</button>
                                    <button>Btn 2</button>
                                    <button>Btn 3</button>
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td className='border border-gray-300 p-1'>image pore</Td>
                            <Td className='border border-gray-300 p-1'>test 1</Td>
                            <Td className='border border-gray-300 p-1'>23/1/25</Td>
                            <Td className='border border-gray-300 p-1'>GS SHAYKOT</Td>
                            <Td className='border border-gray-300 p-1'>gsshaykot53@gmail.com</Td>
                            <Td className='border border-gray-300 p-1'>admin</Td>
                            <Td className='border border-gray-300 p-1'>
                                <div className='flex gap-2'>
                                    <button>Btn 1</button>
                                    <button>Btn 2</button>
                                    <button>Btn 3</button>
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td className='border border-gray-300 p-1'>image pore</Td>
                            <Td className='border border-gray-300 p-1'>test 1</Td>
                            <Td className='border border-gray-300 p-1'>23/1/25</Td>
                            <Td className='border border-gray-300 p-1'>GS SHAYKOT</Td>
                            <Td className='border border-gray-300 p-1'>gsshaykot53@gmail.com</Td>
                            <Td className='border border-gray-300 p-1'>admin</Td>
                            <Td className='border border-gray-300 p-1'>
                                <div className='flex gap-2'>
                                    <button>Btn 1</button>
                                    <button>Btn 2</button>
                                    <button>Btn 3</button>
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td className='border border-gray-300 p-1'>image pore</Td>
                            <Td className='border border-gray-300 p-1'>test 1</Td>
                            <Td className='border border-gray-300 p-1'>23/1/25</Td>
                            <Td className='border border-gray-300 p-1'>GS SHAYKOT</Td>
                            <Td className='border border-gray-300 p-1'>gsshaykot53@gmail.com</Td>
                            <Td className='border border-gray-300 p-1'>admin</Td>
                            <Td className='border border-gray-300 p-1'>
                                <div className='flex gap-2'>
                                    <button>Btn 1</button>
                                    <button>Btn 2</button>
                                    <button>Btn 3</button>
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td className='border border-gray-300 p-1'>image pore</Td>
                            <Td className='border border-gray-300 p-1'>test 1</Td>
                            <Td className='border border-gray-300 p-1'>23/1/25</Td>
                            <Td className='border border-gray-300 p-1'>GS SHAYKOT</Td>
                            <Td className='border border-gray-300 p-1'>gsshaykot53@gmail.com</Td>
                            <Td className='border border-gray-300 p-1'>admin</Td>
                            <Td className='border border-gray-300 p-1'>
                                <div className='flex gap-2'>
                                    <button>Btn 1</button>
                                    <button>Btn 2</button>
                                    <button>Btn 3</button>
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td className='border border-gray-300 p-1'>image pore</Td>
                            <Td className='border border-gray-300 p-1'>test 1</Td>
                            <Td className='border border-gray-300 p-1'>23/1/25</Td>
                            <Td className='border border-gray-300 p-1'>GS SHAYKOT</Td>
                            <Td className='border border-gray-300 p-1'>gsshaykot53@gmail.com</Td>
                            <Td className='border border-gray-300 p-1'>admin</Td>
                            <Td className='border border-gray-300 p-1'>
                                <div className='flex gap-2'>
                                    <button>Btn 1</button>
                                    <button>Btn 2</button>
                                    <button>Btn 3</button>
                                </div>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                <div>
                    <Link to='/dashboard/MyRequest' className='flex justify-center items-center pt-5'>
                        <h1 className='btn bg-transparent hover:bg-red-500 hover:text-white border-1 border-red-500'>View All Request</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContentMng;