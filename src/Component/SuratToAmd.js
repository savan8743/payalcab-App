import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";

// Function to calculate price based on distance and rate per KM
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


const SuratToAmd = () => {
    const location = useLocation();
    const { pickupCity, dropCity, kilometers } = location.state || {};
    const [cabs, setCabs] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchCabs = async () => {
            try {
                const response = await fetch('https://bhadegadiapi.taxiwalataxi.in/api/v1/searchalldata?type=onewayTrip&seats=4');
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
        <>
            <div className='bg-gray-100'>
                <div className='pt-10 ml-5 sm:ml-[40px]'>
                    <h1 className='text-orange-600 text-xl sm:text-2xl font-semibold'>
                        One Way Taxi From {pickupCity} To {dropCity}
                    </h1>
                </div>

                <div className='grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10 mx-5 md:mx-20'>
                    {cabs.map((cab) => {
                        const actualPrice = calculatePrice(kilometers, cab.onewayTrip.actualRatePerKM);  // Calculate the actual price for each cab

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
                                        <p className='mt-5'>: Rs {cab.onewayTrip.actualRatePerKM} / KM</p>
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

                {/* detail  */}
                    <div className='px-5 sm:px-10 lg:px-20'>
    <h1 className='text-orange-500 text-lg sm:text-xl font-semibold'>One Way Taxi Book Outstation Taxi, Cabs Online - Why HindustanTaxi Service?</h1>
    <p className='text-black mt-3 text-sm sm:text-base'>
        One Way Taxi is the largest Outstation Taxi Payal Cabs Service provider in India. It has been offering exceptional Intercity car rental services for Mumbai Airport to Surat, Mumbai to Pune Cab, Pune to Mumbai Taxi, Mumbai to Nashik Cabs, Mumbai to Shirdi Cab Booking, Mumbai to Surat, Mumbai airport to Pune, Pune to Mahabaleshwar, Pune to Shirdi, Delhi to Jaipur, Bangalore to Coorg, Lonavala to Mumbai one-way, round-trip and local city including Mumbai, Pune, Nashik, Shirdi, Bangalore, Delhi, Jaipur, Hyderabad and Other top cities in India. One Way Taxi Cab provides its customers freedom to choose from a huge fleet of outstation cabs which comprises of numerous car models like Swift-Dzire, Toyota-Etios, Toyota-Innova, Tempo-Traveller and many more at unquestionably the cheapest rates. Outstation travellers today can rent a car for weekend getaways, honeymoon trips, business meetings, local sightseeing, destination holidays, or any other taxi rental services.
    </p>
    <p className='text-black mt-3 text-sm sm:text-base'>
        The leading player in online cab bookings in India, PayalCab offers great offers on cab fares, exclusive discounts, and a seamless online booking experience. Cabs, cars, taxi, and holiday bookings through the desktop or mobile site are a delightfully customer-friendly experience, and with just a few clicks, you can complete your booking.
    </p>

    <h1 className='text-orange-500 text-lg sm:text-xl font-semibold mt-3'>Booking Cabs with HindustanTaxi Service</h1>
    <p className='text-black mt-3 text-sm sm:text-base'>
        Book your cabs with India's leading online booking company since the year 2000. While booking cabs with PayalCab, you can expect the ultimate online booking experience. With premium customer service, a 24/7 dedicated helpline for support, and over 5 thousand delighted customers, PayalCab takes great pride in enabling customer satisfaction. With the cheapest rates, book your cab at the lowest prices. Avail great offers, exclusive on the website.
    </p>

    <h1 className='text-orange-500 text-lg sm:text-xl font-semibold mt-3'>HindustanTaxi Service Promise of Quality</h1>
    <p className='text-black mt-3 text-sm sm:text-base'>
        Our core values put our customers at the center of our business, and we go that extra mile to service them satisfactorily. For any queries/complaints, customers can reach out to us at our contact number.
    </p>

    <h1 className='text-orange-500 text-lg sm:text-xl font-semibold mt-3'>Our Rental Cars (Begin your journey now)</h1>

    <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-5 sm:gap-8 mt-5'>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>AC HATCHBACK</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
                <b>Available Cab:</b> Indica Vista, Suzuki Swift, Hyundai Eon, Toyota Liva, Duston Go, Hyundai I10.
            </h6>
        </div>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>AC SEDAN</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
                <b>Available Cab:</b> Tata Indigo, Swift Dzire, Toyota Etios, Hyundai Xcent, Honda Amaze, Ford Figo.
            </h6>
        </div>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>AC SUV</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
                <b>Available Cab:</b> Toyota Innova, Mahindra Xylo, Tata Aria, Renault Lodgy, Nissan Evalia, Maruti Ertiga.
            </h6>
        </div>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>Tempo Traveller</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
                <b>Available Cab:</b> Seater Tempo, 12 Seater Tempo, 15 Seater Tempo & 20 Seater Tempo.
            </h6>
        </div>
    </div>

    <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-5 sm:gap-8 mt-5'>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>Inclusive Fixed Fare</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
            Fare inclusive of Driver Allowance & Other Charges except Government Taxes.
            </h6>
        </div>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>No Charges for Extra KMs</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
            Remove your eyes off Odometer as we don't charge by KMs.
            </h6>
        </div>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>Trusted by 5,000+ Customers</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
            Over 5,000 have trusted us with their travel. We are preferred cab provider for : GE, L&T, Radio Mirchi, Bajaj Allianz and others.
            </h6>
        </div>
        <div className='w-full rounded-md border-2 border-orange-600'>
            <h1 className='text-center py-2 bg-orange-600 text-sm sm:text-base'>No Cancellation Fees</h1>
            <h6 className='text-center py-3 px-4 sm:px-8 text-sm'>
            We understand Plans change, that’s why we do not charge any Cancellation Fees.
            </h6>
        </div>
    </div>
</div>
            </div>
        </>
    );
};

export default SuratToAmd;
