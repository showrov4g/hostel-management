import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;