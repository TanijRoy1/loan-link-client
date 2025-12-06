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
                element: <LoanDetails></LoanDetails>
            }
        ]
    },
    {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "add-loan",
                element: <AddLoan></AddLoan>
            }
        ]
    }
])

export default router;