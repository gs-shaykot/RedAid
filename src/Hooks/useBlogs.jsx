import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecure from './useSecure';

const useBlogs = (blogStatus, currentPage, itemsPerPage) => {
    const axiosSec = useSecure()
    const { data: { AllBlogs = [], blogCount=0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['AllBlogs', blogStatus, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSec.get(`/blogs?page=${currentPage}&size=${itemsPerPage}`);
            const { result, blogCount } = res.data
            const AllBlogs = result.filter(data => !blogStatus || data.blogStatus === blogStatus)
            return { AllBlogs, blogCount }
        }
    })
    return { AllBlogs, blogCount, isPending, refetch }
};

export default useBlogs;