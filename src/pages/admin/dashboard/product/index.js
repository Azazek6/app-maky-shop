import React from "react";
import { useRouter } from "next/router";
import { HiMagnifyingGlass, HiMiniPlusCircle } from "react-icons/hi2";
import Layout from "@/components/Admin/Layout";
import CardProduct from "@/components/Admin/Card/CardProduct";
import SelectedComponent from "@/components/Admin/SelectedComponent";

const productList = [
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
  {
    codigo: "SCR324G5",
    nombre: "polo",
    descripcion: "sadasdasd",
    tallas: "S - M - L - XL",
    estado: "Activo",
  },
];

const Product = () => {
  const router = useRouter();
  return (
    <Layout>
      <h2 className="text-2xl text-[#ff7f51] font-bold">MIS PRODUCTOS</h2>
      <div className="w-[100%] flex justify-end mt-5 mb-3">
        <button
          onClick={() => {
            router.push("/admin/dashboard/product/create");
          }}
          className=" flex items-center gap-3 text-sm font-bold px-2 py-3 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:opacity-80"
        >
          <HiMiniPlusCircle className="font-bold text-2xl" />
          Nuevo Producto
        </button>{" "}
      </div>
      <div className="w-[100%] flex items-center justify-center mt-5 gap-10">
        <div className="w-[100%] ">
          <SelectedComponent title="Categoria" />
        </div>
        <div className="w-[100%]">
          <SelectedComponent title="Marca" />
        </div>
      </div>
      <div className="w-[100%] flex items-center mt-5 gap-10">
        <div className=" w-[100%]">
          <SelectedComponent title="Tallas" />
        </div>
        <div className="relative w-[100%]">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Ingrese nombre a buscar"
              className="w-[100%] mt-[3px] text-sm outline-none border border-[#cfcecf] p-2 placeholder:text-[#979fa9] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-y-0 right-5 flex items-center pr-2 mt-1 text-[#979fa9]">
              <HiMagnifyingGlass className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE DATOS */}
      <div className="w-[100%] mt-8">
        <CardProduct data={productList} section="/brand/edit/1" />
      </div>
    </Layout>
  );
};

export default Product;
