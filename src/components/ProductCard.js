import { useState, useEffect } from "react";
import Link from "next/link";
import { HiPlusSmall, HiMinusSmall } from "react-icons/hi2";
import { host_product_image } from "@/configuration/utils";
import { useGlobal } from "@/context/GlobalProvider";

const ProductCard = () => {
  const { addProductToCar, addShoppingCar, removeShoppingCar } = useGlobal();

  return (
    <>
      {addProductToCar &&
        addProductToCar.map((itemProduct) => (
          <div
            key={itemProduct.id_producto}
            className="mt-10 flex items-center justify-between "
          >
            <div className="w-[70%]">
              <div className="flex items-center gap-5">
                <img
                  className="w-[150px]"
                  src={
                    itemProduct.imagen == ""
                      ? "/card-item.png"
                      : `${host_product_image}/${itemProduct.imagen}`
                  }
                  alt=""
                />
                <div className="flex-row">
                  <Link href="" className="hover:opacity-70">
                    {itemProduct.nombre}
                  </Link>
                  <p className="text-sm mt-3">S/ {itemProduct.precio}</p>
                </div>
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex h-8 mb-4 md:mb-0">
                    <button
                      data-action="decrement"
                      className="flex items-center justify-center bg-[#FF5E3A] w-10 rounded-l-xl mr-1 md:mr-2"
                      onClick={() => {
                        removeShoppingCar(itemProduct.id_producto);
                      }}
                    >
                      <HiMinusSmall className="h-5 w-5" color="white" />
                    </button>
                    <input
                      type="text"
                      className="text-center outline-none bg-transparent text-[#4F5665] border-none w-14 md:w-20"
                      value={itemProduct.cantidad}
                      disabled={true}
                    />
                    <button
                      data-action="increment"
                      disabled={itemProduct.cantidad >= itemProduct.stock}
                      className={`flex items-center justify-center ${
                        itemProduct.cantidad >= itemProduct.stock
                          ? "bg-[#c9a198]"
                          : "bg-[#FF5E3A]"
                      } w-10 rounded-r-xl ml-1 md:ml-2 transition-all duration-300`}
                      onClick={() => {
                        addShoppingCar({
                          id_producto: itemProduct.id_producto,
                          codigo: itemProduct.codigo,
                          nombre: itemProduct.nombre,
                          stock: itemProduct.cantidad,
                          marca: itemProduct.marca,
                          categoria: itemProduct.categoria,
                          descripcion: itemProduct.descripcion,
                          precio: itemProduct.precio,
                          imagen: itemProduct.imagen,
                          genero: itemProduct.genero,
                        });
                      }}
                    >
                      <HiPlusSmall className="h-5 w-5" color="white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="flex items-center justify-end">
                <p>S/ {parseFloat(itemProduct.monto_total).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
