import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaRegFilePdf } from "react-icons/fa6";
import { useGlobal } from "@/context/GlobalProvider";
import { toastMessage, truncateText } from "@/helpers/general";

const DownloadPDFSales = ({ idSales, open, setOpen, cancelButtonRef }) => {
  const { fetchSaleForId } = useGlobal();
  const router = useRouter();

  const [loaderPdf, setLoaderPdf] = useState(false);
  const [sale, setSale] = useState([]);

  const handleClickGeneratePdf = async () => {
    setLoaderPdf(true);
    const API_KEY = "934f1bdf-4ffe-4bd8-9768-2087d2a796b3"; // Recuerda reemplazar "TU_CLAVE_API" con tu clave real.
    const endpoint = "https://v2018.api2pdf.com/chrome/html";

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Comprobante de Pago</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    </head>
    
    <body class="font-sans">
      <div class="mx-auto w-full bg-white p-8 shadow-md rounded-lg" style="border: 2px solid #efeff7;">
        <!-- Encabezado con Logo -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-4xl font-bold">MAKYS</h2>
          </div>
          <div class="text-right">
            <h1 class="text-3xl font-semibold mb-2 text-red-500">${
              sale.tipo_comprobante
            } ELECTRÓNICA</h1>
            <p class="text-gray-600">#${
              sale.tipo_comprobante == "BOLETA" ? "B" : "F"
            }${sale.id_venta}</p>
            <p class="text-gray-600 mt-3">Fecha: ${sale.fecha_registro}</p>
          </div>
        </div>
    
        <!-- Detalles del Cliente -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2 text-gray-800">Detalles del Cliente</h2>
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><span class="font-semibold">Nombre/Razón Social:</span> ${
                sale.cliente.tipo_comprobante == "DNI"
                  ? `${sale.cliente.apellidos} {sale.nombres}`
                  : sale.cliente.nombres
              }</p>
              <p class="mt-3"><span class="font-semibold">Documento:</span> DNI / RUC: ${
                sale.cliente.documento
              }</p>
              <p class="mt-3"><span class="font-semibold">Dirección:</span></p>
            </div>
            <div>
              <p><span class="font-semibold">Teléfono:</span> ${
                sale.cliente.telefono
              }</p>
              <p class="mt-3"><span class="font-semibold">Correo:</span> ${
                sale.cliente.email != null && sale.cliente.email
              }</p>
              <!-- ... Otros detalles del cliente ... -->
            </div>
          </div>
        </div>
    
        <!-- Tabla de Productos -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2 text-gray-800">Detalle de Productos</h2>
          <table class="w-full border-collapse border border-gray-300 mt-5">
            <thead>
              <tr class="bg-red-500 text-white">
                <th class="border border-gray-300 p-3 text-left text-sm">Producto</th>
                <th class="border border-gray-300 p-3 text-left text-base">Cantidad</th>
                <th class="border border-gray-300 p-3 text-left text-sm">Precio Unitario</th>
                <th class="border border-gray-300 p-3 text-left text-sm">Descuento</th>
                <th class="border border-gray-300 p-3 text-left text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              <!-- Agrega filas según los productos -->
              ${sale.detalle_ventas.map(
                (itemDetalle) => `
                <tr>
                  <td class="border border-gray-300 p-3 text-xs">
                    ${truncateText(itemDetalle.producto.nombre, 50)}
                  </td>
                  <td class="border border-gray-300 p-3  text-xs">
                    ${itemDetalle.cantidad}
                  </td>
                  <td class="border border-gray-300 p-3  text-xs">
                    S/. ${itemDetalle.precio}
                  </td>
                  <td class="border border-gray-300 p-3  text-xs">
                    S/. ${itemDetalle.descuento}
                  </td>
                  <td class="border border-gray-300 p-3  text-xs">
                    S/. ${itemDetalle.importe_total}
                  </td>
                </tr>`
              )}
            </tbody>
          </table>
        </div>
    
        <!-- Total y Notas -->
        <div class="flex justify-between mt-6">
          <div>
            <p class="text-xl font-semibold text-gray-800">Total: S/.  ${
              sale.total
            }</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">¡Gracias por su compra en MAKYS!</p>
          </div>
        </div>
      </div>
    </body>
    
    </html>
    `;

    try {
      const response = await axios.post(
        endpoint,
        {
          html: htmlContent,
          options: {},
        },
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (response.data && response.data.success) {
        // Abrir el PDF en una nueva pestaña
        window.open(response.data.pdf, "_blank");
      } else {
        toastMessage("Hubo un error al generar el PDF", 2);
      }
      setLoaderPdf(false);
    } catch (error) {
      toastMessage("Error llamando a la API", 3);
      setLoaderPdf(false);
    }
  };

  useEffect(() => {
    const loadData = async (id) => {
      try {
        const { data } = await fetchSaleForId(id);
        setSale(data);
      } catch (error) {
        toastMessage(error.response.data.message, 3);
      }
    };

    if (idSales != null) {
      loadData(idSales);
    }
  }, [idSales]);

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
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h2 className="text-lg sm:text-2xl font-bold text-[#ff7f51]">
                        Opciones de descarga
                      </h2>
                      <div className="flex items-center justify-center mt-10">
                        <button
                          onClick={handleClickGeneratePdf}
                          className="w-[35%] flex-row items-center justify-center border border-[#ff5151] rounded-lg px-2 py-5 hover:opacity-70 transition-all ease-in-out duration-300"
                        >
                          {loaderPdf ? (
                            <>
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full border-t-4 border-[#ff5151] border-solid h-12 w-12"></div>
                              </div>
                              <p className="text-[#474d59] text-xl mt-5">
                                Generando
                              </p>
                            </>
                          ) : (
                            <>
                              <FaRegFilePdf className="w-[100%] text-[#ff5151] text-5xl mb-5" />
                              <p className="text-[#474d59] text-xl">
                                Generar PDF
                              </p>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

export default DownloadPDFSales;
