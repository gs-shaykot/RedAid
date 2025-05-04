// do without encoding
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecure from './useSecure';
import useAxiosPublic from './useAxiosPublic';

const useSearch = (blood, District, Upazila, enabled) => {
    const axiosPub = useAxiosPublic();

    const { data: searchRes = [], isPending, refetch } = useQuery({
        queryKey: ['searchRes', blood, District, Upazila],
        queryFn: async () => { 
            const encodedBlood = encodeURIComponent(blood);
            const encodedDistrict = encodeURIComponent(District);
            const encodedUpazila = encodeURIComponent(Upazila);

            const res = await axiosPub.get(
                `/users/search?blood=${encodedBlood}&District=${encodedDistrict}&Upazila=${encodedUpazila}`
            );
            return res.data;
        },
        enabled, 
    });

    return [searchRes, isPending, refetch];
};
export default useSearch;