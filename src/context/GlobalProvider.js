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
  //Estados carrito de compra
  const [addProductToCar, setAddProductToCar] = useState([]);
  //Estados Principales
  const [tokenData, setTokenData] = useState(null);
  const [tokenPanel, setTokenPanel] = useState(null);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [client, setClient] = useState([]);

  // --------------------------------------------- FUNCIONES DEL CARRO DE COMPRA -----------------------------------------
  // -------------- Agregar al carrito
  const addShoppingCar = (product) => {
    let updatedCart = [...addProductToCar];
    const existingProduct = updatedCart.find(
      (item) => item.id_producto === product.id_producto
    );

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualiza el conteo
      existingProduct.cantidad += 1;
      existingProduct.monto_total =
        parseFloat(existingProduct.precio) *
        parseFloat(existingProduct.cantidad);
    } else {
      // Si el producto no está en el carrito, agrégalo con un conteo inicial de 1
      updatedCart.push({
        ...product,
        cantidad: 1,
        monto_total: product.precio,
      });
    }

    setAddProductToCar([...updatedCart]);

    localStorage.setItem("ShoppingCarMakys", JSON.stringify(updatedCart));
  };

  // -------------- Borrar del carrito
  const removeShoppingCar = (id) => {
    let updatedCart = [...addProductToCar];
    const existingProduct = updatedCart.find((item) => item.id_producto === id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualiza el conteo
      existingProduct.cantidad -= 1;
      existingProduct.monto_total =
        parseFloat(existingProduct.monto_total) -
        parseFloat(existingProduct.precio);
    }

    if (existingProduct.cantidad == 0) {
      const existingProduct = updatedCart.filter(
        (item) => item.id_producto != id
      );

      setAddProductToCar(existingProduct);

      localStorage.setItem("ShoppingCarMakys", JSON.stringify(existingProduct));
      return;
    }

    setAddProductToCar(updatedCart);

    localStorage.setItem("ShoppingCarMakys", JSON.stringify(updatedCart));
  };
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

  const createImagesProduct = async (id, image) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/productos/${token}/images/${id}`, image);
  };

  const updateProduct = async (id, product) => {
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

  // --------------------------- Orden de compra
  const createOrder = async (order) => {
    const token = localStorage.getItem("tokenMakyShop");
    return await axios.post(`${host}/ordenes/${token}`, order);
  };

  const fetchOrdersForClient = async () => {
    const token = localStorage.getItem("tokenMakyShop");
    try {
      const { data } = await axios.get(`${host}/ordenes/${token}`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("tokenMakyPanel");
    try {
      const { data } = await axios.get(`${host}/ordenes/${token}/entrantes`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createImagesOrderPay = async (id, image) => {
    const token = localStorage.getItem("tokenMakyShop");
    return await axios.post(`${host}/ordenes/${token}/images/${id}`, image);
  };

  // ----------------------- Clientes
  const createClient = async (client) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.post(`${host}/clientes/${token}`, client);
  };

  const fetchClients = async () => {
    const token = localStorage.getItem("tokenMakyPanel");
    try {
      const { data } = await axios.get(`${host}/clientes/${token}`);
      setClient(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClientForDocument = async (id) => {
    const token = localStorage.getItem("tokenMakyPanel");
    return await axios.get(`${host}/clientes/${token}/${id}`);
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

  //Carrito de compras
  useEffect(() => {
    const savedCarItems =
      JSON.parse(localStorage.getItem("ShoppingCarMakys")) || [];

    setAddProductToCar(savedCarItems);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        actionBar,
        tokenPanel,
        userData,
        addShoppingCar,
        removeShoppingCar,
        addProductToCar,
        signInClient,
        signInPanel,
        user,
        brand,
        category,
        product,
        order,
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
        createOrder,
        fetchOrders,
        fetchOrdersForClient,
        createImagesOrderPay,
        createClient,
        fetchClients,
        fetchClientForDocument,
        showCredentials,
        handleClickShowActionBar,
        handleClickShowCredential,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
