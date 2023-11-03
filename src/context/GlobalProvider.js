import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useApps must be used within a GlobalContextProvider");
  }
  return context;
};

export const GlobalContextProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
