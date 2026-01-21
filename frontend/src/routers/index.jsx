import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/layout.jsx";

import Home from "../pages/home.jsx";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])

export default router;