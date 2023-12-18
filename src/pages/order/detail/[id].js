import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useGlobal } from "@/context/GlobalProvider";
import { host } from "@/configuration/utils";

const Detail = () => {
  const { fetchOrdersForClient, order, createImagesOrderPay } = useGlobal();
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [statusOrder, setStatusOrder] = useState("");
  const [paymenthMethod, setPaymenthMethod] = useState("");
  const [totalPaymenth, setTotalPaymenth] = useState(0);
  const [Shipping, setShipping] = useState("");
  const [documentPay, setDocumentPay] = useState("");
  const [imagePayment, setImagePayment] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("No se encontró una imagen a enviar");
      return;
    }

    try {
      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);
        const token = localStorage.getItem("tokenMakyShop");

        const { status } = await axios.post(
          `${host}/ordenes/${token}/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (status == 201) {
          const { status, data } = await createImagesOrderPay(orderId, {
            image: selectedFile.name,
          });
          if (status == 201) {
            setSelectedFile(null);
            setTimeout(() => {
              location.reload();
            }, 1500);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersForClient();
  }, []);

  useEffect(() => {
    if (router.query?.id) {
      const data = order.filter(
        (itemDetail) => itemDetail.id_orden == router.query.id
      );
      setOrderId(data[0].id_orden);
      setStatusOrder(data[0].estado);
      setPaymenthMethod(data[0].medio_pago);
      setTotalPaymenth(data[0].monto_total);
      setShipping(data[0].tipo_envio);
      setDocumentPay(data[0].tipo_compra);
      setImagePayment(data[0].imagen_compra);
      data.map((itemData) => {
        setOrderDetail(itemData.orden_detalles);
      });
    }
  }, [order]);

  return (
    <Layout>
      <div className="mx-10">
        <h2 className="mt-3 mb-5 font-normal text-3xl">Mis Pedidos</h2>
        <form onSubmit={handleSubmit} encType="multipart/formdata">
          <div className="w-[100%] flex-row sm:flex items-center justify-between">
            <h3 className="text-lg mb-5 sm:mb-0">
              Estado del Pedido:{" "}
              <span
                className={`text-sm font-bold ${
                  statusOrder == "PENDIENTE"
                    ? "text-orange-400"
                    : statusOrder == "REVISANDO" || statusOrder == "PROCESANDO"
                    ? "text-blue-700"
                    : statusOrder == "ENVIADO"
                    ? "text-green-800"
                    : "text-red-700"
                }`}
              >
                {statusOrder}
              </span>
            </h3>
            {imagePayment == null && (
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                id="image"
                className="text-sm cursor-pointer"
              />
            )}
          </div>
          <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
            <h3 className="text-lg mb-5 sm:mb-0">
              Medio de Pago:{" "}
              <span className={`text-sm font-bold`}>{paymenthMethod}</span>
            </h3>
            <h3 className="text-lg mb-5 sm:mb-0">
              Total a Pagar:{" "}
              <span className={`text-sm font-bold`}>{totalPaymenth}</span>
            </h3>
          </div>
          <div className="w-[100%] flex-row sm:flex items-center justify-between mt-5">
            <h3 className="text-lg mb-5 sm:mb-0">
              Env&iacute;o:{" "}
              <span className={`text-sm font-bold`}>
                {Shipping == "DOMICILIO"
                  ? `${Shipping} (+ S/. 15.00)`
                  : Shipping}
              </span>
            </h3>
            <h3 className="text-lg mb-5 sm:mb-0">
              Documento:{" "}
              <span className={`text-sm font-bold`}>{documentPay}</span>
            </h3>
          </div>
          {imagePayment == null && (
            <div className="flex items-center justify-end my-10">
              <button
                disabled={imagePayment}
                className="bg-[#0f6f32] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
              >
                Enviar Constancia
              </button>
            </div>
          )}
        </form>
        {orderDetail.map((itemOrder) => (
          <div
            key={itemOrder.id_orden_detalle}
            className="mt-10 flex items-center justify-between"
          >
            <div className="w-[70%]">
              <div className="flex items-center gap-10">
                <img className="w-[150px]" src="/card-item.png" alt="" />
                <div className="w-[100%] flex-row">
                  <p className="hover:opacity-70">
                    {itemOrder.producto.nombre}
                  </p>
                  <div className="flex items-center justify-between mx-3 mt-3">
                    <p className="text-sm mt-3 font-bold">
                      S/ {itemOrder.producto.precio}
                    </p>
                    <p className="text-sm mt-3 font-bold">
                      Cantidad: {itemOrder.cantidad}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="flex items-center justify-center">
                <p>SubTotal: S/ {itemOrder.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Detail;
