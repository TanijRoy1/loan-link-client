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
import LoanApplicationForm from '../pages/LoanApplicationForm/LoanApplicationForm';
import BorrowerRoute from './BorrowerRoute';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import AdminRoute from './AdminRoute';
import DashboardAllLoans from '../pages/Dashboard/DashboardAllLoans/DashboardAllLoans';
import NotBorrowerRoute from './NotBorrowerRoute';
import UpdateLoan from '../pages/Dashboard/UpdateLoan/UpdateLoan';
import ManagerRoute from './ManagerRoute';
import LoanApplications from '../pages/Dashboard/LoanApplications/LoanApplications';
import ManageLoans from '../pages/Dashboard/ManageLoans/ManageLoans';

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
                element: <PrivateRoute><BorrowerRoute><LoanApplicationForm></LoanApplicationForm></BorrowerRoute></PrivateRoute>
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
                path: "manage-users",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "all-loan",
                element: <AdminRoute><DashboardAllLoans></DashboardAllLoans></AdminRoute>
            },
            {
                path: "loan-applications",
                element: <AdminRoute><LoanApplications></LoanApplications></AdminRoute>
            },
            {
                path: "add-loan",
                element: <ManagerRoute><AddLoan></AddLoan></ManagerRoute>
            },
            {
                path: "manage-loans",
                element: <ManagerRoute><ManageLoans></ManageLoans></ManagerRoute>
            },
            {
                path: "update-loan/:id",
                element: <NotBorrowerRoute><UpdateLoan></UpdateLoan></NotBorrowerRoute>
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