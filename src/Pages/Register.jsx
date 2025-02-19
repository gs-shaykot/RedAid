import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import auth from '../Provider/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useDivDis from '../Hooks/useDivDis';

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    const axiosPub = useAxiosPublic()
    const { createUser } = useContext(AuthContext)
    const password = watch('password');
    const confirmPassword = watch('ConfirmPassword');
    const IMGAPI = import.meta.env.VITE_IMGAPI
    const IMGURL = `https://api.imgbb.com/1/upload?key=${IMGAPI}`

    const [SelectDistrictId, setSelectedDistrictId] = useState(null);
    const [districts, upazillas] = useDivDis()
    const filteredUpazillas = SelectDistrictId ? 
        upazillas.filter(upazilla => upazilla.district_id == SelectDistrictId) : []

    const onSubmit = async (data, e) => { 
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Wrong Credential",
                text: "Password must be at least 6 characters long and include an uppercase and a lowercase letter.",
                icon: "warning"
            });
            return;
        }

        const FinalData = {
            ...data,
            District: JSON.parse(data.District).name,
            Upazila: JSON.parse(data.Upazila).name,
            role: "donar",
            status: "active"
        };

        const imageFile = { image: FinalData.photo[0] }
        const res = await axiosPub.post(IMGURL, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const image = res?.data?.data?.display_url
        const user = {
            name: FinalData.name,
            email: FinalData.email,
            image: image,
            blood: FinalData.group,
            District: FinalData.District,
            Upazila: FinalData.Upazila,
            status: FinalData.status,
            role: FinalData.role,
        }
        createUser(FinalData.email, FinalData.password)
            .then(result => {
                axiosPub.post('/users', user)
                    .then(data => {
                        console.log("users added", data)
                    })
                    .catch(error => console.log(error.message))
                Swal.fire({
                    title: "Succeess",
                    text: "User Created Successfully",
                    icon: "success"
                });
                updateProfile(auth.currentUser, {
                    displayName: FinalData.name, photoURL: image
                })
                    .then(() => {})
                    .catch((error) => {
                        Swal.fire({
                            title: "Updating Failed",
                            text: error.message,
                            icon: "error"
                        });
                    });
                e.target.reset()
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    title: "Auth Error",
                    text: error.message,
                    icon: "error"
                });
            })
    };

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-items-center md:justify-items-end">
                    <div className="order-2 lg:order-first text-center lg:text-left">
                        <img className="max-w-full" src="https://i.ibb.co.com/23yZhD5b/blood-donation-concept-illustration-vector-removebg-preview-min.png" alt="" />
                    </div>

                    {/* Registration Form */}
                    <div className="card my-8 lg:my-20 bg-base-100 w-11/12 md:w-9/12 shadow-2xl">
                        <form id='form' className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email', { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2 items-center'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                                    {errors.photo && <span className="text-red-600">Photo is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <select
                                        defaultValue=""
                                        {...register('group', { required: true })}
                                        className="select select-bordered w-full max-w-xs">
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

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
                                <div>
                                    <label className='block mb-2'>District</label>
                                    <select
                                        defaultValue=""
                                        className='border rounded w-full p-2'
                                        {...register('District', { required: 'District is required' })}
                                        onChange={e => setSelectedDistrictId(JSON.parse(e.target.value).id)}
                                    >
                                        <option disabled selected>Select Your District:</option>
                                        {districts.map(district => (
                                            <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.District && <p className='text-red-500 text-sm'>{errors.District.message}</p>}
                                </div>
                                <div>
                                    <label className='block mb-2'>Upazila</label>
                                    <select
                                        defaultValue=""
                                        className='border rounded w-full p-2'
                                        {...register('Upazila', { required: 'Upazila is required' })}
                                    >
                                        <option disabled selected>Select Your Upazilla:</option>
                                        {filteredUpazillas.map(upazilla => (
                                            <option key={upazilla.id} value={JSON.stringify({ id: upazilla.id, name: upazilla.name })}>
                                                {upazilla.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.Upazila && <p className='text-red-500 text-sm'>{errors.Upazila.message}</p>}
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register('password', { required: true })} placeholder="Password" className="input input-bordered" />
                                    {errors.password && <span className="text-red-600">Password is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" {...register('ConfirmPassword', { required: true })} placeholder="Confirm Password" className="input input-bordered" />
                                    {errors.ConfirmPassword && <span className="text-red-600">Confirm Password is required</span>}
                                </div>
                            </div>
                            {password !== confirmPassword && <span className="text-red-600">Passwords do not match</span>}

                            <div className="form-control mt-6">
                                <button className="btn btn-primary bg-red-600 hover:bg-[#b91c1c] text-white border-0">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
