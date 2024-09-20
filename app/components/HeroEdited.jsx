import React from "react";
import bgImage from "../assets/images/hero-bg.png";
import Image from "next/image";
import Navbar from "./Navbar";
import HorizontalInfoScroll from "./HorizontalInfoScroll";
import blockImage from "../assets/images/block.png";
import HeroOverlay from "./HeroOverlay";

const HeroEdited = () => {
  return (
    <section className="lg:h-[150dvh]">
      <div className="w-full h-full">
        <div className="relative h-full w-full">
          <div className="relative w-full h-full z-10">
            <div className="absolute -z-[1] h-full w-full">
              <HeroOverlay />
            </div>
            <div>
              <Navbar />
            </div>
            <div className="flex  items-center flex-col gap-y-7 mt-5">
              <div
                style={{
                  WebkitTextFillColor: "transparent",
                }}
                className="bg-gradient-to-b from-[#FFFFFF] to-slate-600 bg-clip-text text-5xl max-w-[90%] min-w-[300px] sm:text-6xl  lg:text-[80px] lg:leading-[84px]  font-Syne font-normal text-center capitalize "
              >
                <h1>
                  Revolutionizing <br />
                  Messaging with privacy <br />& speed
                </h1>
              </div>

              <p className="text-white font-Poppins text-lg sm:leading-[32.4px] sm:text-[24px] w-[300px] sm:w-[500px] font-extralight text-center">
                Experience secure, decentralized <br /> communication built on
                the Sui Blockchain
              </p>
            </div>
            <div className="mt-[13rem] ">
              <HorizontalInfoScroll />
            </div>

            <div className="w-full flex justify-center my-20">
              <div className="md:w-[90%] lg:w-[70%] h-full flex flex-col md:flex-row  bg-gradient-to-r from-[#B779F533] to-[#8547F61A] rounded-2xl">
                <div className="md:w-1/2 px-4 pb-5 md:pb-0 flex flex-col md:flex-row items-center gap-x-5">
                  <div>
                    <Image
                      src={blockImage}
                      className="w-[178px] h-[174px]"
                      alt="block image"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-[23px] text-center md:text-start leading-[32.2px] font-medium">
                      Give You 100% Privacy
                    </h2>
                    <p className="md:text-[17px] lg:text-[18px] text-center md:text-start leading-[24.3px] font-normal">
                      Give You 100% Security. <br />
                      Give You 100% Security
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 px-4 pb-5 md:pb-0 flex flex-col md:flex-row justify-between items-center gap-x-5 border-t-[1px] md:border-t-0 md:border-l-[1px] border-gray-100">
                  <div>
                    <h1 className="text-[80px] font-medium">90%</h1>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-[23px] text-center md:text-start leading-[32.2px] font-medium">
                      Give You 100% Security
                    </h2>
                    <p className="md:text-[17px] lg:text-[18px] text-center md:text-start leading-[24.3px] font-normal">
                      Give You 100% Security. Give You 100% Security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEdited;
