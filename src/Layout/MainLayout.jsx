import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
      <div>
          <Navbar></Navbar>
        <div className="w-11/12 mx-auto">
            
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
      </div>
    );
};

export default MainLayout;