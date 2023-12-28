import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { FaRegFilePdf } from "react-icons/fa6";
import { useGlobal } from "@/context/GlobalProvider";
import { toastMessage, truncateText } from "@/helpers/general";

const TableSales = ({ section, title, data, pageSize = 5 }) => {
  const { fetchSaleForId } = useGlobal();
  const [loaderPdf, setLoaderPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / pageSize);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handleClickGeneratePdf = async (id) => {
    setLoaderPdf(true);
    try {
      const { status, data } = await fetchSaleForId(id);
      if (status == 200) {
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
              data.tipo_comprobante
            } ELECTRÓNICA</h1>
            <p class="text-gray-600">#${
              data.tipo_comprobante == "BOLETA" ? "B" : "F"
            }${data.id_venta}</p>
            <p class="text-gray-600 mt-3">Fecha: ${data.fecha_registro}</p>
          </div>
        </div>
    
        <!-- Detalles del Cliente -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2 text-gray-800">Detalles del Cliente</h2>
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><span class="font-semibold">Nombre/Razón Social:</span> ${
                data.cliente?.tipo_comprobante == "DNI"
                  ? `${data.cliente?.apellidos} {data.nombres}`
                  : data.cliente?.nombres
              }</p>
              <p class="mt-3"><span class="font-semibold">Documento:</span> DNI / RUC: ${
                data.cliente?.documento
              }</p>
              <p class="mt-3"><span class="font-semibold">Dirección:</span></p>
            </div>
            <div>
              <p><span class="font-semibold">Teléfono:</span> ${
                data.cliente?.telefono
              }</p>
              <p class="mt-3"><span class="font-semibold">Correo:</span> ${
                data.cliente?.email != null && data.cliente?.email
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
              ${data.detalle_ventas?.map(
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
              data.total
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
      }
    } catch (error) {
      console.log(error);
      toastMessage("Error llamando a la API", 3);
      setLoaderPdf(false);
    }
  };

  return (
    <div className="w-[100%] flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle overflow-x-auto">
          <table className="w-[100%] divide-y divide-gray-200">
            <thead className="bg-[#e87f7f]">
              <tr>
                <th
                  scope="col"
                  className="transition-all duration-300 ease-in-out px-6 py-3 text-xs font-semibold text-left text-[#b9b8b8] sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm hover:text-[#fff]"
                >
                  #
                </th>
                {title.map(({ name }) => (
                  <th
                    key={name}
                    scope="col"
                    className="transition-all duration-300 ease-in-out px-6 py-3 text-xs font-semibold text-left text-[#b9b8b8] sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm hover:text-[#fff]"
                  >
                    {name}
                  </th>
                ))}
                <th
                  scope="col"
                  className="transition-all duration-300 ease-in-out px-6 py-3 text-xs font-semibold text-left text-[#b9b8b8] sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm hover:text-[#fff]"
                >
                  Accion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData?.map((datas, index) => {
                const globalIndex = currentPage * pageSize + index + 1;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 text-xs text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs">
                      {globalIndex}
                    </td>
                    {title?.map((item) => {
                      const value =
                        datas[item.id] == 1
                          ? "Activado"
                          : datas[item.id] == 0
                          ? "Desactivado"
                          : datas[item.id];
                      return (
                        <td
                          key={item.id}
                          className="px-6 py-4 text-xs text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs"
                        >
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs">
                      <Link
                        className="text-blue-500 hover:text-blue-700"
                        href="#"
                        title="Descargar PDF"
                        onClick={() => {
                          handleClickGeneratePdf(datas.id_venta);
                        }}
                      >
                        <FaRegFilePdf className="sm:text-sm md:text-sm lg:text-base xl:text-lg" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-[#fff] px-2 py-2 sm:px-6 ">
        <ReactPaginate
          previousLabel={<span className="text-sm sm:text-base">Anterior</span>}
          nextLabel={<span className="text-sm sm:text-base">Siguiente</span>}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
};

export default TableSales;
