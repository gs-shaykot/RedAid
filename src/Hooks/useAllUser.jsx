// i have a status attribute inside the api's data, but showing 'status' is deprecated. 
import React from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUser = (status) => {
    const axiosSec = useSecure()
    const { data: Alluser = [], isPending, refetch } = useQuery({
        queryKey: ['Alluser',status],
        queryFn: async () => {
            const res = await axiosSec.get('/users')
            return res.data.filter(user=>!status||user.status===status)
        }
    })
    return [Alluser, isPending, refetch]
};

export default useAllUser;