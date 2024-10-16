import React, { useState } from 'react';
import banner from '../Images/banner.jpg';
import { useNavigate } from 'react-router-dom';
import OurService from './OurService';
import CarInformation from './CarInformation';

const LocalHourlyPackages = () => {
    const [pickupCity, setPickupCity] = useState('');
    const [dropCity, setDropCity] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('');
    const [person, setPerson] = useState(''); // State for Person
    const [pickupDate, setPickupDate] = useState(''); // State for Pickup Date
    const [pickupTime, setPickupTime] = useState(''); // State for Pickup Time
    const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();

    let targetRoute = '';

    // Determine the target route based on the selected package
    switch (selectedPackage) {
        case '8 hrs 80km':
            targetRoute = '/eight-hour-package';
            break;
        case '10 hrs 100km':
            targetRoute = '/ten-hour-package';
            break;
        case '12 hrs 120km':
            targetRoute = '/twelve-hour-package';
            break;
        default:
            alert('Please select a package before submitting.');
            return;
    }

    // Navigate to the appropriate package page and pass the form data
    navigate(targetRoute, {
        state: {
            pickupCity,
            dropCity,
            selectedPackage,
            person,
            pickupDate,
            pickupTime
        }
    });
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

    const handlespecialpackageclick = () => {
        navigate('/specialpackage');
    };

    // Function to handle package selection
    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
    };

    return (<>
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
                            <button onClick={handlespecialpackageclick} className="bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md">
                            Airport
                            </button>
                        </div>
                        {/* hour button centered */}
                        <div className="flex justify-center mb-3 space-x-2">
                            <button
                                onClick={() => handlePackageClick('8 hrs 80km')}
                                className={`bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md ${selectedPackage === '8 hrs 80km' ? 'bg-orange-500' : ''}`}
                            >
                                8 hrs 80km
                            </button>
                            <button
                                onClick={() => handlePackageClick('10 hrs 100km')}
                                className={`bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md ${selectedPackage === '10 hrs 100km' ? 'bg-orange-500' : ''}`}
                            >
                                10 hrs 100km
                            </button>
                            <button
                                onClick={() => handlePackageClick('12 hrs 120km')}
                                className={`bg-white text-gray-800 border border-gray-300 px-3 py-2 text-sm md:text-base rounded-md shadow-md ${selectedPackage === '12 hrs 120km' ? 'bg-orange-500' : ''}`}
                            >
                                12 hrs 120km
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Row for Pickup City, Person, Date, and Time */}
                            <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-gray-700">Pick Up City</label>
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

                                <div>
                                    <label className="block text-gray-700">Person</label>
                                    <input
                                        type="number"
                                        value={person}
                                        onChange={(e) => setPerson(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Number of Persons"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700">Pickup Date</label>
                                    <input
                                        type="date"
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
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
                                        <option value="06:00">06:00 AM</option>
                                        <option value="07:00">07:00 AM</option>
                                        <option value="08:00">08:00 AM</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                    </select>
                                </div>

                            </div>


                            <div className="sm:col-span-2 flex justify-center">
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
    </>);
};

export default LocalHourlyPackages;
