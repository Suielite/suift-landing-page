import React from "react";
import DottedOverlay from "../assets/images/dotted-overlay.png";
import LightTop from "../assets/images/lightTop.png";
import Image from "next/image";

const HeroOverlay = () => {
  return (
    <div className="relative h-[400px] flex justify-center ">
      <div className="absolute z-[50] ">
        <Image src={LightTop} alt="light top overlay" />
      </div>
      <div className="dotted absolute h-[250px] ">
        <Image src={DottedOverlay} alt="dotted overlay" />
      </div>
      <div className="mt-[190px]  overflow-hidden  h-[570px] g-red-400  w-full relative">
        <CurvedLine />
        <CurvedLine2 />
        <BackLayer1 />
        <BackLayer2 />

        <CenterShadows />
        <MiddleCircle />
        <TopLayer />
      </div>
    </div>
  );
};

export default HeroOverlay;

const CenterShadows = () => {
  return (
    <div className="w-full  justify-center  flex  z-[1] absolute">
      <div className="w-full  overflow-hidden flex justify-center items-start mt-[80px] h-[730px]  relative ">
        <Ellipse1 className="top-3 left-4" />
        <Ellipse1 className="top-4 -left-[60px] size-[40px]" />
        <Ellipse2 />
        <Ellipse3 />
        <Ellipse4 />
      </div>
    </div>
  );
};

