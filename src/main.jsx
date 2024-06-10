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
import Shop from './Pages/Shop/Shop.jsx';
import Cart from './Pages/Home/Cart/Cart.jsx';

import CategoryDetail from './Pages/Home/CategoryDetail/CategoryDetail.jsx';
import PrivateRoute from './Router/PrivateRouter/PrivateRoute.jsx';
import AdminRoute from './Router/AdminRoute/AdminRoute.jsx';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile.jsx';
import CheckOut from './Pages/CheckOut/CheckOut.jsx';
import InvoicePage from './Pages/CheckOut/InvoicePage.jsx';
import SellerRoute from './Router/SellerRoute/SellerRoute.jsx';
import { HelmetProvider } from 'react-helmet-async';

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
      },
      {
        path:'/shop',
        element:<Shop></Shop>
      },
      {
        path:'/cart',
        element:<PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
          path:'/categoryDetail/:category',
          element:<PrivateRoute><CategoryDetail></CategoryDetail></PrivateRoute>
      },
      {
        path:'/updateProfile',
        element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
            path:'/checkout',
            element:<PrivateRoute><CheckOut></CheckOut></PrivateRoute>
      },
      {
        path:'/invoicePage',
        element:<PrivateRoute><InvoicePage></InvoicePage></PrivateRoute>
      },
      
      
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
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path:'manageCategory',
        element:<AdminRoute><ManageCategory></ManageCategory></AdminRoute>
      },
      {
          path:'categoryUpdate/:id',
          element:<AdminRoute><CategoryUpdate></CategoryUpdate></AdminRoute>
      },
      {
          path:'paymentManage',
          element:<AdminRoute><PaymentManagement></PaymentManagement></AdminRoute>
      },
      {
        path:'salesReport',
        element:<AdminRoute><SalesReport></SalesReport></AdminRoute>
      },
      {
        path:'manageBanner',
        element:<AdminRoute><ManageBanner></ManageBanner></AdminRoute>
      },
      // seller pages
      {
         path:'manageMedicines',
         element:<SellerRoute><ManageMedicines></ManageMedicines></SellerRoute>
      },
      {
          path:'manageHistory',
          element:<SellerRoute><SellerPaymentHistory></SellerPaymentHistory></SellerRoute>
      },
      {
         path:'advertisement',
         element:<SellerRoute><Advertisment></Advertisment></SellerRoute>
      },
      // user pages
      {
        path:'userPaymentHistory',
        element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
    
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <HelmetProvider>

  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
    </QueryClientProvider>
    </HelmetProvider>
  </AuthProvider>
  </React.StrictMode>,
)
