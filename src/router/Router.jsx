import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import UpcomingMEals from "../pages/UpcomingMEals";
import AdminDashboard from "../admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AddItem from "../admin/AddItem";
import Cart from "../admin/Cart";
import AllUser from "../admin/AllUser";
import { useState } from "react";
import AllMeals from "../pages/AllMeals";
import MealsDetails from "../pages/MealsDetails";
import AddUpComingMeal from "../admin/AddUpComingMeal";

const Router = () => {
  const [isAdmin, setIsAdmin] = useState(true)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/allmeals" element={<AllMeals></AllMeals>}></Route>
            <Route
              path="/upcoming-meals"
              element={<UpcomingMEals></UpcomingMEals>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/mealsdetails/:id" element={<MealsDetails></MealsDetails>}></Route>
         
          </Route>
          {/* admin route  */}
          <Route>
            <Route path="dashboard" element={<AdminDashboard></AdminDashboard>}>
            <Route path="cart" element={<Cart></Cart>}></Route>
            
            <Route path="additem" element={<AdminRoute><AddItem></AddItem></AdminRoute>}></Route>
            <Route path="alluser" element={<AllUser></AllUser>}></Route>
            <Route path="addUpcomingMeal" element={<AddUpComingMeal></AddUpComingMeal>}></Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
