import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query'; 

const useAllReqs = () => {
    const axiosSec = useSecure(); 

    const { data: AllRequests = [], isLoading, refetch } = useQuery({
        queryKey: ['AllRequests'],
        queryFn: async () => {
            const res = await axiosSec(`/requests`);
            return res.data;
        },
    });

    return { AllRequests, isLoading, refetch };
};

export default useAllReqs;