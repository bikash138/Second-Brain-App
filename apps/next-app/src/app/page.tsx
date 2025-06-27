import Footer from '@/components/Landing/Footer'
import Hero from '@/components/Landing/Hero'
import { SignedOut } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
   <>
   <SignedOut>
      <Hero/>
      <Footer/>    
    </SignedOut>
   </>
  )
}

export default Home