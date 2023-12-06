import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { toastMessage } from "@/helpers/general";
import { useGlobal } from "../../context/GlobalProvider";

const Home = () => {
  const { userData, addProductToCar } = useGlobal();
  const router = useRouter();

  // Calcular el sub Total del producto
  const finalAmount = addProductToCar.reduce(
    (acc, currItem) => acc + parseFloat(currItem.monto_total),
    0
  );

  return (
    <Layout>
      <div className="mx-5">
        <h2 className="mt-3 mb-10 font-normal text-2xl">
          Carro de Compras ({addProductToCar.length})
        </h2>
        {addProductToCar.length != 0 ? (
          <>
            <ProductCard />
            <div className="text-right">
              <p className="text-2xl font-medium text-[#444955]">
                Subtotal: S/ {finalAmount.toFixed(2)}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="border border-[#FF5E3A] hover:opacity-70 text-xs sm:text-sm text-black py-2 px-5 font-bold rounded-xl transition-all duration-300 ease-in-out"
              >
                Seguir comprando
              </button>
              <button
                onClick={() => {
                  if (userData == null) {
                    toastMessage("Debe iniciar sesión para continuar", 2);
                    return;
                  }
                  router.push("/process/checkout");
                }}
                className="bg-[#FF5E3A] hover:opacity-70 text-xs sm:text-base text-white py-2 px-5 font-bold rounded-xl transition-all duration-300 ease-in-out"
              >
                Continuar {`>`}
              </button>
            </div>
          </>
        ) : (
          <div className="mt-5 text-center">
            <p className="text-2xl text-[#4F5665]">
              El carrito se encuentra vacio...!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
