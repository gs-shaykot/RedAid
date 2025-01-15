import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Welcome from '../../../Components/Welcome.JSX';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import useUser from '../../../Hooks/useUser';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Profile = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { user } = useContext(AuthContext)
    const [{ dbUser }] = useUser()
    const axiosPub = useAxiosPublic()
    const [districts, setDistricts] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [selectedDivisionId, setSelectedDivisionId] = useState(null);
    const [isEditable, setisEditable] = useState(false)
    console.log(dbUser )

    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/divisions.json')
            .then(res => res.json())
            .then(data => setDivisions(data));
    }, []);

    const filteredDistricts = selectedDivisionId
        ? districts.filter(district => district.division_id === selectedDivisionId)
        : [];

    const handleEditProfile = () => {
        setisEditable(true);
    }

    const onSubmit = async (data, e) => { 
        console.log(data)
        setisEditable(false)
    }
    return (
        <div className='bg-gray-100 px-5'>
            <div>
                <Welcome></Welcome>
            </div>
            <div className='w-full mx-auto bg-white shadow  rounded-md'>
                <div className='liear-bg w-full h-28 rounded-t-md'></div>
                <div className='flex gap-4 items-center justify-between'>
                    <div className='flex gap-4 items-center m-6'>
                        <div className='w-28 h-28 rounded-full bg-blue-300'>
                            <img className='Avatar w-full h-full rounded-full' src={user?.photoURL} alt="" />
                        </div>
                        <div>
                            <h3>{user?.displayName}</h3>
                            <h3>{user?.email}</h3>
                            <div>
                                <h1>{dbUser?.status}</h1>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleEditProfile}
                        className={`${isEditable ? 'hidden' : 'inline-flex'} btn border-2 border-red-500 bg-transparent hover:text-white hover:bg-red-600 mr-6`}>
                        Edit Profile
                    </button>
                </div>
                <form id='form' className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                readOnly={!isEditable}
                                defaultValue={dbUser?.name}
                                {...register('name', { required: true })}
                                placeholder="Name"
                                className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                disabled
                                defaultValue={dbUser?.email}
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="Email"
                                className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2 items-center'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                defaultValue={dbUser?.role}
                                {...register('role', { required: true })}
                                className="pl-3 file-input file-input-bordered w-full " />
                            {errors.role && <span className="text-red-600">role is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select
                                defaultValue={dbUser?.blood}
                                {...register('group', { required: true })}
                                className="select select-bordered w-full ">
                                <option disabled selected>Select Blood Group:</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </select>
                            {errors.group && <span className="text-red-600">Blood group is required</span>}
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Division</span>
                            </label>
                            <select
                                readOnly={!isEditable}
                                {...register('division', { required: true })}
                                className="select select-bordered w-full "
                                onChange={e => setSelectedDivisionId(JSON.parse(e.target.value).id)}
                            >
                                {isEditable ? <option disabled selected>Select Your District:</option> : <option>{dbUser.division}</option>}
                                {divisions.map(division => (
                                    <option key={division.id} value={JSON.stringify({ id: division.id, name: division.name })}>
                                        {division.name}
                                    </option>
                                ))}
                            </select>
                            {errors.division && <span className="text-red-600">Division is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">District</span>
                            </label>
                            <select readOnly={!isEditable} {...register('district', { required: true })} className="select select-bordered w-full ">
                                {isEditable ? <option disabled selected>Select Your District:</option> : <option>{dbUser.district}</option>}
                                {filteredDistricts.map(district => (
                                    <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-600">District is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input disabled={!isEditable} type="file" {...register('photo', { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.photo && <span className="text-red-600">Photo is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        {isEditable && (
                            <button
                                className="btn btn-primary bg-red-600 hover:bg-[#b91c1c] text-white border-0"
                            >
                                Update Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;