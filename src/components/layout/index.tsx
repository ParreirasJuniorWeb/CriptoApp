// import my components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// import react-router-dom Outlet component
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;