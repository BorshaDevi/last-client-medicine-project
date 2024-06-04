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
    errorElement:<Error></Error>

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
