// filter those data which has the donationStatus "pending"
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useDonationRqst = () => {
    const axiosSec = useSecure()
    const { data: { DonationRqst = [], totalCount = 0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['DonationRqst'],
        queryFn: async () => {
            const res = await axiosSec.get(`/requests`);
            const { result, totalCount } = res.data
            const DonationRqst = result.filter(data =>data.donationStatus === "pending");
            return { DonationRqst, totalCount }
        }
    })
    return { DonationRqst, totalCount, isPending, refetch }
};

export default useDonationRqst;