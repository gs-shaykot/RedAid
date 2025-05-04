import { useQuery } from "@tanstack/react-query";
import useSecure from "./useSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useVolunteer = () => {
    const { user } = useContext(AuthContext);
    const axiosPub = useAxiosPublic()
    const { data: isVolunteer, isPending:isLoading } = useQuery({
        queryKey: [user?.email, 'isVolunteer'],
        queryFn: async () => {
            const res = await axiosPub.get(`/users/mod/volunteer/${user?.email}`); 
            return res.data?.volunteer;
        }
    })
    return [isVolunteer, isLoading]
};              

export default useVolunteer;