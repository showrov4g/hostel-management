import React from 'react';

const Newsletter = () => {
    return (
        <div className="mx-auto px-4 py-10 my-20 rounded-3xl bg-[#F9FAFB] shadow-xl">
            <div className="w-full md:w-3/6 mx-auto text-center">
                <h1 className="text-5xl font-extrabold text-[#111827]">Don't Miss New Meals!</h1>
                <h5 className="text-2xl font-semibold text-[#111827] mt-4 mb-6">
                    Subscribe to our newsletter for updates on new and exciting meals.
                </h5>
                <div>
                    <form className="space-y-4">
                        <div className="form-control">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full px-6 py-4 text-lg rounded-xl border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition duration-300"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#6366F1] text-white py-3 px-8 rounded-full text-lg font-semibold transition transform hover:bg-[#06B6D4] hover:scale-105">
                                Subscribe Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
