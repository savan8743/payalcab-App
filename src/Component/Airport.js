import React, { useState , useEffect } from 'react';
import banner from '../Images/banner.jpg';
import { useNavigate } from 'react-router-dom';
import OurService from './OurService';
import CarInformation from './CarInformation';

const Airport = () => {
    const [pickupCity, setPickupCity] = useState('');
    const [dropCity, setDropCity] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('From Airport'); // Set default package
    const [numberOfPersons, setNumberOfPersons] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [distance, setDistance] = useState('');
    const navigate = useNavigate();

   


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { cityname1: pickupCity, cityname2: dropCity };

        try {
            const response = await fetch('https://bhadegadiapi.taxiwalataxi.in/api/v1/adddistance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                const kilometers = data?.result?.distance; 
                console.log('data =>',data);
                const airportData = {
                                pickupCity,
                                dropCity,
                                selectedPackage,
                                numberOfPersons,
                                returnDate,
                                pickupTime,
                                kilometers
                            };

                navigate('/airport-details', { 
                    state: { 
                        airportData,  
                           
                    } 
                });
            } else {
                const errorData = await response.json();
                console.error('Failed to fetch distance:', errorData.message);
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    

    const handleHourlyPackagesClick = () => {
        navigate('/hourly-packages');
    };

    const HandleTripFormClick = () => {
        navigate('/trip-form');
    };

    const handleOutstationclick = () => {
        navigate('/outstation');
    };

    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
    };

    return (
        <>
            <div className="bg-gray-200 flex items-center justify-center ">
                <div className="w-full relative">
                    <img
                        src={banner}
                        alt="Taxi Background"
                        className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 md:px-8">
                        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-3xl mt-52 md:mt-0">
                            <div className="flex flex-col justify-center mb-4 space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                                <button onClick={HandleTripFormClick} className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md">
                                    ONE WAY TAXI
                                </button>
                                <button onClick={handleHourlyPackagesClick} className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md">
                                    LOCAL HOURLY PACKAGES
                                </button>
                                <button onClick={handleOutstationclick} className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md">
                                    OUTSTATION
                                </button>
                                <button className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md">
                                    Airport
                                </button>
                            </div>

                            <div className="flex justify-center mb-3 space-x-2">
                                <button
                                    onClick={() => handlePackageClick('From Airport')}
                                    className={`bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md ${selectedPackage === 'From Airport' ? 'bg-orange-500' : ''}`}
                                >
                                    From Airport
                                </button>
                                <button
                                    onClick={() => handlePackageClick('To Airport')}
                                    className={`bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md ${selectedPackage === 'To Airport' ? 'bg-orange-500' : ''}`}
                                >
                                    To Airport
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {/* Conditionally render fields based on selected package */}
                                {selectedPackage === 'From Airport' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-700">From Airport</label>
                                            <select
                                                value={pickupCity}
                                                onChange={(e) => setPickupCity(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            >
                                                <option value="">Choose City</option>
                                                <option value="Mumbai, Maharashtra 400099, India">Mumbai, Maharashtra 400099, India</option>
                                                <option value="New Delhi, Delhi 110037, India">New Delhi, Delhi 110037, India</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">To Destination</label>
                                            <select
                                                value={dropCity}
                                                onChange={(e) => setDropCity(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            >
                                                <option value="">Choose City</option>
                                                <option value="Surat">Surat</option>
                                                <option value="Navsari">Navsari</option>
                                                <option value="Bardoli">Bardoli</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {selectedPackage === 'To Airport' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-700">From Airport</label>
                                            <select
                                                value={pickupCity}
                                                onChange={(e) => setPickupCity(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            >
                                                <option value="">Choose City</option>
                                                <option value="Surat">Surat</option>
                                                <option value="Ahmedabad">Ahmedabad</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700">To Destination</label>
                                            <select
                                                value={dropCity}
                                                onChange={(e) => setDropCity(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            >
                                                <option value="">Choose City</option>
                                                <option value="Mumbai, Maharashtra 400099, India">Mumbai, Maharashtra 400099, India</option>
                                                <option value="New Delhi, Delhi 110037, India">New Delhi, Delhi 110037, India</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block text-gray-700">Persons</label>
                                    <input
                                        type="number"
                                        value={numberOfPersons}
                                        onChange={(e) => setNumberOfPersons(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Enter number of persons"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700">Return Date</label>
                                    <input
                                        type="date"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700">Pickup Time</label>
                                    <select
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        <option value="">Select Time</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">01:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                        <option value="17:00">05:00 PM</option>
                                        <option value="18:00">06:00 PM</option>
                                        <option value="19:00">07:00 PM</option>
                                        <option value="20:00">08:00 PM</option>
                                    </select>
                                </div>

                                <div className="col-span-1 md:col-span-5 flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <OurService />
            <CarInformation />
        </>
    );
};

export default Airport;
