// check the data updating logic is ok or not
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Welcome from '../../../Components/Welcome.JSX';
import useUser from '../../../Hooks/useUser';
import { useForm } from 'react-hook-form';
import auth from '../../../Provider/firebase';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import useDivDis from '../../../Hooks/useDivDis';

const Profile = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const axiospub = useAxiosPublic()
    const { user } = useContext(AuthContext)
    const [{ dbUser, refetch }] = useUser()
    const [isEditable, setisEditable] = useState(false)
    const [selectedDivisionId, setSelectedDivisionId] = useState(null);
    const [districts, divisions] = useDivDis()
    const filteredDistricts = selectedDivisionId
        ? districts.filter(district => district.division_id === selectedDivisionId)
        : [];
    const IMGAPI = import.meta.env.VITE_IMGAPI
    const IMGURL = `https://api.imgbb.com/1/upload?key=${IMGAPI}`





    const handleEditProfile = () => {
        setisEditable(true);
    }

    const onSubmit = async (data, e) => {
        const { email, role, ...rest } = data;
        const FinalData = {
            ...rest,
            division: JSON.parse(data.division).name,
            district: JSON.parse(data.district).name
        };
        const imageFile = { image: FinalData.photo[0] }
        const res = await axiospub.post(IMGURL, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const image = res?.data?.data?.display_url
        updateProfile(auth.currentUser, {
            displayName: FinalData.name, photoURL: image
        })
            .then(res => {
                // ToDo: database update
                axiospub.patch(`users/${dbUser._id}`, FinalData)
                    .then(res => {
                        Swal.fire({
                            title: "Successfull",
                            text: "Profile Updated.",
                            icon: "success"
                        });
                        refetch()
                    })
                // .catch(error => console.log(error.message))
            })
            .catch(error => {
                // console.log(error.message)
            })

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
                    <>
                        {
                            isEditable ? (
                                <button
                                    onClick={() => setisEditable(!isEditable)}
                                    className="btn border-2 border-red-500 bg-transparent hover:text-white hover:bg-red-600 mr-6"
                                >
                                    Cancel Editing
                                </button>
                            ) : (
                                <button
                                    onClick={handleEditProfile}
                                    className="btn border-2 border-red-500 bg-transparent hover:text-white hover:bg-red-600 mr-6"
                                >
                                    Edit Profile
                                </button>
                            )
                        }
                    </>

                </div>
                <form id='form' className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                disabled={!isEditable}
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
                                placeholder="Email"
                                className="input input-bordered" />
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
                                className="pl-3 file-input file-input-bordered w-full " />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <select
                                disabled={!isEditable}
                                defaultValue={dbUser?.blood}
                                {...register('group', { required: true })}
                                className="select select-bordered w-full ">
                                {isEditable ? <option disabled selected>Select Your Group:</option> : <option>{dbUser?.blood}</option>}
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
                                disabled={!isEditable}
                                {...register('division', { required: true })}
                                className="select select-bordered w-full "
                                onChange={e => setSelectedDivisionId(JSON.parse(e.target.value).id)}
                            >
                                {isEditable ? <option disabled selected>Select Your District:</option> : <option>{dbUser.division}</option>}
                                {divisions.map(division => (
                                    isEditable && <option key={division.id} value={JSON.stringify({ id: division.id, name: division.name })}>
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
                            <select disabled={!isEditable} {...register('district', { required: true })} className="select select-bordered w-full ">
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

            </div >
        </div >
    );
};

export default Profile;