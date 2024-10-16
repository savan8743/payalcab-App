import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";

// Function to calculate the price based on distance and rate per KM
const calculatePrice = (distance, actualRatePerKM, days, includedKM) => {
    console.log(`Calculating price for distance: ${distance}, rate per KM: ${actualRatePerKM}`);
    let totalFare = 0;

    // If days is 1, price is calculated based on includedKM multiplied by actualRatePerKM
    if (days === 1) {
        totalFare = Math.ceil(Math.ceil(includedKM) * actualRatePerKM);
    } else {
        // Existing fare calculation logic for multiple days
        if (distance <= 50) {
            totalFare = 100;
        } else if (distance > 50 && distance <= 100) {
            totalFare = Math.ceil(distance * 2.5);
        } else if (distance > 100 && distance <= 150) {
            totalFare = Math.ceil(distance * 2);
        } else if (distance > 150 && distance <= 300) {
            totalFare = 300;
        }

        // Adjust the total fare based on days
        totalFare = Math.ceil(totalFare * actualRatePerKM * days);
    }

    console.log('actualPrice =>', totalFare);
    return totalFare;
};

// Function to calculate the number of days between two dates, inclusive of both pickup and return dates
const calculateDays = (pickupDate, returnDate) => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffInTime = end.getTime() - start.getTime();
    const days = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    console.log('days =>', days);
    return Math.ceil(days) + 1; // Add 1 to include the start date as well
};

// Function to get included KM based on distance and number of days
const getIncludedKM = (distance, days) => {
    let includedKM = 0;

    // When the number of days is 1, double the received kilometers
    if (days === 1) {
        includedKM = distance * 2;
    } else {
        // When the number of days is greater than 1
        if (distance <= 50) {
            includedKM = 125;
        } else if (distance > 50 && distance <= 100) {
            includedKM = Math.ceil(distance * 2.5);
        } else if (distance > 100 && distance <= 150) {
            includedKM = Math.ceil(distance * 2);
        } else if (distance > 150 && distance <= 300) {
            includedKM = 300;
        } else {
            includedKM = distance;
        }

        includedKM = includedKM * days; // Multiply included kilometers by the number of days
    }
    return includedKM;
   
};

export default function RoundTripDetails() {
    const location = useLocation();
    const { pickupCity, dropCity, pickupDate, returnDate, pickupTime, numberOfPersons, kilometers } = location.state || {};
    console.log('Received kilometers:', kilometers);

    const [cabs, setCabs] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchCabs = async () => {
            try {
                const response = await fetch('https://bhadegadiapi.taxiwalataxi.in/api/v1/searchalldata?type=roundTrip&seats=4');
                const data = await response.json();

                if (response.ok && data.data && data.data.taxiDetails) {
                    setCabs(data.data.taxiDetails);  // Set fetched data in state
                } else {
                    console.error("Failed to fetch cabs:", data.message);
                    setError(data.message); // Set error message
                }
            } catch (error) {
                console.error("Error during fetch:", error);
                setError("An unexpected error occurred while fetching cab details."); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchCabs();
    }, []);

    // Calculate number of days between pickup and return dates
    const days = calculateDays(pickupDate, returnDate);

    return (
        <div>
            <div className='grid lg:grid-cols-6 sm:grid-cols-1 mx-5 px-7 mt-5 py-5 rounded-lg shadow-lg bg-gray-100'>
                <div><h1 className='text-[23px] font-semibold'>Pickup-from</h1><h2 className='text-orange-500 font-semibold'>{pickupCity}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Pickup-to</h1><h2 className='text-orange-500 font-semibold'>{dropCity}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Pick-up Date</h1><h2 className='text-orange-500 font-semibold'>{pickupDate}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Drop Date</h1><h2 className='text-orange-500 font-semibold'>{returnDate}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Pick-up Time</h1><h2 className='text-orange-500 font-semibold'>{pickupTime}</h2></div>
                <div><h1 className='text-[23px] font-semibold'>Persons</h1><h2 className='text-orange-500 font-semibold'>{numberOfPersons}</h2></div>
            </div>

            {/* Loading, Error, and Cabs */}
            {loading && <div className='text-center my-10'>Loading cabs...</div>}
            {error && <div className='text-center my-10 text-red-500'>{error}</div>}
            {cabs.length === 0 && !loading && <div className='text-center my-10'>No cabs available at the moment.</div>}

            {/* Cards */}
            <div className='grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 mx-5 md:mx-20'>
                {cabs.map((cab) => {
                    const inclKM = getIncludedKM(kilometers, days);
                    const actualPrice = calculatePrice(kilometers, cab.roundTrip.actualRatePerKM, days, inclKM);  // Calculate price

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
                                    <p className='mt-5'>: {Math.ceil(inclKM)} Kms</p> {/* Adjusted included KM */}
                                    <p className='mt-5'>: Rs {cab.roundTrip.actualRatePerKM} / KM</p>
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
}
