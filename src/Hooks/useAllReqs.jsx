import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useAllReqs = (donationStatus) => {
    const axiosSec = useSecure()
    const { data: AllReq = [], isPending, refetch } = useQuery({
        queryKey: ['AllReq',donationStatus],
        queryFn: async () => {
            const res = await axiosSec.get('/requests');
            return res.data.filter(data => !donationStatus || data.donationStatus === donationStatus)
        }
    })
    return [AllReq, isPending, refetch]
};

export default useAllReqs;