import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import Contact from '../pages/Contact/Contact';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import AddLoan from '../pages/Dashboard/AddLoan/AddLoan';
import AllLoans from '../pages/AllLoans/AllLoans';
import LoanDetails from '../pages/LoanDetails/LoanDetails';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PrivateRoute from './PrivateRoute';
import LoanApplication from '../pages/LoanApplication/LoanApplication';
import BorrowerRoute from './BorrowerRoute';

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "about-us",
                Component: AboutUs
            },
            {
                path: "contact",
                Component: Contact
            },
            {
                path: "all-loans",
                Component: AllLoans
            },
            {
                path: "loans/:id",
                element: <PrivateRoute><LoanDetails></LoanDetails></PrivateRoute>
            },
            {
                path: "apply-loan/:id",
                element: <PrivateRoute><BorrowerRoute><LoanApplication></LoanApplication></BorrowerRoute></PrivateRoute>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "add-loan",
                element: <AddLoan></AddLoan>
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
])

export default router;