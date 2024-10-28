"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const EmblaContext = createContext({
  setPrevBtnFxn() {},
  setCurrSlide() {},
  setNextBtnFxn() {},
  clickPrev() {},
  clickNext() {},
  currSlide: 0,
  key: "",
});

export const EmblaContextProvider = ({ children }) => {
  const [prevBtnFxn, setPrevBtnFxn] = useState({
    fxn: () => {
      
    },
  });
  const [nextBtnFxn, setNextBtnFxn] = useState({
    fxn: () => {
      
    },
  });
  const [currSlide, setCurrSlide] = useState(0);
  

  const clickPrev = () => {
    prevBtnFxn.fxn();
  };
  const clickNext = () => {
    nextBtnFxn.fxn();
  };
  const key = nextBtnFxn.fxn.toString() + prevBtnFxn.fxn.toString();

  return (
    <EmblaContext.Provider
      value={{
        setCurrSlide,
        currSlide,
        clickNext,
        clickPrev,
        setNextBtnFxn,
        setPrevBtnFxn,
        key,
      }}
    >
      {children}
    </EmblaContext.Provider>
  );
};
