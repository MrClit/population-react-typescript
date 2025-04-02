import { QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import RegionPage from "./pages/Region.tsx";
import {queryClient} from "./utils/http.ts";

function App() {

  // Enrutado de la aplicación
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          loader: () => redirect("/region/global"),
        },
        {
          path: '/region/:region',
          element: <RegionPage/>
        }
      ]
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
