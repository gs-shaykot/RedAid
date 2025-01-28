// i have a status attribute inside the api's data, but showing 'status' is deprecated. 
import React from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUser = (status, currentPage, itemsPerPage) => {
    const axiosSec = useSecure()
    const { data: { Alluser = [], userCount=0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['Alluser', status, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSec.get(`/users?page=${currentPage}&size=${itemsPerPage}`)
            const { userCount, result } = res.data
            const Alluser = result.filter(user => !status || user.status === status)
            // return res.data.filter(user=>!status||user.status===status)
            return { Alluser, userCount }
        }
    })
    return { Alluser, userCount, isPending, refetch }
};

export default useAllUser;