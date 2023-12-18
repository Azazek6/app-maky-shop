import { useState, useRef } from "react";
import { HiMiniUserPlus, HiMiniPlus } from "react-icons/hi2";
import TextComponent from "../TextComponent";
import InputComponent from "../InputComponent";
import SelectedComponent from "../SelectedComponent";
import ClientModal from "../Modal/ClientModal";

const SalesForm = () => {
  //Modal Cliente
  const [openClient, setOpenClient] = useState(false);
  const cancelButtonRefClient = useRef(null);
  //Modal Producto
  const [openProduct, setOpenProduct] = useState(false);
  const cancelButtonRefProduct = useRef(null);

  //Estados
  const [salesForm, setSalesForm] = useState({
    id_client: "",
    type: "",
    document: "",
    names: "",
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
  return (
    <>
      <ClientModal
        dataClient={salesForm}
        open={openClient}
        setOpen={setOpenClient}
        cancelButtonRef={cancelButtonRefClient}
      />
      <div className="w-full px-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg">
            Datos del Cliente
          </h3>
          <div
            onClick={handleClickModalClient}
            className="border border-[#117936] rounded-full cursor-pointer p-1 hover:opacity-70"
            title="Nuevo cliente"
          >
            <HiMiniUserPlus className="text-xl text-[#117936]" />
          </div>
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
          />
          <InputComponent
            placeholder="Nombre o Razon Social"
            name="names"
            value={salesForm.names}
            status={true}
          />
        </div>
        <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg mt-5">
          Datos de la Venta
        </h3>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <InputComponent type="date" />
          <InputComponent placeholder="Boleta | Factura" status={true} />
          <InputComponent placeholder="Vendedor" status={true} />
        </div>
        <div className="mt-5">
          <TextComponent title="Observaciones (opcional)" />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg">
            Productos
          </h3>
          <div
            onClick={handleClickModalProduct}
            className="border border-[#117936] rounded-full cursor-pointer p-1 hover:opacity-70"
            title="Agregar Producto"
          >
            <HiMiniPlus className="text-xl text-[#117936]" />
          </div>
        </div>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <SelectedComponent title="Medio de Pago" />
          <InputComponent placeholder="Monto" type="number" />
        </div>
        <div className="flex items-center my-7 justify-end gap-8">
          <button className="bg-[#ff5151] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out">
            Nuevo
          </button>
          <button className="bg-[#1770a4] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out">
            Emitir
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesForm;
