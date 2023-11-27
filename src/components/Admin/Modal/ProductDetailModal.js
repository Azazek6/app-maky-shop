import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiMiniStar } from "react-icons/hi2";
import { useRouter } from "next/router";
import Accordeon from "@/components/Accordeon";
import { useGlobal } from "@/context/GlobalProvider";

const ProductDetailModal = ({ idProduct, open, setOpen, cancelButtonRef }) => {
  const { fetchProductForId } = useGlobal();
  const router = useRouter();
  const [productId, setProductId] = useState({});

  const getMoreDetail = () => {
    return (
      <>
        <div className="w-[100%] flex-row sm:flex items-center gap-4">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            CANTIDAD:
          </h2>
          <p className="font-semibold text-green-800 text-xs sm:text-sm mt-3 sm:mt-0">
            {productId.cantidad}
          </p>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center gap-4 mt-3">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            CATEGORIA:
          </h2>
          <p className="font-semibold text-xs sm:text-sm mt-3 sm:mt-0">
            {productId.categoria?.nombre}
          </p>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center gap-4 mt-3">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            MARCA:
          </h2>
          <p className="font-semibold text-xs sm:text-sm mt-3 sm:mt-0">
            {productId.marca?.nombre}
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    const loadData = async (id) => {
      try {
        const { data } = await fetchProductForId(id);
        setProductId(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (idProduct != null) {
      loadData(idProduct);
    }
  }, [idProduct]);

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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      sdf
                    </div> */}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h2 className="text-lg sm:text-3xl font-bold">
                        {productId.nombre}
                      </h2>
                      <p className="text-sm sm:text-xl mt-4">
                        S/. {productId.precio}
                      </p>
                      <div className="flex items-center justify-center sm:justify-normal gap-2 mt-4">
                        <HiMiniStar
                          className={`text-[14px] sm:text-[16px] text-[#FF5E3A]`}
                        />
                        <HiMiniStar
                          className={`text-[14px] sm:text-[16px] text-[#FF5E3A]`}
                        />
                        <HiMiniStar
                          className={`text-[14px] sm:text-[16px] text-[#FF5E3A]`}
                        />
                        <HiMiniStar
                          className={`text-[14px] sm:text-[16px] text-gray-400`}
                        />
                      </div>
                      <p className="mt-4 text-sm sm:text-base text-[#4F5665]">
                        {productId.descripcion}
                      </p>
                      {/* SELECCION DE COLORES */}
                      <h3 className="mt-5 text-[#636c7d] text-sm font-bold">
                        Colores:
                      </h3>
                      <div className="w-[100%] flex items-center justify-center sm:justify-normal gap-5 mt-3">
                        <span
                          className={`w-10 h-10 border rounded-full bg-red-500`}
                        ></span>
                        <span
                          className={`w-10 h-10 border rounded-full bg-blue-500`}
                        ></span>
                        <span
                          className={`w-10 h-10 border rounded-full bg-green-500`}
                        ></span>
                      </div>
                      {/* SELECCION DE TALLAS */}
                      <h3 className="mt-5 text-[#636c7d] text-sm font-bold">
                        Tallas:
                      </h3>
                      <div className="w-[100%] grid grid-cols-4 mt-3">
                        {productId.producto_tallas?.map((itemSize) => (
                          <span
                            key={itemSize.talla}
                            className={`w-[100px] text-center py-3 border rounded-md font-bold text-xs sm:text-sm`}
                          >
                            {itemSize.talla}
                          </span>
                        ))}
                      </div>
                      {/* DETALLES */}
                      <div className="mt-4">
                        <Accordeon
                          title="Mas Detalles"
                          content={getMoreDetail()}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 mb-4 sm:mb-0 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      router.push(
                        `/admin/dashboard/product/edit/${productId.id_producto}`
                      );
                    }}
                    ref={cancelButtonRef}
                  >
                    Editar
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

export default ProductDetailModal;
