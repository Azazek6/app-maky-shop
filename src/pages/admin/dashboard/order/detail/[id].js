import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Admin/Layout";
import { useGlobal } from "@/context/GlobalProvider";
import { host } from "@/configuration/utils";

const Home = () => {
  const { order, fetchOrders } = useGlobal();
  const router = useRouter();

  const [orderDetail, setOrderDetail] = useState([]);
  const [infoOrder, setInfoOrder] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (router.query?.id) {
      const data = order.filter(
        (itemDetail) => itemDetail.id_orden == router.query.id
      );
      const dataInfo = order.find(
        (itemDetail) => itemDetail.id_orden == router.query.id
      );

      setInfoOrder(dataInfo);

      data.map((itemData) => {
        setOrderDetail(itemData.orden_detalles);
      });
    }
  }, [order]);
  return (
    <Layout>
      <div className="mx-10">
        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            Fecha de Registro:{" "}
            <span className={`text-sm font-bold`}>
              {infoOrder.fecha_registro}
            </span>
          </h3>
          <h3 className="text-lg mb-5 sm:mb-0">
            Medio de Pago:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.medio_pago}</span>
          </h3>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            Env&iacute;o:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.tipo_envio}</span>
          </h3>
          <h3 className="text-lg mb-5 sm:mb-0">
            Metodo de Compra:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.tipo_compra}</span>
          </h3>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            Monto Total:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.monto_total}</span>
          </h3>
        </div>
        <h2 className="mt-10 mb-5 font-normal text-3xl">
          Detalle de Orden: # {router.query.id}
        </h2>
        <div className="w-[100%] max-h-[350px] overflow-auto grid grid-cols-1 gap-5">
          {orderDetail.map((itemDetalle) => (
            <div
              key={itemDetalle.id_orden_detalle}
              className="w-[100]% bg-red-200 p-5 rounded-xl"
            >
              <h3 className="text-lg mb-5 sm:mb-3">
                C&oacute;digo:{" "}
                <span className={`text-sm font-bold`}>
                  {itemDetalle.producto.codigo}
                </span>
              </h3>
              <h3 className="text-lg mb-5 sm:mb-3">
                Producto:{" "}
                <span className={`text-sm font-bold`}>
                  {itemDetalle.producto.nombre}
                </span>
              </h3>
              <h3 className="text-lg mb-5 sm:mb-3">
                Cantidad:{" "}
                <span className={`text-sm font-bold`}>
                  {itemDetalle.cantidad}
                </span>
              </h3>
              <h3 className="text-lg mb-5 sm:mb-3">
                Precio:{" "}
                <span className={`text-sm font-bold`}>
                  {itemDetalle.producto.precio}
                </span>
              </h3>
              <h3 className="text-lg mb-5 sm:mb-3">
                Monto Total:{" "}
                <span className={`text-sm font-bold`}>{itemDetalle.total}</span>
              </h3>
            </div>
          ))}
        </div>
        <h2 className="mt-10 mb-5 font-normal text-3xl">Detalle de Envio:</h2>
        {infoOrder.tipo_compra == "FACTURA" && (
          <h3 className="text-lg mb-5 sm:mb-0">
            Razon Social:{" "}
            <span className={`text-sm font-bold`}>
              {infoOrder.razon_social}
            </span>
          </h3>
        )}

        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            N° Documento:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.documento}</span>
          </h3>
          <h3 className="text-lg mb-5 sm:mb-0">
            Tel&eacute;fono:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.telefono}</span>
          </h3>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            Nombres:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.nombres}</span>
          </h3>
          <h3 className="text-lg mb-5 sm:mb-0">
            Apellidos:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.apellidos}</span>
          </h3>
        </div>
        <h3 className="text-lg mb-5 sm:mb-0 mt-5">
          Correo:{" "}
          <span className={`text-sm font-bold`}>{infoOrder.correo}</span>
        </h3>
        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            Distrito:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.distrito}</span>
          </h3>
          <h3 className="text-lg mb-5 sm:mb-0">
            Provincia:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.provincia}</span>
          </h3>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
          <h3 className="text-lg mb-5 sm:mb-0">
            Calle:{" "}
            <span className={`text-sm font-bold`}>
              {infoOrder.calle_numero}
            </span>
          </h3>
          <h3 className="text-lg mb-5 sm:mb-0">
            Oficina:{" "}
            <span className={`text-sm font-bold`}>{infoOrder.oficina}</span>
          </h3>
        </div>
        <h3 className="text-lg mb-5 sm:mb-3 mt-5">Detalles o Referencia: </h3>
        <span className={`text-sm font-bold`}>{infoOrder.detalles_orden}</span>
        <h2 className="mt-10 mb-10 font-normal text-3xl">
          Constancia de Pago:
        </h2>
        <div className="w-[100%] flex justify-center">
          <img
            className="w-[380px] h-[450px] border border-dotted border-[#565a60]"
            src={`${
              infoOrder.imagen_compra
                ? `${host}/ordenes/image/${infoOrder.imagen_compra}`
                : "/no-paga.png"
            }`}
            alt="Constancia de pago"
            title="Constancia de pago"
          />
        </div>

        <div className="flex items-center justify-end my-10">
          <button
            disabled={!infoOrder.imagen_compra}
            onClick={() =>
              window.open("/admin/dashboard/sales/create", "_blank")
            }
            className="bg-[#0f6f32] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            Realizar Venta
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
