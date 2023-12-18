import { useState } from "react";
import Link from "next/link";
import InputComponent from "@/components/Admin/InputComponent";
import Layout from "@/components/Layout";

const Home = () => {
  const [inputStatus, setInputStatus] = useState(true);

  return (
    <Layout>
      <h2 className="text-center mt-3 mb-10 font-bold text-3xl">Mi cuenta</h2>
      <div className="flex-row sm:flex gap-10 mx-5">
        <div className="sm:w-[40%]">
          <h3 className="text-base sm:text-lg font-semibold mb-10">
            Bienvenido a tu cuenta en MAKYS. Aquí tendr&aacute;s acceso a una
            variedad de funciones y características diseñadas para mejorar tu
            experiencia.
          </h3>
          <div className="w-full grid grid-cols-1 ml-10">
            <Link
              href="/order"
              className="w-[100%] font-bold hover:underline text-sm"
            >
              - Historial de Pedidos
            </Link>
            <br />
          </div>
        </div>
        <div className="sm:w-[60%]">
          <form>
            <h2 className="text-center mt-3 mb-5 font-bold text-xl underline">
              Detalles de mi cuenta
            </h2>
            <div className="mt-2">
              <InputComponent
                placeholder="Documento de identidad"
                type="number"
                status={inputStatus}
              />
            </div>
            <div className="flex-row sm:flex items-center gap-5 mt-5">
              <InputComponent
                placeholder="Nombres"
                status={inputStatus}
                classStyle="mb-5 sm:mb-0"
              />
              <InputComponent placeholder="Apellidos" status={inputStatus} />
            </div>
            <div className="flex-row sm:flex items-center gap-5 mt-5">
              <InputComponent
                placeholder="Telefono"
                type="number"
                status={inputStatus}
                classStyle="mb-5 sm:mb-0"
              />
              <InputComponent
                placeholder="Correo electrónico"
                type="email"
                status={inputStatus}
              />
            </div>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <button
                type="reset"
                onClick={() => {
                  setInputStatus(!inputStatus);
                }}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {!inputStatus ? "Cancelar" : "Editar"}
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#FF5E3A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Guardar Datos
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
