import React, { useContext } from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useRequests = () => {
    const axiosSec = useSecure();
    const { user } = useContext(AuthContext);

    const { data: Requests = [], isLoading, refetch } = useQuery({
        queryKey: ['Requests'],
        queryFn: async () => {
            const res = await axiosSec(`/requests?email=${user?.email}`); 
            return res.data;
        },
    });

    return { Requests, isLoading, refetch };
};

export default useRequests;
