import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      {/* BANNER */}
      <div className="w-[100%] flex items-center rounded-xl bg-gradient-to-r from-violet-200 to-pink-200 px-10 py-5">
        <div className="w-[100%] ml-10">
          <p className="text-xs pb-2">Limited Time Only For Winter</p>
          <h1 className="text-7xl pb-2">fashion</h1>
          <h2 className="text-lg pb-2">LOOK YOUR BEST ON YOUR BEST DAY</h2>
          <div className="mt-10">
            <button className="text-xs text-white font-bold px-10 py-3 rounded-xl bg-gradient-to-t from-[#ff664a] to-rose-400 cursor-pointer">
              Explore Now!
            </button>
          </div>
        </div>
        <div className="w-[40%]">
          <img className="w-[500px]" src="/logo.jpg" alt="" />
        </div>
      </div>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">COLECCI&Oacute;N</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Nuestra Colecci&oacute;n</h2>
      </div>
      {/* Menu de opciones */}
      <div className="w-[100%] mt-8 flex justify-center items-center gap-3">
        <button className="text-xs font-bold px-4 py-5 rounded-xl bg-gradient-to-t hover:text-white cursor-pointer transition-all duration-500 ease-in-out hover:from-rose-400 hover:to-[#ff664a] hover:bg-white">
          Joyeria
        </button>

        <button className="text-xs font-bold px-4 py-5 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:bg-white">
          Accesorios
        </button>
        <button className="text-xs font-bold px-4 py-5 rounded-xl bg-gradient-to-t hover:text-white cursor-pointer transition-all duration-500 ease-in-out hover:from-rose-400 hover:to-[#ff664a] hover:bg-white">
          Vestidos
        </button>
        <button className="text-xs font-bold px-4 py-5 rounded-xl bg-gradient-to-t hover:text-white cursor-pointer transition-all duration-500 ease-in-out hover:from-rose-400 hover:to-[#ff664a] hover:bg-white">
          Calzado
        </button>
      </div>
      {/* SECCION */}
      <section></section>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">CATEGORIAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Ultima colecci&oacute;n</h2>
      </div>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">ESTAD&Iacute;STICAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Nuestra Estadistica</h2>
      </div>
    </Layout>
  );
};

export default Home;
