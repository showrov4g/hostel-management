import React from 'react';
import { Link } from 'react-router';

const Errorpage = () => {
    return (
        <div>
               <div className="flex flex-col justify-center items-center space-y-4">
      <h1 className="text-9xl font-bold">OOPS!</h1>
      <h3 className="text-3xl ">404 Page Not Found</h3>
      <p>
        this page your are looking for might have been removed or change
        anything
      </p>
      <Link to="/">
        <button className="btn bg-green-500">Go to home page</button>
      </Link>
    </div>
        </div>
    );
};

export default Errorpage;