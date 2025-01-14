import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home></Home>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
