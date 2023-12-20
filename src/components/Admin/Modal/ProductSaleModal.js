import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import InputComponent from "../InputComponent";
import InputAutoComplete from "../InputAutoComplete";
import { useGlobal } from "@/context/GlobalProvider";
import { toastMessage, truncateText } from "@/helpers/general";

const ProductSaleModal = ({ dataClient, open, setOpen, cancelButtonRef }) => {
  const { product, fetchProduct, addProductSales } = useGlobal();
  const router = useRouter();

  const [productData, setProductData] = useState({
    code: "",
    id_product: "",
    product: "",
    price: "",
    igv: "",
    stock_product: "",
    stock: "",
    monto_total: "",
    discount: "",
  });

  const clearData = () => {
    setProductData({
      code: "",
      id_product: "",
      product: "",
      price: "",
      igv: "",
      stock_product: "",
      stock: "",
      monto_total: "",
      discount: "",
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setProductData({ ...productData, [name]: value });
  };

  const handleClickSaveProducts = (e) => {
    e.preventDefault();

    if (productData.id_product == "") {
      toastMessage("Debe seleccionar un producto", 2);
      return;
    }

    if (productData.stock == "") {
      toastMessage("Debe ingresar una cantidad a adquirir", 2);
      return;
    }

    if (productData.discount != "") {
      if (productData.discount <= 0) {
        toastMessage("El descuento no puede ser 0 o menor", 2);
        return;
      }
    }

    if (productData.stock <= 0) {
      toastMessage("La cantidad a adquirir no debe ser 0 o menor", 2);
      return;
    }

    let total_amount = 0;

    if (productData.discount > 0) {
      total_amount =
        parseFloat(productData.stock) * parseFloat(productData.price) -
        parseFloat(productData.discount);
    }

    if (productData.discount == "") {
      total_amount =
        parseFloat(productData.stock) * parseFloat(productData.price);
    }

    addProductSales({
      code: productData.code,
      id_product: productData.id_product,
      product: truncateText(productData.product, 20),
      stock: productData.stock,
      price: productData.price,
      igv: productData.igv,
      monto_total: total_amount.toFixed(2),
      discount: productData.discount == "" ? 0 : productData.discount,
    });

    toastMessage("Producto agregado", 1);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          clearData();
          setOpen(false);
        }}
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
                        Detalle de Producto
                      </h2>
                    </div>
                    <InputAutoComplete
                      options={product}
                      dataProduct={setProductData}
                    />
                    <div className="mt-5">
                      <div className="flex items-center gap-5">
                        <InputComponent
                          placeholder={
                            productData.price != ""
                              ? `Precio: S/. ${productData.price}`
                              : "Precio"
                          }
                          read={true}
                          name="price"
                          //value={productData.price}
                          onChange={handleChange}
                        />
                        <InputComponent
                          placeholder="18% de IGV"
                          read={true}
                          name="igv"
                          //value={productData.igv}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex items-center gap-5 mt-3">
                        <InputComponent
                          placeholder={`Cantidad disponible: ${productData.stock_product}`}
                          read={true}
                          name="stock_product"
                          //value={productData.stock_product}
                          onChange={handleChange}
                        />
                        <InputComponent
                          placeholder="Cantidad a comprar"
                          type="number"
                          name="stock"
                          value={productData.stock}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mt-5">
                        <InputComponent
                          placeholder="Descuento (opcional)"
                          type="number"
                          name="discount"
                          value={productData.discount}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={handleClickSaveProducts}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 mb-4 sm:mb-0 sm:ml-3 sm:w-auto"
                    ref={cancelButtonRef}
                  >
                    Agregar
                  </button>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      clearData();
                      setOpen(false);
                    }}
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

export default ProductSaleModal;
