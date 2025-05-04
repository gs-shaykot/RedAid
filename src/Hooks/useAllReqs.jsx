import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useAllReqs = (donationStatus, currentPage, itemsPerPage) => {
    const axiosSec = useSecure()
    const { data: { AllReq = [], totalCount=0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['AllReq', donationStatus, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSec.get(`/requests?page=${currentPage}&size=${itemsPerPage}`);
            const { result, totalCount } = res.data
            const AllReq = result.filter(data => !donationStatus || data.donationStatus === donationStatus);
            return { AllReq, totalCount }
        }
    })
    return { AllReq, totalCount, isPending, refetch }
};

export default useAllReqs;