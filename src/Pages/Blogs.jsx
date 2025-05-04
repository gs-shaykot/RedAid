// fix the issues
import React from "react"; 
import { NavLink } from "react-router-dom";
import usePublishedBlogs from "../Hooks/usePublishedBlogs";

const Blogs = () => {
    const [PublishedBlogs] = usePublishedBlogs();
    return (
        <div className="max-w-screen-xl mx-auto p-6 mt-14">
            <h1 className="text-4xl font-bold text-center mb-6">Latest Blood Donation Stories</h1>
            <p className="text-center text-gray-600 mb-8">
                Stay informed about blood donation news, tips, and inspiring stories from our community of donors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PublishedBlogs.map((blog) => {
                    const substringContent = blog.content.substring(0, 100) + "...";

                    return (
                        <div key={blog._id} className="card bg-base-100 shadow-md border">
                            <figure>
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold">{blog.title}</h2>
                                <p
                                    className="text-gray-500 text-sm"
                                    dangerouslySetInnerHTML={{ __html: substringContent }}
                                />
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-gray-400 text-sm">{blog.postedDate}</span>
                                    <span className="text-primary text-sm font-medium">{blog.PosterName}</span>
                                </div>
                                <NavLink to={`/blogs/${blog._id}`} className="btn btn-outline btn-primary mt-4">Read More</NavLink>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Blogs;
