import React from 'react';

const Newsletter = () => {
    return (
      <div className=" mx-auto px-4 py-10 my-20 rounded-xl bg-[#3f8acd] bg-opacity-15 shadow-md ">
      <div className="w-full md:w-3/6 mx-auto">
        <h1 className=" text-4xl font-bold">Don't miss new meals!</h1>
        <h5 className="text-2xl font-semibold">
          Subscribe to your newsletter to get updates on new meals.
        </h5>
        <div>
          <form className="card-body">
            <div className="form-control">
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#3f8acd] hover:bg-[#6052ed]">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Newsletter;