import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import CountryDetails from './Pages/CountryDetails.jsx'
import NotFound from './Pages/NotFound.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Assignment requirement: Error Element
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/country/:name", // Assignment requirement: Dynamic Routing
        element: <CountryDetails />
      }
    ]
  },
  {
    path: "*", // Assignment requirement: 404 Page
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)