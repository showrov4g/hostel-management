import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Meals from "../pages/Meals";
import UpcomingMEals from "../pages/UpcomingMEals";
import AdminDashboard from "../admin/AdminDashboard";
import AdminRoute from "./AdminRoute";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/meals" element={<Meals></Meals>}></Route>
            <Route path="/upcoming-meals" element={<UpcomingMEals></UpcomingMEals>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            

          </Route>
          <Route path="/adminDashboard" element={<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>}>

            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
