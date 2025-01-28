import { useQuery } from "@tanstack/react-query";
import useSecure from "./useSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useVolunteer = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useSecure()
    const { data: isVolunteer, isPending:isLoading } = useQuery({
        queryKey: [user?.email, 'isVolunteer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/volunteer/${user.email}`); 
            return res.data?.volunteer;
        }
    })
    return [isVolunteer, isLoading]
};              

export default useVolunteer;