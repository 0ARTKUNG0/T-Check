import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/layout.jsx";

import Home from "../pages/home.jsx";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";
import ForgetPassword from "../pages/forgetPassword.jsx";
import UserPage from "../pages/userPage.jsx";
import NotAllowed from "../pages/notAllowed.jsx";

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
                element: <UserPage> <Register /> </UserPage>
            },
            {
                path: "/login",
                element: <UserPage> <Login /> </UserPage>
            },
            {
                path: "/forget-password",
                element: <UserPage> <ForgetPassword /> </UserPage>
            },
            {
                path: "/*",
                element: <NotAllowed />
            }
        ]
    }
])

export default router;