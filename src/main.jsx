// fix the routes of dashboard children
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
        element: <DonationRqst></DonationRqst>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
      {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: 'main',
            element: <DashBoardMain></DashBoardMain>
          },
          {
            path: 'profile',
            element: <Profile></Profile>
          },
          {
            path: 'MyRequest',
            element: <MyRequest></MyRequest>
          },
          {
            path: 'CreateRequest',
            element: <CreateRequest></CreateRequest>
          }
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
