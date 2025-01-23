import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

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
import UserProfile from "../admin/UserProfile";
import RequestedMeals from "../admin/RequestedMeals";
import MyReviews from "../admin/MyReviews";
import AdminProfile from "../admin/AdminProfile";
import AllMealsAddedbyAdmin from "../admin/AllMealsAddedbyAdmin";
import UpdateMealsDetails from "../admin/UpdateMealsDetails";
import UpcomingMeals from "../pages/UpcomingMEals";
import AllReviews from "../admin/AllReviews";
import ServeMeals from "../admin/ServeMeals";

const Router = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/allmeals" element={<AllMeals></AllMeals>}></Route>
            <Route
              path="/upcomingmeals"
              element={<PrivateRoute><UpcomingMeals></UpcomingMeals></PrivateRoute>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/mealsdetails/:id"
              element={<PrivateRoute><MealsDetails></MealsDetails></PrivateRoute>}
            ></Route>
          </Route>
          {/* admin route  */}
          <Route>
            <Route path="dashboard" element={<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>}>
              <Route
                path="additem"
                element={
                  <AdminRoute>
                    <AddItem></AddItem>
                  </AdminRoute>
                }
              ></Route>
              <Route path="alluser" element={<AdminRoute><AllUser></AllUser></AdminRoute>}></Route>
              <Route
                path="addUpcomingMeal"
                element={<AdminRoute><AddUpComingMeal></AddUpComingMeal></AdminRoute>}
              ></Route>
              <Route
                path="adminProfile"
                element={<AdminRoute><AdminProfile></AdminProfile></AdminRoute>}
              ></Route>
              <Route
                path="allAddedMealsAdmin"
                element={<AdminRoute><AllMealsAddedbyAdmin></AllMealsAddedbyAdmin> </AdminRoute>}
              ></Route>
              <Route
                path="updateMeals/:id"
                element={<AdminRoute><UpdateMealsDetails></UpdateMealsDetails></AdminRoute>}
              ></Route>
              <Route
                path="allreviews"
                element={<AdminRoute><AllReviews></AllReviews></AdminRoute>}
              ></Route>
              <Route
                path="serve"
                element={<AdminRoute><ServeMeals></ServeMeals></AdminRoute>}
              ></Route>
              {/* users route */}
              <Route path="cart" element={<Cart></Cart>}></Route>
              <Route
                path="userprofile"
                element={<UserProfile></UserProfile>}
              ></Route>
              <Route
                path="requested"
                element={<RequestedMeals></RequestedMeals>}
              ></Route>
              <Route
                path="reviews"
                element={<MyReviews></MyReviews>}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
