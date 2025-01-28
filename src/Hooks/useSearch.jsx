import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecure from './useSecure';

const useSearch = (blood, District, Upazila, enabled) => {
    const axiosSec = useSecure();

    const { data: searchRes = [], isPending, refetch } = useQuery({
        queryKey: ['searchRes', blood, District, Upazila],
        queryFn: async () => {
            // Encode all parameters to handle special characters
            const encodedBlood = encodeURIComponent(blood);
            const encodedDistrict = encodeURIComponent(District);
            const encodedUpazila = encodeURIComponent(Upazila);

            const res = await axiosSec.get(
                `/users/search?blood=${encodedBlood}&District=${encodedDistrict}&Upazila=${encodedUpazila}`
            );
            return res.data;
        },
        enabled, // Fetch only when enabled
    });

    return [searchRes, isPending, refetch];
};
export default useSearch;