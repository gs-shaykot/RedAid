import { Navigate, useLocation } from "react-router-dom";  
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useisAdmin";


const AdminRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const [isAdmin, isPending] = useAdmin();
    const location = useLocation();

    if (loader || isPending) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;