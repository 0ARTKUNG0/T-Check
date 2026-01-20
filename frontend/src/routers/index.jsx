import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/layout.jsx";

import Home from "../pages/home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

export default router;