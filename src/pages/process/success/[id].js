import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>MAKYS | Pagos</title>
      </Head>

      <div className="flex items-center justify-center bg-gray-50 py-6 px-4 ">
        <div className="max-w-md w-full space-y-8 bg-white p-5 rounded-xl shadow-lg">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-20 h-20 text-green-500 mx-auto mb-4"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>

            <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
              ¡Gracias por tu pedido!
            </h2>

            <p className="mt-3 text-sm md:text-base lg:text-lg text-gray-600">
              Tu pedido #{router.query.id} ha sido recibido y pronto empezaremos
              a procesarlo.
            </p>

            <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600">
              Estamos en el proceso de confirmar tu pago. Una vez que esto se
              complete, procederemos con el envío de tu pedido. ¡Estamos
              emocionados de que recibas lo que has elegido!
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => (location.href = "/")}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Volver a la tienda
            </button>

            <button
              onClick={() => (location.href = "/order")}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
            >
              Ver mis pedidos
            </button>
          </div>

          <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600 lg:text-justify">
            Una vez que tu pago haya sido completado, necesitamos que subas una
            copia de tu comprobante de pago en la seccion de tu pedido
            realizado. Esto nos ayudará a procesar tu pedido rápidamente. Si
            tienes alguna otra pregunta o necesitas ayuda adicional, por favor
            no dudes en contactarnos.
          </p>
        </div>
      </div>
    </>
  );
};

export default Payment;
