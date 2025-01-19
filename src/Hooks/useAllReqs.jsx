import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useAllReqs = () => {
    const axiosSec = useSecure()
    const { data: AllReq = [], isPending, refetch } = useQuery({
        queryKey: ['AllReq'],
        queryFn: async () => {
            const res = await axiosSec.get('/requests');
            console.log(res.data)
            return res.data
        }
    })
    return [AllReq, isPending, refetch]
};

export default useAllReqs;