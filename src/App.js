import React from 'react'
import Header from './Component/Header'
import TripForm from './Component/TripForm'
import LocalHourlyPackages from './Component/LocalHourlyPackages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Outstation from './Component/Outstation';
import SpecialPackage from './Component/Airport';
import Layout from './Component/Layout';
import SuratToAmd from './Component/SuratToAmd';
import RoundTripDetails from './Component/RoundTripDetails';
import EightHourPackage from './Component/EightHourPackage';
import TenHourPackage from './Component/TenHourPackage';
import TwelveHourPackage from './Component/TwelveHourPackage';
import AirportDetails from './Component/AirportDetails';

export default function App() {
  return (
    <div>

        <Router>
        <Header />
            <Routes>
              <Route path='/' element={<Layout />} />
                <Route path="/trip-form" element={<TripForm />} />
                <Route path="/hourly-packages" element={<LocalHourlyPackages />} />
                <Route path="/outstation" element={<Outstation />} />
                <Route path="/specialpackage" element={<SpecialPackage />} />
                <Route path="/surat-to-amd" element={<SuratToAmd />} />
                <Route path="/round-trip-details" element={<RoundTripDetails />} />
                <Route path="/eight-hour-package" element={<EightHourPackage />} />
                <Route path="/ten-hour-package" element={<TenHourPackage />} />
                <Route path="/twelve-hour-package" element={<TwelveHourPackage />} />
                <Route path="/airport-details" element={<AirportDetails />} />

            </Routes>
        </Router>


    </div>
  )
}
