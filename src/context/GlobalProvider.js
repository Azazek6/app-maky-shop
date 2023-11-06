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
  const [actionBar, setActionBar] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  //FUNCIONES
  const handleClickShowActionBar = () => setActionBar(!actionBar);
  const handleClickShowCredential = () => setShowCredentials(!showCredentials);

  return (
    <GlobalContext.Provider
      value={{
        actionBar,
        showCredentials,
        handleClickShowActionBar,
        handleClickShowCredential,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
