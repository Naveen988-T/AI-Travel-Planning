import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './custom/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'

const router=createBrowserRouter([
  {

    path:'/',
    element:<App/>
  },
  {

    path:'/create-trip',
    element:<CreateTrip />
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip />
  }

 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Header />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>;
   </StrictMode>,
)
