import React from 'react';

const MyPaymentHistory = () => {
    return (
        <div>
            <h1 className='text-3xl front bold'>Your Payment History</h1>
            <table className="table">
            {/* head */}
            <thead  className="bg-primary text-white font-bold">
              <tr>
                <th></th>
                <th>Meal Name</th>
                <th>likes</th>
                <th>Reviews</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              
            </tbody>
          </table>
        </div>
    );
};

export default MyPaymentHistory;