import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from './components/AppLayout';
import ContactsList from './Pages/ContactsList';
const ArchieveList = lazy(()=> import("./Pages/ArchieveList"))
const ContactDetails = lazy(()=>import("./Pages/ContactDetails"))
import Error from './Pages/Error';
import Notfound from './Pages/Notfound';
const RoutesComponent = () => {
    const appRouter = createBrowserRouter([
        {
          path: "/",
          element: <AppLayout />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <ContactsList/>,
            },
            {
              path: "/archieves",
              element: <ArchieveList/>
            },
            {
              path: "/activities/:id",
              element: <ContactDetails/>
            },
            {
              path: '*',
              element: <Notfound />,
            },
          ],
        },
      ]);
      
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default RoutesComponent