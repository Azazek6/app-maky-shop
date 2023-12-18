import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import InputComponent from "../InputComponent";
import SelectedComponent from "../SelectedComponent";
import { useGlobal } from "@/context/GlobalProvider";
import { toastMessage } from "@/helpers/general";

const listDocument = [
  {
    id: "dni",
    nombre: "DNI",
  },
  {
    id: "ruc",
    nombre: "RUC",
  },
];

const ClientModal = ({ dataClient, open, setOpen, cancelButtonRef }) => {
  const { createClient, fetchClientForDocument } = useGlobal();
  const router = useRouter();

  const [inputStatus, setInputStatus] = useState(true);
  const [searchDocument, setSearchDocument] = useState("");
  const [existClient, setExistClient] = useState(false);
  const [client, setClient] = useState({
    id: "",
    type: "",
    document: "",
    names: "",
    lastnames: "",
    email: "",
    phone: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setClient({ ...client, [name]: value });
  };

  const handleChangeSearch = (e) => {
    setSearchDocument(e.target.value);
  };

  const clearData = () => {
    setClient({
      id: "",
      type: "",
      document: "",
      names: "",
      lastnames: "",
      email: "",
      phone: "",
    });
  };

  const handleClickSearch = async (e) => {
    e.preventDefault();
    if (searchDocument == "") {
      toastMessage("Campo vacio para la busqueda", 2);
      return;
    }

    try {
      const { status, data } = await fetchClientForDocument(searchDocument);

      if (status == 200) {
        toastMessage("Cliente encontrado", 1);
        dataClient.id_client = data.id_cliente;
        dataClient.type = data.tipo_documento;
        dataClient.document = data.documento;
        dataClient.names = data.nombres;
        setClient({
          id: data.id_cliente,
          type: data.tipo_documento,
          document: data.documento,
          names: data.nombres,
          lastnames: data.apellidos,
          email: data.email,
          phone: data.telefono,
        });
        setOpen(false);
      }
    } catch (error) {
      clearData();
      toastMessage(error.response.data.message, 3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, data } = await createClient(client);

      if (status == 201) {
        dataClient.id_client = data.id;
        dataClient.type = client.type.toUpperCase();
        dataClient.document = client.document.toUpperCase();
        dataClient.names = client.names.toUpperCase();
        toastMessage(data.message, 1);
        clearData();
        setOpen(false);
        setExistClient(false);
      }
    } catch (error) {
      toastMessage(error.response.data.message, 3);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className=" sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      sdf
                    </div> */}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h2 className="text-xl sm:text-3xl font-bold text-[#ff7f51]">
                        Detalle del Cliente
                      </h2>
                      {!existClient && (
                        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5 sm:mt-3">
                          <InputComponent
                            placeholder="Documento a buscar"
                            type="number"
                            onChange={handleChangeSearch}
                            classStyle="w-[100%]"
                          />
                          <button
                            onClick={handleClickSearch}
                            className="w-[100%] sm:w-[50%] mt-5 bg-[#117936] text-white p-2 rounded-lg hover:opacity-70 transition-all duration-300 ease-in-out"
                          >
                            BUSCAR
                          </button>
                        </div>
                      )}

                      {existClient && (
                        <>
                          <h3 className="text-[#ff5151] font-semibold text-sm sm:text-lg mt-5 hidden sm:block">
                            Datos
                          </h3>
                          <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-3">
                            <SelectedComponent
                              title="Tipo de Documento"
                              data={listDocument}
                              name="type"
                              value={client.type}
                              handleChange={handleChange}
                            />
                            <InputComponent
                              placeholder="Documento"
                              type="number"
                              read={inputStatus}
                              name="document"
                              value={client.document}
                              onChange={handleChange}
                              classStyle="mt-3 sm:mt-0"
                            />
                          </div>
                          <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-3">
                            <InputComponent
                              placeholder="Nombres"
                              read={inputStatus}
                              name="names"
                              value={client.names}
                              onChange={handleChange}
                            />
                            <InputComponent
                              placeholder="Apellidos (opcional)"
                              read={inputStatus}
                              name="lastnames"
                              value={client.lastnames}
                              onChange={handleChange}
                              classStyle="mt-3 sm:mt-0"
                            />
                            <InputComponent
                              placeholder="Correo (opcional)"
                              type="email"
                              read={inputStatus}
                              name="email"
                              value={client.email}
                              onChange={handleChange}
                              classStyle="mt-3 sm:mt-0"
                            />
                          </div>
                          <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-3">
                            <InputComponent
                              placeholder="Teléfono (opcional)"
                              type="number"
                              read={inputStatus}
                              name="phone"
                              value={client.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {existClient && (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 mb-4 sm:mb-0 sm:ml-3 sm:w-auto"
                      ref={cancelButtonRef}
                    >
                      Guardar
                    </button>
                  )}

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#fba56c] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 mb-4 sm:mb-0 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      if (inputStatus) {
                        setInputStatus(false);
                        setExistClient(true);
                      } else {
                        clearData();
                        setInputStatus(true);
                        setExistClient(false);
                      }
                    }}
                  >
                    {inputStatus ? "Nuevo" : "Cancelar"}
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ClientModal;
