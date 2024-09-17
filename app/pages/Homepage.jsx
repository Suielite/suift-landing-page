import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroComponent from "../components/HeroEdited";

import Perks from "../components/Perks";
import Testimonials from "../components/Testimonials";

import FaqSection from "../components/FaqSection";
import Features from "../components/Features";
import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/Footer";

const Homepage = () => {
  console.log("Homepage");
  return (
    <div className="text-white w-screen overflow-x-hidden">
      {/* <Navbar /> */}
      {/* <Hero /> */}
      {/* rename to hero the reason is the bg image you used was about 4mb which would
       take a lot of time for page load
       so i used an svg if it fits you can rename the hero edited component to hero
      
      */}
      <HeroComponent />

      <Perks />
      <HeaderComponent title="Key Features" />
      <Features />

      <Testimonials />

      <HeaderComponent title="Frequently Asked Questions" />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Homepage;
