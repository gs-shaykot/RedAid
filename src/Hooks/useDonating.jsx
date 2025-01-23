import React, { useContext } from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useDonating = () => {
    const axiosSec = useSecure()
    const { user } = useContext(AuthContext)
    const { data: donating = [], isPending, refetch } = useQuery({
        queryKey: ['donating'],
        queryFn: async () => {
            const res = await axiosSec.get(`/donar?email=${user?.email}`); 
            return res.data
        }
    })
    return [{ donating, isPending, refetch }]
};

export default useDonating;