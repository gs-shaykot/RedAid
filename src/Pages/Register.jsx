import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [districts, setDistricts] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [selectedDivisionId, setSelectedDivisionId] = useState(null); 
    const password = watch('password');
    const confirmPassword = watch('ConfirmPassword');

    useEffect(() => {
        fetch('districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('divisions.json')
            .then(res => res.json())
            .then(data => setDivisions(data));
    }, []);

    const filteredDistricts = selectedDivisionId
        ? districts.filter(district => district.division_id === selectedDivisionId)
        : [];

    const onSubmit = (data) => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const FinalData = {
            ...data,
            division: JSON.parse(data.division).name,
            district: JSON.parse(data.district).name,
            role: "donar",
            status: "active"
        };

        console.log(FinalData);
    };

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center md:justify-items-end">
                    <div className="order-2 lg:order-first text-center lg:text-left">
                        <img src="https://i.ibb.co.com/ZWD8Xvx/blood-donation-concept-illustration-vector-removebg-preview.png" alt="" />
                    </div>

                    {/* Registration Form */}
                    <div className="card my-20 bg-base-100 w-11/12 md:w-9/12 shadow-2xl">
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

                            <div className='grid grid-cols-2 gap-2 items-center'>
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
                                    <select {...register('group', { required: true })} className="select select-bordered w-full max-w-xs">
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
                                        {...register('division', { required: true })}
                                        className="select select-bordered w-full max-w-xs"
                                        onChange={e => setSelectedDivisionId(JSON.parse(e.target.value).id)}
                                    >
                                        <option disabled selected>Select Your Division:</option>
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
                                    <select {...register('district', { required: true })} className="select select-bordered w-full max-w-xs">
                                        <option disabled selected>Select Your District:</option>
                                        {filteredDistricts.map(district => (
                                            <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district && <span className="text-red-600">District is required</span>}
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
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
