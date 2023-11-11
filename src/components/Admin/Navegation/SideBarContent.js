import React from "react";
import Link from "next/link";
import {
  FaBars,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
} from "react-icons/fa6";

const SideBarContent = ({ children }) => {
  return (
    <div className="w-[100%] flex h-screen bg-[#efeff7]">
      {/* SIDEBAR DE OPCIONES */}
      <div className="w-[25%] bg-white border">
        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href=""
            className="flex items-center gap-5 hover:text-[#FF5151] font-bold text-base"
          >
            <img src="/logo.jpg" alt="" className="w-[40px] rounded-full" />
            MAKYS PANEL
          </Link>
        </div>

        <h2 className="mt-3 text-center text-xs text-[#606879]">
          Todo el nombre del usuario
        </h2>

        <h3 className="mt-5 p-5 text-sm font-bold text-[#FF5151]">OPCIONES</h3>

        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href=""
            className="flex items-center ml-10 gap-5 text-[#606879] hover:text-[#FF5151] font-bold text-sm transition-all duration-300 ease-in-out"
          >
            <FaDiceFive />
            Ventas
          </Link>
        </div>
        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href=""
            className="flex items-center ml-10 gap-5 text-[#606879] hover:text-[#FF5151] font-bold text-sm transition-all duration-300 ease-in-out"
          >
            <FaDiceFour />
            Pedidos
          </Link>
        </div>
        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href="/admin/dashboard/product"
            className="flex items-center ml-10 gap-5 text-[#606879] hover:text-[#FF5151] font-bold text-sm transition-all duration-300 ease-in-out"
          >
            <FaDiceThree />
            Productos
          </Link>
        </div>
        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href="/admin/dashboard/category"
            className="flex items-center ml-10 gap-5 text-[#606879] hover:text-[#FF5151] font-bold text-sm transition-all duration-300 ease-in-out"
          >
            <FaDiceTwo />
            Categorias
          </Link>
        </div>
        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href="/admin/dashboard/brand"
            className="flex items-center ml-10 gap-5 text-[#606879] hover:text-[#FF5151] font-bold text-sm transition-all duration-300 ease-in-out"
          >
            <FaDiceOne />
            Marcas
          </Link>
        </div>
      </div>
      <div className="w-[100%] flex-row">
        {/* SIDEBAR TOP */}
        <div className="w-[100%] bg-white p-5 border">
          <div className="w-[100%] flex items-center justify-between">
            <FaBars className="cursor-pointer text-2xl text-[#606879] hover:scale-110 transition-all duration-300 ease-in-out hover:text-[#3e4249]" />
            <p className="text-xs text-[#606879]">ADMINISTRADOR</p>
            <Link
              href="/"
              className="text-sm text-[#FF5151] hover:opacity-70 hover:text-[#606879] transition-all duration-300 ease-in-out"
            >
              Cerrar sesi&oacute;n
            </Link>
          </div>
        </div>
        {/* CONTENIDO */}
        <div className="w-[100%] p-5">{children}</div>
      </div>
    </div>
  );
};

export default SideBarContent;