const MiddleCircle = () => {
  return (
    <div
      className={`absolute bg-ed-500  z-[70] lef-7 top-[310px]    w-full h-full overflow-hiden justify-center flex `}
    >
      <div className="size-[100px]   bg-re-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="108"
          fill="none"
          viewBox="0 0 120 118"
        >
          <rect
            width="118.5"
            height="116.5"
            x=".75"
            y=".75"
            fill="url(#ia)"
            rx="58.25"
          />
          <rect
            width="118.5"
            height="116.5"
            x=".75"
            y=".75"
            stroke="#fff"
            strokeWidth="1.5"
            rx="58.25"
          />
          <path
            fill="#fff"
            d="M58.752 95.542c.69.689 1.807.689 2.496 0l11.23-11.23a1.765 1.765 0 0 0-2.495-2.496L60 91.798l-9.983-9.982a1.765 1.765 0 1 0-2.495 2.495l11.23 11.23Zm-.517-71.836v70.588h3.53V23.706h-3.53Z"
          />
          <defs>
            <linearGradient
              id="ia"
              x1="60"
              x2="60"
              y1="0"
              y2="118"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8547F6" />
              <stop offset="1" stopColor="#DDCBFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const Ellipse4 = () => {
  return (
    <div
      className={`absolute  z-[1]  w-full h-full overflow-hiden justify-center flex `}
    >
      <div className="w-fit ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="467"
          height="460"
          fill="none"
          viewBox="0 0 677 650"
        >
          <g filter="url(#ga)" opacity=".5">
            <ellipse
              cx="338.503"
              cy="325.336"
              fill="#AF04FF"
              rx="210.503"
              ry="197.074"
            />
            <path
              stroke="url(#gb)"
              strokeOpacity=".25"
              strokeWidth=".558"
              d="M548.727 325.336c0 108.669-94.103 196.794-210.224 196.794s-210.224-88.125-210.224-196.794c0-108.67 94.103-196.795 210.224-196.795s210.224 88.125 210.224 196.795Z"
            />
          </g>
          <defs>
            <linearGradient
              id="gb"
              x1="338.503"
              x2="338.503"
              y1="128.262"
              y2="522.41"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#77679F" stopOpacity="0" />
              <stop offset="1" stopColor="#C8497F" />
            </linearGradient>
            <filter
              id="ga"
              width="675.62"
              height="648.761"
              x=".693"
              y=".955"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_1266"
                stdDeviation="63.653"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const Ellipse3 = () => {
  return (
    <div
      className={`absolute z-[0]  w-full h-full overflow-hiden justify-center flex `}
    >
      <div className="w-fit ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="462"
          height="460"
          fill="none"
          viewBox="0 0 762 760"
        >
          <g filter="url(#fa)">
            <ellipse
              cx="381"
              cy="379.717"
              fill="#5505FF"
              fillOpacity=".65"
              rx="195"
              ry="194.284"
            />
            <path
              stroke="url(#fb)"
              strokeOpacity=".25"
              strokeWidth=".558"
              d="M575.721 379.717c0 107.144-87.179 194.004-194.721 194.004s-194.721-86.86-194.721-194.004c0-107.145 87.179-194.005 194.721-194.005s194.721 86.86 194.721 194.005Z"
            />
          </g>
          <defs>
            <linearGradient
              id="fb"
              x1="381"
              x2="381"
              y1="185.433"
              y2="574.001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#77679F" stopOpacity="0" />
              <stop offset="1" stopColor="#C8497F" />
            </linearGradient>
            <filter
              id="fa"
              width="760.753"
              height="759.321"
              x=".623"
              y=".056"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_1271"
                stdDeviation="92.688"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const Ellipse2 = () => {
  return (
    <div
      className={`absolute z-[2] -top-[200px]  w-full h-full overflow-hiden justify-center flex `}
    >
      <div className="w-fit ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="762"
          height="760"
          fill="none"
          viewBox="0 0 762 760"
        >
          <g filter="url(#wa)">
            <path
              fill="#C8497F"
              d="M576 380.33c0 107.3-87.304 194.284-195 194.284S186 487.63 186 380.33s87.304-194.284 195-194.284S576 273.03 576 380.33Z"
            />
            <path
              stroke="url(#wb)"
              strokeOpacity=".25"
              strokeWidth=".558"
              d="M575.721 380.33c0 107.145-87.179 194.005-194.721 194.005s-194.721-86.86-194.721-194.005S273.458 186.326 381 186.326s194.721 86.859 194.721 194.004Z"
            />
          </g>
          <defs>
            <linearGradient
              id="wb"
              x1="381"
              x2="381"
              y1="186.046"
              y2="574.614"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#77679F" stopOpacity="0" />
              <stop offset="1" stopColor="#C8497F" />
            </linearGradient>
            <filter
              id="wa"
              width="760.753"
              height="759.321"
              x=".623"
              y=".67"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_1273"
                stdDeviation="92.688"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const Ellipse1 = ({ className }) => {
  return (
    <div
      className={`absolute top-[130px] left-[70px] z-20  w-full h-full  justify-center flex `}
    >
      <div className="w-fit  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="528"
          height="223"
          fill="none"
          viewBox="0 0 528 223"
        >
          <g filter="url(#ta)">
            <ellipse cx="264" cy="111.171" fill="#fff" rx="200" ry="47.057" />
            <path
              stroke="url(#tb)"
              strokeOpacity=".25"
              strokeWidth=".558"
              d="M463.721 111.171c0 6.329-5.462 12.447-15.574 18.072-10.088 5.612-24.704 10.675-42.79 14.93-36.166 8.51-86.143 13.775-141.357 13.775s-105.191-5.265-141.357-13.775c-18.086-4.255-32.702-9.318-42.79-14.93-10.112-5.625-15.574-11.743-15.574-18.072 0-6.329 5.462-12.448 15.574-18.073 10.088-5.612 24.704-10.674 42.79-14.93C158.809 69.66 208.786 64.393 264 64.393s105.191 5.266 141.357 13.775c18.086 4.256 32.702 9.318 42.79 14.93 10.112 5.625 15.574 11.744 15.574 18.073Z"
            />
          </g>
          <defs>
            <linearGradient
              id="tb"
              x1="264"
              x2="264"
              y1="64.114"
              y2="158.228"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#77679F" stopOpacity="0" />
              <stop offset="1" stopColor="#C8497F" />
            </linearGradient>
            <filter
              id="ta"
              width="528"
              height="222.114"
              x="0"
              y=".114"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_1277"
                stdDeviation="32"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const TopLayer = () => {
  return (
    <div className="absolute z-10 top-[8px] flex justify-center w-full">
      <div className="   w-fit  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1627"
          height="376"
          fill="none"
          viewBox="0 0 1600 370"
        >
          <g filter="url(#pa)">
            <path fill="#070322" d="M 10 0 A 850 550 0 0 0 1590 0 z" />
          </g>
          <defs>
            <filter
              id="pa"
              width="2128"
              height="866"
              x="0"
              y="0"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="-19" />
              <feGaussianBlur stdDeviation="34.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
              <feBlend
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1_1280"
              />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="-110" />
              <feGaussianBlur stdDeviation="125" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.247894 0 0 0 0 0.00415364 0 0 0 0 0.934798 0 0 0 0.12 0" />
              <feBlend
                in2="effect1_dropShadow_1_1280"
                result="effect2_dropShadow_1_1280"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect2_dropShadow_1_1280"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const BackLayer1 = () => {
  return (
    <div className="absolute -top-[0px] flex justify-center w-full">
      <div className="  mt-10  w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1640"
          height="430"
          viewBox="0 0 1440 430"
          fill="none"
        >
          <g filter="url(#filter0_f_1_1279)">
            <path
              d="M283.091 209.298L70 99.9454L126.858 81.7976C241.6 124.298 480.61 216.836 518.72 246.989C566.358 284.681 807.11 265.137 969.49 265.137C1099.39 265.137 1325.49 144.152 1422.31 83.6589L1535 -35C1527.15 41.6242 1429.17 211.811 1100.11 279.562C771.049 347.314 543.649 298.176 471.082 265.137L283.091 209.298Z"
              fill="white"
              fillOpacity="0.4"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1_1279"
              x="-46"
              y="-151"
              width="1697"
              height="580.5"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="58"
                result="effect1_foregroundBlur_1_1279"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const BackLayer2 = () => {
  return (
    <div className="absolute left-1   -top-[150px] flex justify-center w-full">
      <div className=" mt-4   z-[2] w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1697"
          height="582"
          fill="none"
          viewBox="0 0 1497 582"
        >
          <g filter="url(#qa)">
            <path
              fill="#7305FF"
              d="M329.091 360.821 116 251.469l56.858-18.148C287.6 275.821 526.61 368.359 564.72 398.513c47.638 37.691 288.39 18.147 450.77 18.147 129.9 0 356-120.985 452.82-181.478L1581 116.523c-7.85 76.624-105.83 246.811-434.89 314.563-329.061 67.752-556.461 18.613-629.028-14.426l-187.991-55.839Z"
            />
          </g>
          <defs>
            <filter
              id="qa"
              width="1697"
              height="580.5"
              x="0"
              y=".523"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_1278"
                stdDeviation="58"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const CurvedLine = () => {
  return (
    <div className="absolute -top-[1px] z-[10] flex justify-center w-full">
      <div className="  w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1638"
          height="370"
          viewBox="0 0 1600 370"
          fill="none"
        >
          <path
            d="M 0 0 A 850 550 0 0 0 1600 0"
            stroke="url(#paint0_linear_1_1281)"
            strokeWidth="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_1281"
              x1="50.5"
              y1="186"
              x2="1633"
              y2="186"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0855182" stopColor="white" stopOpacity="0" />
              <stop offset="0.5" stopColor="white" />
              <stop offset="0.905239" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const CurvedLine2 = () => {
  return (
    <div className="absolute -top-[1px] z-[20] flex justify-center w-full">
      <div className="  w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1638"
          height="370"
          viewBox="0 0 1600 370"
          fill="none"
        >
          <path
            d="M 0 0 A 850 550 0 0 0 1600 0"
            stroke="url(#paint0_linear_1_1281)"
            strokeWidth="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_1281"
              x1="50.5"
              y1="186"
              x2="1633"
              y2="186"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0855182" stopColor="gray" stopOpacity="0" />
              <stop offset="0.5" stopColor="gray" />
              <stop offset="0.905239" stopColor="gray" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
