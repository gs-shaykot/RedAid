// split the date from 2025-01-28T14:30:18.131Z to 2025-01-28 at 14:30:18 
import React from 'react';
import useFunding from '../Hooks/useFunding';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from 'react-router-dom';

const ShowFunding = () => {
    const { haveFund, isPending, fundReload } = useFunding() 
    return (
        <div className='my-20 container mx-auto'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='px-6 underline text-3xl font-bold'>Honoring Our Benefactors</h1>
                <Link to='/funding' className='btn bg-orange-500 hover:bg-[#b91c1c] text-white'>Be a Patron</Link>
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th className='border border-gray-300 p-1'>Patron's Name</Th>
                        <Th className='border border-gray-300 p-1'>Patron's Email</Th>
                        <Th className='border border-gray-300 p-1'>Amount</Th>
                        <Th className='border border-gray-300 p-1'>TrxId</Th>
                        <Th className='border border-gray-300 p-1'>Donated at</Th>
                    </Tr>
                </Thead>
                <Tbody className='text-center'>
                    {haveFund.map((data) => (
                        <Tr key={data._id}>
                            <Td className='border border-gray-300 p-1'>{data.name}</Td>
                            <Td className='border border-gray-300 p-1'>{data.email}</Td>
                            <Td className='border border-gray-300 p-1'>${data.price}</Td>
                            <Td className='border border-gray-300 p-1'>{data.transactionId}</Td>
                            <Td className='border border-gray-300 p-1'>{data.date}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default ShowFunding;