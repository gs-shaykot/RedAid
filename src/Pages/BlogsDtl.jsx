import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

const BlogDatasDtl = () => {
    const BlogData = useLoaderData()
    if (!BlogData.data) {
        return (
            <div className="max-w-screen-md mx-auto text-center mt-20">
                <h1 className="text-4xl font-bold text-red-500">BlogData Not Found</h1>
                <p className="text-gray-600 mt-4">The BlogData you are looking for does not exist or has been removed.</p>
                <Link to="/" className="btn btn-primary mt-6">
                    Go Back to BlogDatas
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-screen-lg mx-auto p-6 mt-16">
            {/* Banner Image */}
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg">
                <img src={BlogData.data.image} alt={BlogData.data.title} className="w-full h-full object-fill" />
            </div>

            {/* BlogData.data Details */}
            <div className="mt-8">
                <h1 className="text-4xl font-bold mb-4">{BlogData.data.title}</h1>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                    <span>Posted by </span>
                    <span className="text-primary font-medium mx-2">{BlogData.data.PosterName}</span> |
                    <span className="ml-2">{BlogData.data.postedDate}</span>
                </div>
                <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: BlogData.data.content }}
                ></div>
            </div>

            {/* Back to BlogDatas Button */}
            <div className="mt-10 text-center">
                <Link to="/" className="btn btn-primary">
                    Back to BlogDatas
                </Link>
            </div>
        </div>
    );
};

export default BlogDatasDtl;
