import React, { useState } from 'react';
import banner from '../Images/banner.jpg';
import { useNavigate } from 'react-router-dom';
import OurService from './OurService';
import CarInformation from './CarInformation';

const Outstation = () => {
    const [pickupCity, setPickupCity] = useState('');
    const [dropCity, setDropCity] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {  // Add async here
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
                const kilometers = data?.result?.distance;  // Extract distance from response
                console.log('kilometers =>',kilometers);

                const formData = {
                    pickupCity,
                    dropCity,
                    pickupDate,
                    returnDate,
                    pickupTime,
                    numberOfPersons,  
                    kilometers     
                };
    
                // alert(`Distance between ${pickupCity} and ${dropCity} is ${kilometers} km.`);
                navigate('/round-trip-details', { state: formData });
    
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
        navigate('/hourly-packages');  // Navigate to the hourly packages page
    };

    const HandleTripFormClick = () => {
        navigate('/trip-form');
    };

    const handlespecialpackageclick = () => {
        navigate('/specialpackage');
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
                        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg w-full max-w-3xl mt-[525px] md:mt-0">
                            {/* Navigation Buttons */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-4">
                                <button onClick={HandleTripFormClick} className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-md text-center">
                                    ONE WAY TAXI
                                </button>
                                <button onClick={handleHourlyPackagesClick} className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-md text-center">
                                    LOCAL HOURLY PACKAGES
                                </button>
                                <button className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-md text-center">
                                    OUTSTATION
                                </button>
                                <button onClick={handlespecialpackageclick} className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-md text-center">
                                Airport
                                </button>
                            </div>

                            {/* Form with adjusted margin */}
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 ">
                                {/* Row with Pick Up City and Drop City */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium">Select Pick Up City</label>
                                        <select
                                            value={pickupCity}
                                            onChange={(e) => setPickupCity(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        >
                                            <option value="">Choose City</option>
                                            <option value="Surat">Surat</option>
                                            <option value="Navsari">Navsari</option>
                                            <option value="Bardoli">Bardoli</option>
                                        </select>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium">Select Drop City</label>
                                        <select
                                            value={dropCity}
                                            onChange={(e) => setDropCity(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        >
                                            <option value="">Choose City</option>
                                            <option value="Ahmedabad">Ahmedabad</option>
                                            <option value="Vapi">Vapi</option>
                                            <option value="Mumbai">Mumbai</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row with Pickup Date and Return Date */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium">Pickup Date</label>
                                        <input
                                            type="date"
                                            value={pickupDate}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium">Return Date</label>
                                        <input
                                            type="date"
                                            value={returnDate}
                                            onChange={(e) => setReturnDate(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>
                                </div>

                                {/* Row with Pickup Time and Number of Persons */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium">Pickup Time</label>
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

                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium">Persons</label>
                                        <input
                                            type="number"
                                            value={numberOfPersons}
                                            onChange={(e) => setNumberOfPersons(e.target.value)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            placeholder="Enter number of persons"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center mt-6">
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

export default Outstation;
