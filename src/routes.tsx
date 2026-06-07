import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import CriptoDetails from "./pages/CriptoDescription/CriptoDetails";
import ErrorRoutes from "./pages/ErrorRoutes/ErrorRoutes";
// Layout
import Layout from "./components/layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/criptoDetails/:cripto",
                element: <CriptoDetails />
            },
            {
                path: "*",
                element: <ErrorRoutes />,
            }
        ]
    }
]);

export default router;