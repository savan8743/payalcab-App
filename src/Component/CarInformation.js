import React from 'react'
import { useState, useEffect } from 'react';

export default function CarInformation() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        '/cab-rental-services.png',
        '/car-rental-services.jpg',
        '/taxi-rental-services.jpg',
        '/rental-van.jpg'
      ];

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 
    
        return () => clearInterval(interval); 
      }, [images.length]);

  return (<>
    <div className='grid lg:grid-cols-2 sm:grid-cols-1 bg-gray-900 text-white '>
        <div className='mx-5 mt-5 mb-10'>
            <h3 className='font-semibold'>What Do You know About Us</h3>
            <h1 className='text-4xl font-bold pt-1'>WHY PAYAL CAB SERVICE?</h1>
            <p className='pt-5  text-gray-300'>Have you travelled one-way from one city to another, and paid both way charges?</p>
            <p className='pt-5  text-gray-300'>PayalCabServices.in is India’s Leading One-Way Inter City Cab Service Provider.</p>
            <p className='pt-5  text-gray-300'>Now when you travel one-way inter-city, you pay one-way.</p>
            <p className='pt-5  text-gray-300'>We are present in 20+ Cities and provide Payal Cab Services on 100+ Routes. Check all available Routes here .Trusted by 5000 Customers.</p>
        </div>
        <div className='mx-10 mt-5 mb-10'>
                <img src={images[currentImageIndex]} 
                   className=" shadow-lg transition-all duration-500 ease-in-out"
                   />
        </div>
    </div>
    </>)
}
