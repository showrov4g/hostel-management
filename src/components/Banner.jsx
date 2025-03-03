import React from "react";
import "../components/Banner.css";
const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-96 bg-cover "
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/BKW3mNN/rakhmat-suwandi-5yi0-Ii-W1980-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="md:max-w-md">
            <h1 className="mb-5 text-2xl md:text-5xl text-white font-bold">Welcome to your Hostel</h1>
            <p className="mb-5 text-white">
              Hostel food is typically simple, nutritious, and economical. It
              often includes staple meals like rice, vegetables, lentils, or
              bread, catering to diverse dietary preferences.
            </p>
            <div className="flex items-center justify-center">
              <form action="" className="flex flex-col md:flex-row gap-3">
                <input className=" rounded-xl bg-transparent border px-3 py-3 outline-none"
                placeholder="search your food"
                type="search" />
                <input
                  className="btn bg-[#3f8acd] outline-none border-none text-white hover:bg-[#47a3f7]"
                  type="submit"
                  value={"search"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
