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

  const UpdateUser = async (id, client) => {
    const token = localStorage.getItem("tokenMakyShop");
    const tokenPanel = localStorage.getItem("tokenMakyPanel");
    if (token) {
      return await axios.put(`${host}/usuarios/${token}/${id}`, client);
    }

    if (tokenPanel) {
      return await axios.put(`${host}/usuarios/${tokenPanel}/${id}`, client);
    }
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

  const fetchUserForId = async (id) => {
    const token = localStorage.getItem("tokenMakyShop");
    const tokenPanel = localStorage.getItem("tokenMakyPanel");
    if (token) {
      return await axios.get(`${host}/usuarios/${token}/id/${id}`);
    }
    if (tokenPanel) {
      return await axios.get(`${host}/usuarios/${tokenPanel}/id/${id}`);
    }
  };

  // ------------------ Marcas
  const createBrand = async (brand) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/marcas/${token}`, brand);
  };

  const updateBrand = async (id, brand) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.put(`${host}/marcas/${token}/id/${id}`, brand);
  };

  const fetchBrand = async () => {
    try {
      const { data } = await axios.get(`${host}/marcas`);
      setBrand(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrandForId = async (id) => {
    return await axios.get(`${host}/marcas/${id}`);
  };

  // ------------------ Categorias
  const createCategory = async (category) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/categorias/${token}`, category);
  };

  const updateCategory = async (id, category) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.put(`${host}/categorias/${token}/id/${id}`, category);
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${host}/categorias`);
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryForId = async (id) => {
    return await axios.get(`${host}/categorias/${id}`);
  };

  // ------------------ Productos
  const createProduct = async (product) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/productos/${token}`, product);
  };

  const createImagesProduct = async (id,image) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/productos/${token}/images/${id}`, image);
  };

  const updateProduct = async (id,product) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.put(`${host}/productos/${token}/${id}`, product);
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${host}/productos`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductForId = async (id) => {
    return await axios.get(`${host}/productos/find/${id}`);
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
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        actionBar,
        tokenPanel,
        userData,
        signInClient,
        signInPanel,
        user,
        brand,
        category,
        product,
        singUp,
        UpdateUser,
        fetchUser,
        fetchUserForId,
        createBrand,
        updateBrand,
        fetchBrand,
        fetchBrandForId,
        createCategory,
        updateCategory,
        fetchCategory,
        fetchCategoryForId,
        createProduct,
        createImagesProduct,
        updateProduct,
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
