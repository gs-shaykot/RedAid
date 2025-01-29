// filter those data which has the donationStatus "pending"
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useDonationRqst = (currentPage, itemsPerPage) => {
    const axiosSec = useSecure()
    const { data: { DonationRqst = [], totalCount = 0 } = {}, isPending, refetch } = useQuery({
        queryKey: ['DonationRqst', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSec.get(`/requests/all/stats/pending?page=${currentPage}&size=${itemsPerPage}`);
            const { result, totalCount } = res.data
            console.log("Result length: ",result.length)
            const DonationRqst = result.filter(user => user.donationStatus === 'pending');
            console.log(DonationRqst.length)
            return { DonationRqst, totalCount }
        }
    })
    return { DonationRqst, totalCount, isPending, refetch }
};

export default useDonationRqst;