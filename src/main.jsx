// check all route is defined correctly ?
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainLayout from './Layout/MainLayout';
import HomeLayout from './Layout/HomeLayout';
import './index.css'
import App from './App.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DonationRqst from './Pages/DonationRqst.jsx';
import Blogs from './Pages/Blogs.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Dashboard from './Pages/Dashboard';
import DashBoardMain from './Pages/Dashboard/DashBoardMain.jsx';
import Profile from './Pages/Dashboard/Profile/Profile';
import MyRequest from './Pages/Dashboard/Request/MyRequest.jsx';
import CreateRequest from './Pages/Dashboard/Request/CreateRequest.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import PrivateRoute from './Layout/PrivateRoute.jsx';
import RequestDetails from './Pages/RequestDetails.jsx';
import UpdateRequest from './Pages/UpdateRequest.jsx';
import AdminRoute from './Layout/AdminRoute';
import AdminDashboard from './Pages/Dashboard/Admin/AdminDashboard';
import Alluser from './Pages/Dashboard/Admin/Alluser.jsx';
import AllBloodReq from './Pages/Dashboard/Admin/AllBloodReq.jsx';
import ContentMng from './Pages/Dashboard/Admin/ContentMng.jsx';
import axios from 'axios';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomeLayout></HomeLayout>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/donationRqst',
        element: <DonationRqst></DonationRqst>,
      },
      {
        path: '/requestDtls/:id',
        loader: ({ params }) => axios.get(`http://localhost:5000/requests/${params.id}`, { withCredentials: true }),
        element: <RequestDetails></RequestDetails>
      },
      {
        path: '/blogs',
        element: <PrivateRoute><Blogs></Blogs></PrivateRoute>
      },
      {
        path: '/reqUpdate/:id',
        element: <PrivateRoute><UpdateRequest></UpdateRequest></PrivateRoute>
      },
      {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          {
            path: 'main',
            element: <PrivateRoute><DashBoardMain></DashBoardMain></PrivateRoute>
          },
          {
            path: 'profile',
            element: <PrivateRoute><Profile></Profile></PrivateRoute>
          },
          {
            path: 'MyRequest',
            element: <PrivateRoute><MyRequest></MyRequest></PrivateRoute>
          },
          {
            path: 'CreateRequest',
            element: <PrivateRoute><CreateRequest></CreateRequest></PrivateRoute>
          },
          // admin route part
          {
            path: 'adminDashboard',
            element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
          },
          {
            path: 'alluser',
            element: <AdminRoute><Alluser></Alluser></AdminRoute>
          },
          {
            path: 'allBloodReq',
            element: <AdminRoute><AllBloodReq></AllBloodReq></AdminRoute>
          },
          {
            path: 'contentMng',
            element: <AdminRoute><ContentMng></ContentMng></AdminRoute>
          },
        ]
      },
    ]
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode >
)
