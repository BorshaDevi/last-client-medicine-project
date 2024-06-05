import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root/Root.jsx';
import Error from './Components/Error/Error.jsx';
import DashBoard from './Layout/DashBoard/DashBoard.jsx';
import AuthProvider from './Provider/AuthProvider/AuthProvider.jsx';
import Home from './Pages/Home/Home.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import Login from './Pages/Login/Login.jsx';
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import PaymentHistory from './Pages/DashBoardPages/UserPages/PaymentHistory.jsx';
import ManageUsers from './Pages/DashBoardPages/AdminPages/ManageUsers.jsx';
import ManageCategory from './Pages/DashBoardPages/AdminPages/ManageCategory.jsx';
import PaymentManagement from './Pages/DashBoardPages/AdminPages/PaymentManagement.jsx';
import SalesReport from './Pages/DashBoardPages/AdminPages/SalesReport.jsx';
import ManageBanner from './Pages/DashBoardPages/AdminPages/ManageBanner.jsx';
import ManageMedicines from './Pages/DashBoardPages/SellerPages/ManageMedicines.jsx';
import SellerPaymentHistory from './Pages/DashBoardPages/SellerPages/SellerPaymentHistory.jsx';
import Advertisment from './Pages/DashBoardPages/SellerPages/Advertisment.jsx';
import CategoryUpdate from './Pages/DashBoardPages/AdminPages/CategoryUpdate.jsx';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error></Error>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/signUp',
        element:<SignUp></SignUp>
      },
      {
        path:'/login',
        element:<Login></Login>
      }
    ]
  },
  {
    path:'dashboard',
    element:<DashBoard></DashBoard>,
    errorElement:<Error></Error>,
    children:[
      // admin pages
      {
        path:'manageUsers',
        element:<ManageUsers></ManageUsers>
      },
      {
        path:'manageCategory',
        element:<ManageCategory></ManageCategory>
      },
      {
          path:'categoryUpdate/:id',
          element:<CategoryUpdate></CategoryUpdate>
      },
      {
          path:'paymentManage',
          element:<PaymentManagement></PaymentManagement>
      },
      {
        path:'salesReport',
        element:<SalesReport></SalesReport>
      },
      {
        path:'manageBanner',
        element:<ManageBanner></ManageBanner>
      },
      // seller pages
      {
         path:'manageMedicines',
         element:<ManageMedicines></ManageMedicines>
      },
      {
          path:'manageHistory',
          element:<SellerPaymentHistory></SellerPaymentHistory>
      },
      {
         path:'advertisement',
         element:<Advertisment></Advertisment>
      },
      // user pages
      {
        path:'userPaymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
  </React.StrictMode>,
)
