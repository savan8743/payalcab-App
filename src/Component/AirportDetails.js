import { useLocation } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import { useState, useEffect } from 'react';

const calculatePrice = (distance, actualRatePerKM) => {
    let totalFare = 0;

    if (distance <= 50) 
    {
        totalFare = 100;
    } else if (distance > 50 && distance <= 100) 
    {
        totalFare = Math.ceil(distance * 2.5);
    } else if (distance > 100 && distance <= 150) 
    {
        totalFare = Math.ceil(distance * 2);;
        // console.log('totalfare =>',totalFare);
    } else if (distance > 150 && distance <= 300) 
    {
        totalFare = 300;
    }

    const actualPrice = Math.ceil(totalFare * actualRatePerKM);
    return actualPrice;
};

const AirportDetails = () => {
    const location = useLocation();
    const { 
        pickupCity, 
        dropCity, 
        selectedPackage, 
        kilometers,
        returnDate, 
        pickupTime 
    } = location.state?.airportData || {}; 

    const [cabs, setCabs] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchCabs = async () => {
            try {
                const response = await fetch('https://bhadegadiapi.taxiwalataxi.in/api/v1/searchalldata?type=airportTrip&seats=');
                const data = await response.json();

                // Assuming the cabs data is in 'taxiDetails' property
                if (response.ok && data.data && data.data.taxiDetails) {
                    setCabs(data.data.taxiDetails);  // Set fetched data in state
                } else {
                    console.error("Failed to fetch cabs:", data.message);
                }

            } catch (error) {
                console.error("Error during fetch:", error);
            }
        };

        fetchCabs();
    }, []);

    return (
        <div>
        <div className='grid lg:grid-cols-6 sm:grid-cols-1 mx-5 px-7 mt-5 py-5 rounded-lg shadow-lg bg-gray-100'>
            <div>
                <h1 className='text-[23px] font-semibold'>Booking Type</h1>
                <h2 className='text-orange-500 font-semibold'>{selectedPackage}</h2>
            </div>
            <div>
                <h1 className='text-[23px] font-semibold'>Pick-up Date</h1>
                <h2 className='text-orange-500 font-semibold'>{returnDate}</h2>
            </div>
            <div>
                <h1 className='text-[23px] font-semibold'>Pick-up Time</h1>
                <h2 className='text-orange-500 font-semibold'>{pickupTime}</h2>
            </div>
            <div>
                <h1 className='text-[23px] font-semibold'>Pickup-from</h1>
                <h2 className='text-orange-500 font-semibold'>{pickupCity}</h2>
            </div>
            <div>
                <h1 className='text-[23px] font-semibold'>To-Destination</h1>
                <h2 className='text-orange-500 font-semibold'>{dropCity}</h2>
            </div>
            <div>
                <h1 className='text-[23px] font-semibold'>Distance</h1>
                <h2 className='text-orange-500 font-semibold'>{Math.ceil(kilometers)} Km</h2>
            </div>
        </div>

        {/* card  */}
        <div className='grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 mx-5 md:mx-20'>
                {cabs.map((cab) => {
                    const actualRatePerKM = cab.onewayTrip?.actualRatePerKM || cab.airportTrip?.actualRatePerKM;  // Safely access actualRatePerKM
                    const actualPrice = calculatePrice(kilometers, actualRatePerKM || 0);  // Use 0 if actualRatePerKM is undefined

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
                                    <p className='mt-5'>Per KM</p>
                                </div>
                                <div className='text-[12px] md:text-[14px] font-normal'>
                                    <p className='mt-5'>: {cab.Name}</p>
                                    <p className='mt-5'>: {cab.Type}</p>
                                    <p className='mt-5'>: Rs {Math.ceil(actualPrice)}</p>
                                    <p className='mt-5'>: {Math.ceil(kilometers)} Kms</p>
                                    <p className='mt-5'>: Rs {actualRatePerKM || 'N/A'} / KM</p>
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

    );
};

export default AirportDetails;
