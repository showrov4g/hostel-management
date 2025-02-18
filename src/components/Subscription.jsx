import React from "react";
import { useNavigate } from "react-router";

const Subscription = () => {
    const navigate = useNavigate()

    const handlePackage=(params)=>{
        navigate(`/checkout/${params}`)
        console.log(params)
    }

    // /checkout/:name
  return (
    <div className="my-20">
        <div className="text-center">
            <h2 className=" text-4xl font-semibold">Your packages </h2>
        </div>
        <div className="grid md:grid-cols-3">
      <div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">Silver</h2>
            <p>price: $20/m</p>
            <div>
                <h6>Basic Meal Plan (Breakfast and Dinner)</h6>
                <h6>Standard Serving Portions</h6>
                <h6>Monthly Menu Rotation</h6>
                <h6>Access to Dining Hall</h6>
            </div>
            <div className="card-actions justify-end">
              <button onClick={()=>handlePackage("silver")} className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div>
      <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">Gold</h2>
            <p>price: $45/m</p>
            <div>
                <h6>Enhanced Meal Plan (Breakfast, Lunch, and Dinner)</h6>
                <h6>Option for Custom Meal Selection</h6>
                <h6>Weekly Menu Updates</h6>
                <h6>Priority Dining Hall Access</h6>
            </div>
            <div className="card-actions justify-end">
              <button onClick={()=>handlePackage("silver")} className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div>
      <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">Platinum</h2>
            <p>price: $80/m</p>
            <div>
                <h6>Premium Meal Plan (All-Day Snacks Included)</h6>
                <h6>Personalized Meal Options</h6>
                <h6>Daily Menu Updates</h6>
                <h6>Access to Exclusive Dining Areas</h6>
                <h6>Complimentary Beverages</h6>
            </div>
            <div className="card-actions justify-end">
              <button onClick={()=>handlePackage("silver")} className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Subscription;
