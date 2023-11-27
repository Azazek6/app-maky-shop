import { useContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { GlobalContext } from "./GlobalContext";
import { host } from "@/configuration/utils";

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
  //Estados Principales
  const [tokenData, setTokenData] = useState(null);
  const [tokenPanel, setTokenPanel] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataPanel, setUserDataPanel] = useState(null);
  const [user, setUser] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  //FUNCIONES GENERALES
  const handleClickShowActionBar = () => setActionBar(!actionBar);
  const handleClickShowCredential = () => setShowCredentials(!showCredentials);

  // ----------------------------------------------- FUNCIONES PRINCIPALES --------------------------------------------------
  // -------------- Credenciales
  const signInClient = async (auth) => {
    return await axios.post(`${host}/auth/client`, auth);
  };

  const signInPanel = async (auth) => {
    return await axios.post(`${host}/auth/panel`, auth);
  };

  // -------------- Clientes / Usuarios panel
  const singUp = async (client) => {
    return await axios.post(`${host}/usuarios`, client);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("tokenMakyPanel");
    try {
      const { data } = await axios.get(`${host}/usuarios/${token}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ Marcas
  const createBrand = async (brand) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/marcas/${token}`, brand);
  };

  const fetchBrand = async () => {
    const token = localStorage.getItem("tokenMakyPanel");
    try {
      const { data } = await axios.get(`${host}/marcas/${token}`);
      setBrand(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ Categorias
  const createCategory = async (category) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/categorias/${token}`, category);
  };

  const fetchCategory = async () => {
    const token = localStorage.getItem("tokenMakyPanel");
    try {
      const { data } = await axios.get(`${host}/categorias/${token}`);
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------ Productos
  const createProduct = async (product) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/productos/${token}`, product);
  };

  const fetchProduct = async () => {
    const token = localStorage.getItem("tokenMakyPanel");
    try {
      const { data } = await axios.get(`${host}/productos/${token}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductForId = async (id) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.get(`${host}/productos/${token}/${id}`);
  };

  //Credenciales
  useEffect(() => {
    const token = localStorage.getItem("tokenMakyShop");
    const tokenPanel = localStorage.getItem("tokenMakyPanel");

    if (token) {
      setTokenData(token);
      const tokenDecoded = jwt_decode(token);

      setUserData(tokenDecoded);
    }

    if (tokenPanel) {
      setTokenPanel(tokenPanel);
      const tokenDecoded = jwt_decode(tokenPanel);

      setUserDataPanel(tokenDecoded);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        actionBar,
        tokenPanel,
        userData,
        userDataPanel,
        signInClient,
        signInPanel,
        user,
        brand,
        category,
        product,
        singUp,
        fetchUser,
        createBrand,
        fetchBrand,
        createCategory,
        fetchCategory,
        createProduct,
        fetchProduct,
        fetchProductForId,
        showCredentials,
        handleClickShowActionBar,
        handleClickShowCredential,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
