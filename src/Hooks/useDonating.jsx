import React, { useContext } from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useDonating = () => {
    const axiosSec = useSecure();
    const { user } = useContext(AuthContext);

    const { data: donating = [], isPending, refetch } = useQuery({
        queryKey: ['donating'],
        queryFn: async () => {
            const res = await axiosSec.get(`/donar?email=${user?.email}`);
            const donating = res.data.filter(data => data.donationStatus === "inprogress");
            return donating;
        }
    });

    return { donating, isPending, refetch };
};

export default useDonating;
