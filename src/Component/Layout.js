import React from 'react'
import TripForm from './TripForm'
import OurService from './OurService'
import CarInformation from './CarInformation'

export default function Layout() {
  return (
    <div>
        <TripForm />
        <OurService />
        <CarInformation />
    </div>
  )
}
