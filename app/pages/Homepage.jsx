import React from "react";
// import Hero from "../components/Hero";
import HeroComponent from "../components/HeroEdited";

import Perks from "../components/Perks";
import Testimonials from "../components/Testimonials";

import FaqSection from "../components/FaqSection";
import Features from "../components/Features";
import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/Footer";

const OPTIONS = { loop: true }
// const SLIDE_COUNT = 5
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Homepage = () => {
  return (
    <div className="text-white w-screen overflow-x-hidden">
      {/* <Hero /> */}
      {/* rename to hero the reason is the bg image you used was about 4mb which would
       take a lot of time for page load
       so i used an svg if it fits you can rename the hero edited component to hero
      
      */}
      <HeroComponent />

      <Perks />
      <HeaderComponent title="Key Features" />
      <Features />

      <Testimonials options={OPTIONS} />

      <div className="flex flex-col mt-[10rem]">
        <HeaderComponent title="Frequently Asked Questions" />
        <FaqSection />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
