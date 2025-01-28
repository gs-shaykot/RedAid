import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecure from './useSecure';

const usePublishedBlogs = () => {
    const axiosSec = useSecure()
    const { data: PublishedBlogs = [], isPending, refetch } = useQuery({
        queryKey: ['PublishedBlogs'],
        queryFn: async () => {
            const res = await axiosSec.get('/blogs');
            const {result}=res.data
            return result.filter(data => data.blogStatus === "published")
        }
    }) 
    return [PublishedBlogs, isPending, refetch]
};

export default usePublishedBlogs;