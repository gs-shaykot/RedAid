import axios from "axios";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AxiosSecure = axios.create({
    baseURL: " https://ass-12-delta.vercel.app",
    withCredentials: true
})
const useSecure = () => {
    const { LogOut } = useContext(AuthContext)
    // const navigate = useNavigate()
    useEffect(() => {
        AxiosSecure.interceptors.response.use(response => {
            return response
        }, error => {
            if (error.status === 401 || error.status === 403) {
                Swal.fire({
                    title: "Warning",
                    text: "Logged out For forbidden access",
                    icon: "warning"
                })
                LogOut()
                    .then(res => {
                        // navigate('/login') 
                    })
                    .catch(error => (
                        console.log(error.message)
                    ))
            }
            return Promise.reject(error)
        })
    }, [])
    return AxiosSecure
};

export default useSecure;