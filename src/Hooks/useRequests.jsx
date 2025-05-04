import React, { useContext } from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useRequests = (donationStatus, currentPage, itemsPerPage) => {
    const axiosSec = useSecure();
    const { user } = useContext(AuthContext);

    const { data: { Requests = [], rqstCount=0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['Requests', donationStatus, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSec(`/requests?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`);
            const { userReq, rqstCount } = res.data
            const Requests = userReq.filter(data => !donationStatus || data.donationStatus === donationStatus)
            // return res.data.filter(data => !donationStatus || data.donationStatus === donationStatus);
            return { Requests, rqstCount }
        },
    });

    return { Requests, rqstCount, isPending, refetch };
};

export default useRequests;
