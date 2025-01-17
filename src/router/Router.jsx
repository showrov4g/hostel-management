import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Meals from "../pages/Meals";
import UpcomingMEals from "../pages/UpcomingMEals";
import AdminDashboard from "../admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AddItem from "../admin/AddItem";
import Cart from "../admin/Cart";
import AllUser from "../admin/AllUser";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/meals" element={<Meals></Meals>}></Route>
            <Route
              path="/upcoming-meals"
              element={<UpcomingMEals></UpcomingMEals>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
         
          </Route>
          <Route>
            <Route path="dashboard" element={<AdminDashboard></AdminDashboard>}>
              <Route path="additem" element={<AddItem></AddItem>}></Route>
              <Route path="cart" element={<Cart></Cart>}></Route>
              <Route path="alluser" element={<AllUser></AllUser>}></Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
