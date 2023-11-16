import React from "react";
import { useRouter } from "next/router";
import { HiMagnifyingGlass, HiMiniPlusCircle } from "react-icons/hi2";
import Layout from "@/components/Admin/Layout";
import TableGeneral from "@/components/Admin/Table/TableGeneral";

const categoryList = [
  {
    nombre: "SCR324G5",
    estado: "Activo",
  },
  {
    nombre: "SCR324G5",
    estado: "Activo",
  },
  {
    nombre: "SCR324G5",
    estado: "Activo",
  },
  {
    nombre: "SCR324G5",
    estado: "Activo",
  },
];

const title = [
  {
    id: "nombre",
    name: "Nombre",
  },
  {
    id: "estado",
    name: "Estado",
  },
];

const Category = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-[100%] flex items-center justify-between mt-5">
        <div className="relative w-[100%]">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Ingrese nombre a buscar"
              className="w-[80%] mt-[3px] text-sm outline-none border border-[#cfcecf] p-2 placeholder:text-[#979fa9] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-y-0 right-36 flex items-center pr-2 mt-1 text-[#979fa9]">
              <HiMagnifyingGlass className="text-xl" />
            </div>
          </div>
        </div>
        <div className="w-[100%] flex justify-end">
          <button
            onClick={() => {
              router.push("/admin/dashboard/category/create");
            }}
            className="mr-10 flex items-center gap-3 text-sm font-bold px-2 py-3 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:opacity-80"
          >
            <HiMiniPlusCircle className="font-bold text-2xl" />
            Nueva Categoria
          </button>
        </div>
      </div>
      {/* TABLA DE DATOS */}
      <div className="w-[100%] mt-8">
        <TableGeneral
          title={title}
          data={categoryList}
          section="/category/edit/1"
        />
      </div>
    </Layout>
  );
};

export default Category;
