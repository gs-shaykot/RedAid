import React, { useContext } from 'react';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const useDonating = (currentPage, itemsPerPage) => {
    const axiosSec = useSecure()
    const { user } = useContext(AuthContext)
    const { data: { donating = [], donarCount=0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['donating',user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSec.get(`/donar?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`);
            const { result, donarCount } = res.data
            return { result, donarCount }
        }
    })
    return { donating, donarCount, isPending, refetch }
};

export default useDonating;