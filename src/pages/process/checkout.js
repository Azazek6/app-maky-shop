import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Toaster } from "sonner";
import jwt_decode from "jwt-decode";
import InputComponent from "@/components/Admin/InputComponent";
import TextComponent from "@/components/Admin/TextComponent";
import { host_product_image } from "@/configuration/utils";
import { calSubTotalProduct, toastMessage } from "@/helpers/general";
import { useGlobal } from "@/context/GlobalProvider";

const Checkout = () => {
  const { createOrder, addProductToCar } = useGlobal();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sendSize, setSendSize] = useState("");
  const [typeDocument, setTypeDocument] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [orderData, setOrderData] = useState({
    product: [],
    totalAmount: "",
    shippingMethod: "",
    distric: "",
    province: "",
    street: "",
    office: "",
    postalCode: "",
    details: "",
    email: "",
    names: "",
    lastnames: "",
    phone: "",
    documentTyoe: "",
    document: "",
    businessName: "",
    paymentMethod: "",
  });

  const handleSendSelection = (type) => {
    setSendSize(type);
  };

  const handleDocumentSelection = (type) => {
    setTypeDocument(type);
  };

  const handlePaymentMethodSelection = (type) => {
    setPaymentMethod(type);
  };

  const handleChange = ({ target: { name, value } }) => {
    setOrderData({ ...orderData, [name]: value });
  };

  const calTotalPayment = () => {
    let total =
      parseFloat(calSubTotalProduct(addProductToCar)) + parseFloat(sendAmount);
    return total.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    orderData.shippingMethod = sendSize;
    orderData.documentTyoe = typeDocument;
    orderData.paymentMethod = paymentMethod;
    orderData.product = addProductToCar;
    orderData.totalAmount = calTotalPayment();

    try {
      const { status, data } = await createOrder(orderData);

      if (status == 201) {
        setLoading(false);
        toastMessage(data.message, 1);
        setTimeout(() => {
          localStorage.removeItem("ShoppingCarMakys");
          router
            .push(`/process/success/${data.id_orden}`)
            .then(() => router.replace(`/process/success/${data.id_orden}`));
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      toastMessage(error.response.data.message, 3);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenMakyShop");

    if (token) {
      const { email } = jwt_decode(token);
      orderData.email = email;
    }
  }, []);

  useEffect(() => {
    if (sendSize == "DOMICILIO") {
      setSendAmount(15);
    } else {
      setSendAmount(0);
    }
  }, [sendSize]);
  return (
    <>
      <Head>
        <title>MAKYS | Informaci&oacute;n de Env&iacute;o</title>
      </Head>
      <Toaster theme="light" position="top-right" duration={2000} />
      <div className="w-[100%] m-auto flex justify-center fixed py-5 bg-white">
        <Link
          href="/"
          className="flex -ml-40 items-center text-5xl gap-4 w-32 font-bold text-[#282828]"
        >
          <img className="w-full rounded-full" src="/logo.jpg" alt="" />
          MAKYS
        </Link>
      </div>
      <div className="w-[80%] m-auto flex pt-[240px] gap-10">
        <div className="w-[50%]">
          <form onSubmit={handleSubmit}>
            <h2 className="text-[#a2a5a7] text-3xl font-bold">
              Detalles de Env&iacute;o
            </h2>
            <h4 className="text-[#a2a5a7] text-lg mt-5">
              ¿C&Oacute;MO QUIERES RECIBIR TU PEDIDO?
            </h4>
            <div className="w-[100%] grid grid-cols-2 gap-4 mt-5 ">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="size-button"
                  value="DOMICILIO"
                  className="hidden"
                  onChange={() => handleSendSelection("DOMICILIO")}
                />
                <span
                  className={`w-[100%] text-center py-3 border border-[#aaa] rounded-md  cursor-pointer  font-bold sm:text-sm transition-all duration-300 ease-in-out ${
                    sendSize === "DOMICILIO"
                      ? "ring ring-offset-1 bg-[#ebebeb] text-[#767676]"
                      : ""
                  }`}
                >
                  Env&iacute;o a Domicilio
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="size-button"
                  value="TIENDA"
                  className="hidden"
                  onChange={() => handleSendSelection("TIENDA")}
                />
                <span
                  className={`w-[100%] text-center py-3 border border-[#aaa] rounded-md  cursor-pointer font-bold sm:text-sm transition-all duration-300 ease-in-out ${
                    sendSize === "TIENDA"
                      ? "ring ring-offset-1 bg-[#ebebeb] text-[#767676]"
                      : ""
                  }`}
                >
                  Recogo en Tienda
                </span>
              </label>
            </div>
            <h4 className="text-[#a2a5a7] text-lg mt-5">
              DIRECCI&Oacute; DE ENTREGA
            </h4>
            <div className="flex mt-3 items-center gap-5">
              <InputComponent
                placeholder="Distrito"
                name="distric"
                value={orderData.distric}
                onChange={handleChange}
              />
              <InputComponent
                placeholder="Provincia"
                name="province"
                value={orderData.province}
                onChange={handleChange}
              />
            </div>
            <InputComponent
              placeholder="Calle y Número"
              name="street"
              value={orderData.street}
              onChange={handleChange}
              classStyle="mt-3"
            />
            <div className="flex mt-3 items-center gap-5">
              <InputComponent
                placeholder="Dpto, Oficina, etc..(* Opcional)"
                name="office"
                value={orderData.office}
                onChange={handleChange}
              />
              <InputComponent
                placeholder="Codigo Postal (* Opcional)"
                type="number"
                value={orderData.postalCode}
                name="postalCode"
                onChange={handleChange}
              />
            </div>
            <div className="mt-3">
              <TextComponent
                title="Detalles adicionales o referencias (* Opcional)"
                name="details"
                value={orderData.details}
                handleChange={handleChange}
              />
            </div>
            <h4 className="text-[#a2a5a7] text-lg mt-4">
              DETALLES DE CONTACTO
            </h4>
            <InputComponent
              placeholder="Correo eletrónico"
              name="email"
              value={orderData.email}
              onChange={handleChange}
              classStyle="mt-3"
            />
            <div className="flex mt-3 items-center gap-5">
              <InputComponent
                placeholder="Nombres"
                name="names"
                value={orderData.names}
                onChange={handleChange}
              />
              <InputComponent
                placeholder="Apellidos"
                name="lastnames"
                value={orderData.lastnames}
                onChange={handleChange}
              />
            </div>
            <InputComponent
              placeholder="Número telefónico"
              type="number"
              name="phone"
              value={orderData.phone}
              onChange={handleChange}
              classStyle="mt-3"
            />
            <h4 className="text-[#a2a5a7] text-lg mt-4">DOCUMENTO DE COMPRA</h4>
            <div className="w-[100%] grid grid-cols-2 gap-4 mt-5 ">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="document-button"
                  value="BOLETA"
                  className="hidden"
                  onChange={() => handleDocumentSelection("BOLETA")}
                />
                <span
                  className={`w-[100%] text-center py-3 border border-[#aaa] rounded-md  cursor-pointer  font-bold sm:text-sm transition-all duration-300 ease-in-out ${
                    typeDocument === "BOLETA"
                      ? "ring ring-offset-1 bg-[#ebebeb] text-[#767676]"
                      : ""
                  }`}
                >
                  BOLETA
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="document-button"
                  value="FACTURA"
                  className="hidden"
                  onChange={() => handleDocumentSelection("FACTURA")}
                />
                <span
                  className={`w-[100%] text-center py-3 border border-[#aaa] rounded-md  cursor-pointer font-bold sm:text-sm transition-all duration-300 ease-in-out ${
                    typeDocument === "FACTURA"
                      ? "ring ring-offset-1 bg-[#ebebeb] text-[#767676]"
                      : ""
                  }`}
                >
                  FACTURA
                </span>
              </label>
            </div>
            <div className="flex mt-5 items-center gap-5">
              <InputComponent
                placeholder="DNI o RUC"
                type="number"
                name="document"
                value={orderData.document}
                onChange={handleChange}
              />
              {typeDocument == "FACTURA" && (
                <InputComponent
                  placeholder="Razón Social"
                  name="businessName"
                  value={orderData.businessName}
                  onChange={handleChange}
                />
              )}
            </div>
            <h4 className="text-[#a2a5a7] text-lg mt-5">MEDIO DE PAGO</h4>
            <div className="w-[100%] grid grid-cols-1 gap-4 mt-5 ">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment-button"
                  value="TRANSFERENCIA"
                  className="hidden"
                  onChange={() => handlePaymentMethodSelection("TRANSFERENCIA")}
                />
                <span
                  className={`w-[100%] py-3 border pl-5 border-[#aaa] rounded-md  cursor-pointer  font-bold sm:text-sm transition-all duration-300 ease-in-out ${
                    paymentMethod === "TRANSFERENCIA"
                      ? "ring ring-offset-1 bg-[#ebebeb] text-[#767676]"
                      : ""
                  }`}
                >
                  TRASNFERENCIA BANCARIA <br />
                  <div className="flex font-normal mt-3">
                    <div className="w-[50%]">
                      <span className="font-bold">Banco: </span>BCP
                    </div>
                    <div className="w-[50%]">
                      <span className="font-bold">N° Cuenta: </span>123456789
                    </div>
                  </div>
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment-button"
                  value="YAPE"
                  className="hidden"
                  onChange={() => handlePaymentMethodSelection("YAPE")}
                />
                <span
                  className={`w-[100%] pl-5 py-3 border border-[#aaa] rounded-md  cursor-pointer font-bold sm:text-sm transition-all duration-300 ease-in-out ${
                    paymentMethod === "YAPE"
                      ? "ring ring-offset-1 bg-[#ebebeb] text-[#767676]"
                      : ""
                  }`}
                >
                  YAPE <br />
                  <div className="flex font-normal mt-3 gap-5">
                    <span className="font-bold">Numero: </span> (+52) 965 487
                    654
                  </div>
                </span>
              </label>
            </div>
            <div className="my-10  flex items-center justify-between">
              <button
                onClick={() => {
                  router.push("/");
                }}
                disabled={loading}
                className="border border-[#FF5E3A] hover:opacity-70 text-xs sm:text-sm text-black py-2 px-5 font-bold rounded-xl transition-all duration-300 ease-in-out"
              >
                Seguir comprando
              </button>
              <button
                disabled={loading}
                className="bg-[#FF5E3A] hover:opacity-70 text-xs sm:text-base text-white py-2 px-5 font-bold rounded-xl transition-all duration-300 ease-in-out"
              >
                Continuar {`>`}
              </button>
            </div>
          </form>
        </div>

        <div className="w-[50%]">
          <div className="border p-5">
            <h2 className="text-[#a2a5a7] text-lg font-bold">
              RESUMEN DE TU COMPRA
            </h2>
            {/* PRODUCTOS ELEGIDOS */}
            <div className="w-[100%] mt-5 mb-10 max-h-56 overflow-auto">
              {addProductToCar &&
                addProductToCar.map((itemProduct) => (
                  <div className="flex items-center mt-5 gap-5">
                    <div className="w-[10%]">
                      <p className="text-center">{itemProduct.cantidad}</p>
                    </div>
                    <div className="w-[30%]">
                      <center>
                        <img
                          className="w-[80px] "
                          src={`${
                            itemProduct.imagen != ""
                              ? `${host_product_image}/${itemProduct.imagen}`
                              : "/card-item.png"
                          } `}
                          alt=""
                        />
                      </center>
                    </div>
                    <div className="w-[60%]">
                      <div className="flex-row">
                        <h3 className="text-[#86888a] text-sm">
                          {itemProduct.nombre}
                        </h3>
                        <p className="text-[#8f9193] font-bold mt-2">
                          S/ {parseFloat(itemProduct.monto_total).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* MONTOS TOTALES */}
            <div className="mt-5 flex gap-5">
              <div className="w-[50%]">
                <h3 className="text-sm text-[#8f9193]">Subtotal</h3>
              </div>
              <div className="w-[50%] text-right">
                <p className="text-sm text-[#8f9193]">
                  S/ {calSubTotalProduct(addProductToCar)}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <div className="w-[50%]">
                <h3 className="text-sm text-[#8f9193]">Env&iacute;o</h3>
              </div>
              <div className="w-[50%] text-right">
                <p className="text-sm text-[#8f9193]">
                  S/ {parseFloat(sendAmount).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <div className="w-[50%]">
                <h3 className="font-bold text-sm text-[#8f9193]">TOTAL</h3>
              </div>
              <div className="w-[50%] text-right">
                <p className="text-sm text-[#8f9193]">S/ {calTotalPayment()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
