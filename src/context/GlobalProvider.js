import { useContext, useState } from "react";
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
  //Estado de Navegacion
  const [showCredentials, setShowCredentials] = useState(false);

  //FUNCIONES
  const handleClickShowCredential = ()=> setShowCredentials(!showCredentials)

  return (
    <GlobalContext.Provider
      value={{
        showCredentials,
        handleClickShowCredential
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
