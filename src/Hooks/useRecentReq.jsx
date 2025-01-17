import React, { useContext } from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useRecentReq = () => {
    const axiosSec = useSecure();
    const { user } = useContext(AuthContext);

    const { data: RecentReq = [], isLoading, refetch } = useQuery({
        queryKey: ['RecentReq'],
        queryFn: async () => {
            const res = await axiosSec(`/requests/sorted/ascending?email=${user?.email}`); 
            return res.data;
        },
    });

    return { RecentReq, isLoading, refetch };
}; 
export default useRecentReq;
