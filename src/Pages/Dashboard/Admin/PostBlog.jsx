import JoditEditor from 'jodit-react';
import React, { useContext, useRef, useState } from 'react';
import Welcome from '../../../Components/Welcome';
import useSecure from '../../../Hooks/useSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';

const PostBlog = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const { user } = useContext(AuthContext)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const axiosPub = useAxiosPublic(); //JWT secure url system without withCredentials
    const axiosSec = useSecure(); //JWT secure url system with withCredentials
    const IMGAPI = import.meta.env.VITE_IMGAPI;
    const IMGURL = `https://api.imgbb.com/1/upload?key=${IMGAPI}`;
    const config = {
        placeholder: 'start typing...',
        minHeight: 350,
    };


    const onSubmit = async (data, e) => {
        const formData = new FormData();
        formData.append('image', data.thumbnail[0]);

        // ImgBB image uploading
        const res = await axiosPub.post(IMGURL, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        const image = res?.data?.data?.display_url;
        const date = new Date()
        const day = String(date.getDate())  // Ensure 2 digits
        const month = String(date.getMonth() + 1)  // getMonth() is 0-indexed
        const year = String(date.getFullYear()); // Get last two digits of the year

        // Combine to dd/mm/yy format
        const formattedDate = `${day}/${month}/${year}`;
        const blogData = {
            title: data.title,
            image: image,
            content: content,
            blogStatus: 'draft',
            PosterName: user?.displayName,
            PosterEmail: user?.email,
            postedDate: formattedDate
        };
        // Upload blog data
        const response = await axiosSec.post('/blogs', blogData);
        if (response.status === 200) { 
            Swal.fire({
                title: "Succeess",
                text: "Blog posted Successfully",
                icon: "success"
            });
            reset()
        }
        else {
            Swal.fire({
                title: "Error",
                text: "Blog posted Unsuccessfully",
                icon: "error"
            });
        }
    };

    return (
        <div className='bg-gray-100 px-5 h-screen'>
            <div>
                <Welcome />
            </div>
            <div className="flex justify-between mb-3">
                <div>
                    <h1 className='font-semibold text-3xl'>Create New Blog</h1>
                </div>
            </div>
            <div className='w-full box-border px-5 mx-auto bg-white shadow rounded-md'>
                <div className='py-6 flex flex-col justify-between'>
                    <form id='form' className="card-body p-0" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text text-lg">Title</span>
                            </label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                placeholder="Title"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control mb-3">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-lg">Thumbnail</span>
                                </label>
                                <input
                                    {...register('thumbnail', { required: true })}
                                    type="file"
                                    className="file-input file-input-bordered file-input-accent w-full" />
                            </div>
                        </div>

                        <div className=''>
                            <JoditEditor
                                className='min-h-60'
                                ref={editor}
                                value={content}
                                config={config}
                                onBlur={data => setContent(data)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary bg-red-600 hover:bg-[#b91c1c] text-white border-0">POST</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostBlog;
