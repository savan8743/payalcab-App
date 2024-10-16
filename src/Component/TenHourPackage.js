import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { FaBriefcase } from 'react-icons/fa';


const TenHourPackage = () => {
    const location = useLocation();
    const { pickupCity, selectedPackage, pickupDate, pickupTime } = location.state || {};
    const [cabs, setCabs] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://bhadegadiapi.taxiwalataxi.in/api/v1/searchalldata?type=tenHours&seats=')
            .then((response) => response.json())
            .then((data) => {
                setCabs(data.data.taxiDetails);
                console.log('data =>',data.data.taxiDetails);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (<>
        <div>
            <div className='grid lg:grid-cols-6 sm:grid-cols-1 mx-5 px-7 mt-5 py-5 rounded-lg shadow-lg bg-gray-100'>
                <div><h1 className='text-[23px] font-semibold'>Booking Type</h1><h2 className='text-orange-500 font-semibold'>{selectedPackage}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Pick-up Date</h1><h2 className='text-orange-500 font-semibold'>{pickupDate}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Pick-up Time</h1><h2 className='text-orange-500 font-semibold'>{pickupTime}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Pickup-from</h1><h2 className='text-orange-500 font-semibold'>{pickupCity}</h2></div>
            </div>

            {/* card  */}
            <div className='grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 mx-5 md:mx-20'>
                {cabs.map((cab) => {

                    return (
                        <div key={cab._id} className='shadow-lg bg-gray-100 rounded-lg border-2 py-8 md:py-10 flex flex-col items-center'>
                            <img
                                src={`https://bhadegadiapi.taxiwalataxi.in/uploads/${cab.Image}`}
                                className='w-[200px] md:w-[270px] align-middle rounded-lg drop-shadow-lg'
                                alt={cab.Name}
                            />
                            <div className='grid grid-cols-2'>
                                <div className='text-[12px] md:text-[14px] font-normal'>
                                    <p className='mt-5'>Car Name</p>
                                    <p className='mt-5'>Cab Type</p>
                                    <p className='mt-5'>Cab Rate</p>
                                    <p className='mt-5'>Incl KM</p>
                                  
                                </div>
                                <div className='text-[12px] md:text-[14px] font-normal'>
                                    <p className='mt-5'>: {cab.Name}</p>
                                    <p className='mt-5'>: {cab.Type}</p>
                                    <p className='mt-5'>:  {cab.tenHours.actualRateFix} Rs</p>
                                    <p className='mt-5'>: {cab.tenHours.bookingKMLimit} Kms</p> 
                                
                                </div>
                            </div>
                            <div className='flex justify-between w-full px-5 md:px-[65px] mt-5'>
                                <div className='flex'>
                                    <IoPersonSharp size={30} />
                                    <span className='ml-1 text-lg'>{cab.seats}</span>
                                </div>
                                <div className='flex'>
                                    <FaBriefcase size={30} />
                                    <span className='ml-1 text-lg'>{cab.BootSpace}</span>
                                </div>
                            </div>
                            <button className='text-white bg-blue-500 w-full max-w-[300px] text-md py-1 mt-5 hover:bg-blue-600'>
                                Continue
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
   </> );
};

export default TenHourPackage;
