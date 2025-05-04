import React, { useContext } from 'react';
import useSecure from './useSecure';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useFunding = () => {
    const axiosSec = useSecure()
    const { user } = useContext(AuthContext)
    const { data: haveFund = [], isPending, refetch: fundReload } = useQuery({
        queryKey: ['haveFund'],
        queryFn: async () => {
            const res = await axiosSec.get(`/makeAfunding`);
            return res.data

        }
    })
    return { haveFund, isPending, fundReload }
};

export default useFunding;