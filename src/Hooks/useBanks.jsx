import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBanks = (Division, District) => {
    const axiosPub = useAxiosPublic();

    const { data: BloodBanks = [], isPending, refetch } = useQuery({
        queryKey: ['BloodBanks', Division, District],
        queryFn: async () => {
            const encodedDiv = encodeURIComponent(Division);
            const encodedDistrict = encodeURIComponent(District);
            console.log("Fetching banks for:", encodedDiv, encodedDistrict);
            const res = await axios.get(` https://ass-12-delta.vercel.app/bloodBanks?division=${encodedDiv}&district=${encodedDistrict}`);
            console.log("Response: ", res.data)
            return res.data;
        },
        enabled: !!Division && !!District,
    });

    return [BloodBanks, isPending, refetch];
};



export default useBanks;