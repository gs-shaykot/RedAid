// fix the code.
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import useAllReqs from '../Hooks/useAllReqs';
import useSecure from '../Hooks/useSecure';
const UpdateRequest = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [SelectDistrictId, setSelectedDistrictId] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazilla] = useState([]);
    const navigate = useNavigate()
    const { AllReq, totalCount, isPending, refetch } = useAllReqs()

    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/upazillas.json')
            .then(res => res.json())
            .then(data => setUpazilla(data));
    }, []);

    const filteredUpazillas = SelectDistrictId ?
        upazillas.filter(upazilla => upazilla.district_id == SelectDistrictId) : []

    const axiosSec = useSecure()
    const onSubmit = (data) => {
        const donationRequest = {
            ...data,
            recipientDistrict: JSON.parse(data.recipientDistrict).name,
            recipientUpazila: JSON.parse(data.recipientUpazila).name,
            requesterEmail: `${user?.email}`,
            requesterName: `${user?.displayName}`,
            donationStatus: 'pending',
            createdDate: new Date().toISOString().split('T')[0],
        };
        axiosSec.patch(`/requests/${id}`, donationRequest)
            .then(res => {
                Swal.fire({
                    title: "Successful",
                    text: "Request Updated.",
                    icon: "success"
                });
                refetch()
                navigate('/dashboard/main')
            });
    };

    return (
        <div className='mt-20 container mx-auto'>
            <div>
                <h1 className='font-semibold text-3xl'>My Recent Requests</h1>
            </div>
            <form className='p-5 shadow-xl mb-10' onSubmit={handleSubmit(onSubmit)}>
                {/* Requester Details */}
                <div className='grid gap-4 md:grid-cols-2'>
                    <div>
                        <label className='block mb-2'>Requester Name</label>
                        <input
                            className='border rounded w-full p-2'
                            type='text'
                            defaultValue={user?.displayName}
                            readOnly
                            {...register('requesterName')}
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>Requester Email</label>
                        <input
                            className='border rounded w-full p-2'
                            type='email'
                            defaultValue={user?.email}
                            readOnly
                            {...register('requesterEmail')}
                        />
                    </div>
                </div>

                {/* Recipient Details */}
                <div className='grid gap-4 md:grid-cols-2 mt-4'>
                    <div>
                        <label className='block mb-2'>Recipient Name</label>
                        <input
                            className='border rounded w-full p-2'
                            type='text'
                            placeholder='Enter recipient name'
                            {...register('recipientName', { required: 'Recipient name is required' })}
                        />
                        {errors.recipientName && <p className='text-red-500 text-sm'>{errors.recipientName.message}</p>}
                    </div>
                    <div>
                        <label className='block mb-2'>Recipient District</label>
                        <select
                            className='border rounded w-full p-2'
                            {...register('recipientDistrict', { required: 'District is required' })}
                            onChange={e => setSelectedDistrictId(JSON.parse(e.target.value).id)}
                        >
                            <option disabled selected>Select Your District:</option>
                            {districts.map(district => (
                                // console district
                                <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        {errors.recipientDistrict && <p className='text-red-500 text-sm'>{errors.recipientDistrict.message}</p>}
                    </div>
                    <div>
                        <label className='block mb-2'>Recipient Upazila</label>
                        <select
                            className='border rounded w-full p-2'
                            {...register('recipientUpazila', { required: 'Upazila is required' })}
                        >
                            <option disabled selected>Select Your Upazilla:</option>
                            {filteredUpazillas.map(upazilla => (
                                // console upazilla
                                <option key={upazilla.id} value={JSON.stringify({ id: upazilla.id, name: upazilla.name })}>
                                    {upazilla.name}
                                </option>
                            ))}
                        </select>
                        {errors.recipientUpazila && <p className='text-red-500 text-sm'>{errors.recipientUpazila.message}</p>}
                    </div>
                    <div>
                        <label className='block mb-2'>Hospital Name</label>
                        <input
                            className='border rounded w-full p-2'
                            type='text'
                            placeholder='Enter hospital name'
                            {...register('hospitalName', { required: 'Hospital name is required' })}
                        />
                        {errors.hospitalName && <p className='text-red-500 text-sm'>{errors.hospitalName.message}</p>}
                    </div>
                </div>

                {/* Address, Blood Group, and Donation Details */}
                <div className='grid gap-4 md:grid-cols-2 mt-4'>
                    <div>
                        <label className='block mb-2'>Full Address Line</label>
                        <input
                            className='border rounded w-full p-2'
                            type='text'
                            placeholder='Enter full address'
                            {...register('fullAddress', { required: 'Address is required' })}
                        />
                        {errors.fullAddress && <p className='text-red-500 text-sm'>{errors.fullAddress.message}</p>}
                    </div>
                    <div>
                        <label className='block mb-2'>Blood Group</label>
                        <select
                            className='border rounded w-full p-2'
                            {...register('bloodGroup', { required: 'Blood group is required' })}
                        >
                            <option value=''>Select blood group</option>
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                        </select>
                        {errors.bloodGroup && <p className='text-red-500 text-sm'>{errors.bloodGroup.message}</p>}
                    </div>
                    <div>
                        <label className='block mb-2'>Donation Date</label>
                        <input
                            className='border rounded w-full p-2'
                            type='date'
                            {...register('donationDate', { required: 'Date is required' })}
                        />
                        {errors.donationDate && <p className='text-red-500 text-sm'>{errors.donationDate.message}</p>}
                    </div>
                    <div>
                        <label className='block mb-2'>Donation Time</label>
                        <input
                            className='border rounded w-full p-2'
                            type='time'
                            {...register('donationTime', { required: 'Time is required' })}
                        />
                        {errors.donationTime && <p className='text-red-500 text-sm'>{errors.donationTime.message}</p>}
                    </div>
                </div>

                {/* Request Message */}
                <div className='mt-4'>
                    <label className='block mb-2'>Request Message</label>
                    <textarea
                        className='border rounded w-full p-2'
                        rows='4'
                        placeholder='Explain why you need blood'
                        {...register('requestMessage', { required: 'Request message is required' })}
                    ></textarea>
                    {errors.requestMessage && <p className='text-red-500 text-sm'>{errors.requestMessage.message}</p>}
                </div>

                {/* Submit Button */}
                <div className='mt-6 text-center'>
                    <button
                        type='submit'
                        className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateRequest;