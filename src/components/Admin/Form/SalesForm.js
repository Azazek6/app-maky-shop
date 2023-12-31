import { useState, useRef, useEffect } from "react";
import { HiMiniUserPlus, HiMiniPlus } from "react-icons/hi2";
import moment from "moment";
import jwt_decode from "jwt-decode";
import TextComponent from "../TextComponent";
import InputComponent from "../InputComponent";
import SelectedComponent from "../SelectedComponent";
import ClientModal from "../Modal/ClientModal";
import ProductSaleModal from "../Modal/ProductSaleModal";
import DownloadPDFSales from "../Modal/DownloadPDFSales";
import TableProductSales from "../Table/TableProductSales";
import { useGlobal } from "@/context/GlobalProvider";
import {
  toastMessage,
  calSubTotalProduct,
  calDiscountProduct,
} from "@/helpers/general";

const typeMethod = [
  {
    id: "BOLETA",
    nombre: "BOLETA",
  },
  {
    id: "FACTURA",
    nombre: "FACTURA",
  },
];

const paymentMethod = [
  {
    id: "CONTADO",
    nombre: "CONTADO",
  },
  {
    id: "TRANSFERENCIA",
    nombre: "TRANSFERENCIA",
  },
  {
    id: "YAPE",
    nombre: "YAPE",
  },
];

const titleProductTable = [
  {
    id: "code",
    name: "Codigo",
  },
  {
    id: "product",
    name: "Producto",
  },
  {
    id: "stock",
    name: "Cantidad",
  },
  {
    id: "price",
    name: "Precio",
  },
  {
    id: "monto_total",
    name: "Importe",
  },
  {
    id: "discount",
    name: "Descuento",
  },
];

const SalesForm = () => {
  const { createSale, productAdddSale, clearProductSales } = useGlobal();
  //Modal Cliente
  const [openClient, setOpenClient] = useState(false);
  const cancelButtonRefClient = useRef(null);
  //Modal Producto
  const [openProduct, setOpenProduct] = useState(false);
  const cancelButtonRefProduct = useRef(null);
  //Modal PDF GENERATE
  const [openPdf, setOpenPdf] = useState(false);
  const cancelButtonRefPdf = useRef(null);

  //Estados
  const [idSale, setIdSale] = useState(null);
  const [inputStatus, setInputStatus] = useState(true);
  const [salesForm, setSalesForm] = useState({
    id_client: "",
    type: "",
    document: "",
    names: "",
    date: moment().format("YYYY-MM-DD"),
    type_purchase: "",
    id_seller: "",
    seller: "",
    observation: "",
    payment_method: "",
    amount: "",
    products: [],
  });

  const handleChange = ({ target: { name, value } }) => {
    setSalesForm({ ...salesForm, [name]: value });
  };

  const handleClickModalClient = () => {
    setOpenClient(true);
  };

  const handleClickModalProduct = () => {
    setOpenProduct(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    salesForm.products = productAdddSale;

    try {
      const { status, data } = await createSale(salesForm);

      if (status == 201) {
        toastMessage(data.message, 1);
        setIdSale(data.id_sale);
        setInputStatus(true);
        setSalesForm({
          id_client: "",
          type: "",
          document: "",
          names: "",
          date: moment().format("YYYY-MM-DD"),
          type_purchase: "",
          id_seller: "",
          seller: "",
          observation: "",
          payment_method: "",
          amount: "",
          products: [],
        });
        clearProductSales();
        setOpenPdf(true);
      }
    } catch (error) {
      toastMessage(error.response.data.message, 3);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenMakyPanel");

    const { id_usuario, nombres, apellidos } = jwt_decode(token);

    if (token) {
      salesForm.id_seller = id_usuario;
      salesForm.seller = `${apellidos} ${nombres}`;
    }
  }, []);
  return (
    <>
      <DownloadPDFSales
        idSales={idSale}
        open={openPdf}
        setOpen={setOpenPdf}
        cancelButtonRef={cancelButtonRefPdf}
      />
      <ClientModal
        dataClient={salesForm}
        open={openClient}
        setOpen={setOpenClient}
        cancelButtonRef={cancelButtonRefClient}
      />
      <ProductSaleModal
        //dataClient={salesForm}
        open={openProduct}
        setOpen={setOpenProduct}
        cancelButtonRef={cancelButtonRefProduct}
      />
      <div className="w-full px-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg">
            Datos del Cliente
          </h3>
          {!inputStatus && (
            <div
              onClick={handleClickModalClient}
              className="border border-[#117936] rounded-full cursor-pointer p-1 hover:opacity-70"
              title="Nuevo cliente"
            >
              <HiMiniUserPlus className="text-xl text-[#117936]" />
            </div>
          )}
        </div>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <InputComponent
            placeholder="Tipo de Documento"
            name="type"
            value={salesForm.type}
            onChange={handleChange}
            status={true}
          />
          <InputComponent
            placeholder="Documento"
            name="document"
            value={salesForm.document}
            onChange={handleChange}
            type="number"
            status={true}
            classStyle="mt-3 sm:mt-0"
          />
          <InputComponent
            placeholder="Nombre o Razon Social"
            name="names"
            value={salesForm.names}
            status={true}
            onChange={handleChange}
            classStyle="mt-3 sm:mt-0"
          />
        </div>
        <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg mt-5">
          Datos de la Venta
        </h3>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <InputComponent
            type="date"
            status={inputStatus}
            name="date"
            value={salesForm.date}
            onChange={handleChange}
          />
          <SelectedComponent
            title="Tipo de pago"
            data={typeMethod}
            status={inputStatus}
            name="type_purchase"
            value={salesForm.type_purchase}
            handleChange={handleChange}
          />
          <InputComponent
            placeholder="Vendedor"
            status={true}
            name="seller"
            value={salesForm.seller}
            onChange={handleChange}
            classStyle="mt-3 sm:mt-0"
          />
        </div>
        <div className="mt-5">
          <TextComponent
            title="Observaciones (opcional)"
            status={inputStatus}
            name="observation"
            value={salesForm.observation}
            handleChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg">
            Productos
          </h3>
          {!inputStatus && (
            <div
              onClick={handleClickModalProduct}
              className="border border-[#117936] rounded-full cursor-pointer p-1 hover:opacity-70"
              title="Agregar Producto"
            >
              <HiMiniPlus className="text-xl text-[#117936]" />
            </div>
          )}
        </div>
        <div className="w-[100%] mt-5">
          <TableProductSales title={titleProductTable} data={productAdddSale} />
        </div>

        <div className="mt-5 flex items-center justify-end gap-5 px-8">
          <h2 className="font-bold text-lg text-[#474d59]">Descuento:</h2>
          <p className="text-sm sm:text-base text-[#474d59]">
            S/.{" "}
            {productAdddSale.length <= 0
              ? "0.00"
              : calDiscountProduct(productAdddSale)}
          </p>
        </div>
        <div className="mt-5 flex items-center justify-end gap-5 px-8">
          <h2 className="font-bold text-lg text-[#474d59]">Total a Pagar:</h2>
          <p className="text-sm sm:text-base text-[#474d59]">
            S/.{" "}
            {productAdddSale.length <= 0
              ? "0.00"
              : calSubTotalProduct(productAdddSale)}
          </p>
        </div>

        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <SelectedComponent
            title="Medio de Pago"
            data={paymentMethod}
            status={inputStatus}
            name="payment_method"
            value={salesForm.payment_method}
            handleChange={handleChange}
          />
          <InputComponent
            placeholder="Monto"
            type="number"
            status={inputStatus}
            name="amount"
            value={salesForm.amount}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center my-7 justify-end gap-8">
          <button
            onClick={() => {
              if (inputStatus) {
                setInputStatus(false);
              } else {
                //clearData();
                setInputStatus(true);
              }
            }}
            className="bg-[#ff5151] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            {inputStatus ? "Nuevo" : "Cancelar"}
          </button>
          <button
            disabled={inputStatus}
            onClick={handleSubmit}
            className="bg-[#1770a4] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            Emitir
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesForm;
