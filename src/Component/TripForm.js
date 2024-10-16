import React, { useState } from 'react';
import banner from '../Images/banner.jpg';
import { useNavigate } from 'react-router-dom'; 
import OurService from './OurService';
import CarInformation from './CarInformation';

const TripForm = () => {
    const [pickupCity, setPickupCity] = useState('');
    const [dropCity, setDropCity] = useState('');
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
                
                // alert(`Distance between ${pickupCity} and ${dropCity} is ${kilometers} km.`);
                navigate('/surat-to-amd', { 
                    state: { 
                        pickupCity, 
                        dropCity, 
                        kilometers,   
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

    // Move the onClick handlers outside the handleSubmit function
    const handleHourlyPackagesClick = () => {
        navigate('/hourly-packages');
    };

    const handleOutstationClick = () => {
        navigate('/outstation');
    };

    const handleSpecialPackageClick = () => {
        navigate('/specialpackage');
    };

    return (
        <>
            <div className="bg-gray-200 flex items-center justify-center">
                <div className="w-full relative">
                    <img
                        src={banner}
                        alt="Taxi Background"
                        className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <div className="bg-white bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-lg w-[91%] md:w-4/5 lg:w-3/4 max-w-4xl mt-[243px] md:mt-0">
                            <div className="flex flex-col justify-center mb-4 space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                                <button className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md">
                                    ONE WAY TAXI
                                </button>
                                <button
                                    onClick={handleHourlyPackagesClick}
                                    className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md"
                                >
                                    LOCAL HOURLY PACKAGES
                                </button>
                                <button
                                    onClick={handleOutstationClick}
                                    className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md"
                                >
                                    OUTSTATION
                                </button>
                                <button
                                    onClick={handleSpecialPackageClick}
                                    className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md"
                                >
                                    Airport
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700">Select Pick Up City</label>
                                    <select
                                        value={pickupCity}
                                        onChange={(e) => setPickupCity(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        <option value="">Choose City</option>
                                        <option value="Surat">Surat</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700">Select Drop City</label>
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

                                <div className="sm:col-span-2 flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
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

export default TripForm;
