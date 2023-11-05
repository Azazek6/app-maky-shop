import React from "react";
import Layout from "@/components/Layout";
import CardItem from "@/components/CardItem";
import ReviewCardItem from "@/components/ReviewCardItem";
import collections from "@/sample/collections.json";
import categories from "@/sample/categories.json";
import reviews from "@/sample/reviews.json";

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
        <button className="text-[9px] sm:text-xs font-bold px-2 py-3 sm:px-4 sm:py-5 rounded-xl bg-gradient-to-t hover:text-white cursor-pointer transition-all duration-500 ease-in-out hover:from-rose-400 hover:to-[#ff664a] hover:bg-white">
          Joyeria
        </button>

        <button className="text-[9px] sm:text-xs font-bold px-2 py-3 sm:px-4 sm:py-5 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:bg-white">
          Accesorios
        </button>
        <button className="text-[9px] sm:text-xs font-bold px-2 py-3 sm:px-4 sm:py-5 rounded-xl bg-gradient-to-t hover:text-white cursor-pointer transition-all duration-500 ease-in-out hover:from-rose-400 hover:to-[#ff664a] hover:bg-white">
          Vestidos
        </button>
        <button className="text-[9px] sm:text-xs font-bold px-2 py-3 sm:px-4 sm:py-5 rounded-xl bg-gradient-to-t hover:text-white cursor-pointer transition-all duration-500 ease-in-out hover:from-rose-400 hover:to-[#ff664a] hover:bg-white">
          Calzado
        </button>
      </div>
      {/* SECCION */}
      <section className="m-auto w-[100%] sm:w-[72%] p-8 mt-8">
        <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardItem item={collections} />
        </div>
      </section>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">CATEGORIAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Ultima colecci&oacute;n</h2>
      </div>
      {/* SECCION */}
      <section className="m-auto w-[100%] sm:w-[72%] p-8 mt-8">
        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <CardItem item={categories} />
        </div>
      </section>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">RESEÑAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Opinion de los compradores</h2>
      </div>
      {/* SECCION */}
      <section className="m-auto w-[100%] sm:w-[72%] p-8 mt-1">
        <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ReviewCardItem item={reviews} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
