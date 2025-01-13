// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom'; 
// const PrivateRoute = ({ children }) => {

//     const { user, loader } = useContext(AuthContext);
//     const location = useLocation()
//     if (loader) {
//         return <span className="loading loading-ring loading-lg"></span>
//     }
//     if (user) {
//         return children
//     }

//     return (
//         <Navigate state={location.pathname} to="/login"></Navigate>
//     );

// };

// export default PrivateRoute;