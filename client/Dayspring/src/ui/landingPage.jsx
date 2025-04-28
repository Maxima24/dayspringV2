import React from 'react'
import NavLayout from './navLayout'
import Hero from './hero'


function LandingPage() {
  return (
    <div className='bg-red-500 h-lvh flex flex-col '>
        <NavLayout/>
        <Hero/>
        
    </div>
  )
}

export default LandingPage