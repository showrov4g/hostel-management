import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Meals from "../pages/Meals";
import UpcomingMEals from "../pages/UpcomingMEals";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
