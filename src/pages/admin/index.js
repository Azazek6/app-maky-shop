import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <>
      <Head>
        <title>Iniciar Sesion | Administracion</title>
      </Head>
      <div className="bg-[#cccbff] fixed top-0 left-0 w-full h-screen z-50">
        <div
          className={`mt-44 w-[90%] md:w-[50%] lg:w-[30%] m-auto flex bg-[#e2e8f0] rounded-lg`}
        >
          <div className="w-[100%] p-5">
            <h2 className="text-center text-base sm:text-xl text-[#475569] font-bold">
              Sistema Administrativo
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="m-auto w-[90%] flex-row items-center mt-10">
                <label
                  htmlFor=""
                  className="text-[#475569] text-xs font-semibold"
                >
                  USUARIO
                </label>
                <input
                  type="text"
                  placeholder="Usuario"
                  name="username"
                  className="w-[100%] mt-[3px] outline-none border border-[#cfcecf] p-2 placeholder:text-[#cbd5e1] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="m-auto w-[90%] flex-row items-center mt-5">
                <label
                  htmlFor=""
                  className="text-[#475569] text-xs font-semibold"
                >
                  CONTRASE&Ntilde;A
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="w-[100%] mt-[3px] outline-none border border-[#cfcecf] p-2 placeholder:text-[#cbd5e1] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="w-[90%] m-auto flex mt-5">
                <button className="w-[100%] text-sm sm:text-lg mt-[16px] border bg-[#1e293b] p-2 text-white font-semibold rounded-md hover:opacity-80 transition-all duration-300 ease-in-out">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
