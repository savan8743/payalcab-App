import React from 'react';
import { FaCar } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdGroups } from "react-icons/md";

const OurService = () => {
  return (
    <div className="bg-gray-100 ">
      {/* Header Section */}
      <div className="hidden md:block text-center py-4 bg-gray-100">
  <p className="text-xl font-bold text-red-600">Call: 08460007788</p>
</div>


      {/* Main Section */}
      <div className="mx-10 mt-[190px] md:mt-0 py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-gray-100">
        {/* Card 1 */}
        <div className="bg-gray-50 p-12 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <div className="flex justify-center mb-4 hover:text-gray-500">
            <FaCar size={70} className="text-orange-500 hover:text-gray-500 transition duration-300" />
          </div>
          <h3 className="text-lg font-bold hover:text-gray-500 transition duration-300">RETURN FARE, NOT FAIR!</h3>
          <p className="mt-4 text-gray-600 hover:text-gray-500 transition duration-300">
            Why pay for return journey when you are traveling one-way? Now get discounted AC taxi for your one-way travel.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-50 p-12 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <div className="flex justify-center mb-4 hover:text-gray-500">
            <BiLike size={70} className="text-orange-500 hover:text-gray-500 transition duration-300" />
          </div>
          <h3 className="text-lg font-bold hover:text-gray-500 transition duration-300">2,75,000+ TRIPS COMPLETED</h3>
          <p className="mt-4 text-gray-600 hover:text-gray-500 transition duration-300">
            99% of our guests have never missed the flight. We take pride in our on-time performance.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-50 p-12 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
          <div className="flex justify-center mb-4 hover:text-gray-500">
            <MdGroups size={70} className="text-orange-500 hover:text-gray-500 transition duration-300" />
          </div>
          <h3 className="text-lg font-bold hover:text-gray-500 transition duration-300">1,55,000+ HAPPY CUSTOMERS</h3>
          <p className="mt-4 text-gray-600 hover:text-gray-500 transition duration-300">
            Over 50,000 have trusted our travel. We are the preferred cab provider for GE, L&T, Radio Mirchi, Bajaj Allianz, and more...
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
