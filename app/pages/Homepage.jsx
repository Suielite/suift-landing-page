import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Perks from '../components/Perks'
import Testimonials from '../components/Testimonials'

import FaqSection from "../components/FaqSection";
import Features from "../components/Features";
import HeaderComponent from "../components/HeaderComponent";

const Homepage = () => {
  console.log("Homepage");
  return (
    <div className="text-white ">
      {/* <Navbar /> */}
      <Hero />
      {/* remove this its just a place holder for other components that  be above */}
      {/* <div id="removeThis" className="h-[400px]"></div> */}
      <Perks />
      <HeaderComponent title="Key Features" />
      <Features />
      <Testimonials />
      <div className="faq w-full mt-10 px-[30px] sm:px-[70px] lg:px-[120px] ">
        <HeaderComponent title="Frequently Asked Questions" />
        <FaqSection />
      </div>
    </div>
  )
}

export default Homepage;
