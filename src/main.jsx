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
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/donationRqst',
        element: <DonationRqst></DonationRqst>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
