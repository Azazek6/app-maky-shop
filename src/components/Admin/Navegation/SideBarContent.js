import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FaBars,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa6";
import { useGlobal } from "@/context/GlobalProvider";
import jwt_decode from "jwt-decode";

const SideBarContent = ({ children }) => {
  const {userDataPanel} = useGlobal()
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [toogleSideBar, setToogleSideBar] = useState(true);

  const signOut = () => {
    localStorage.removeItem("tokenMakyPanel");
    setTimeout(() => {
      router.push("/admin");
    }, 500);
  };

  useEffect(() => {
    const tokenPanel = localStorage.getItem("tokenMakyPanel");

    if (tokenPanel) {
      const data = jwt_decode(tokenPanel);
      setUserData(data);
    }
  }, []);

  return (
    <div className="w-[100%] flex h-screen bg-[#efeff7] overflow-hidden">
      {/* SIDEBAR DE OPCIONES */}
      <div
        className={`${
          toogleSideBar ? "w-[100%] sm:w-[80%] md:w-[25%]" : "w-[0%]"
        } bg-white border transition-all duration-500 ease-in-out`}
      >
        <div className="w-[100%] border-b-2 p-[19px]">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-5 hover:text-[#FF5151] font-bold text-base"
          >
            <img src="/logo.jpg" alt="" className="w-[40px] rounded-full" />
            MAKYS PANEL
          </Link>
        </div>
        {toogleSideBar && (
          <>
            <h2 className="mt-3 text-center text-xs text-[#606879]">
              {userData?.apellidos} {userData?.nombres}
            </h2>

            <h3 className="mt-5 p-5 text-sm font-bold text-[#FF5151]">
              OPCIONES
            </h3>

            <div className="w-[100%] border-b-2 p-[19px]">
              <Link
                href="/admin/dashboard/user"
                className="flex items-center ml-10 gap-5 text-[#606879] hover:text-[#FF5151] font-bold text-sm transition-all duration-300 ease-in-out"
              >
                <FaDiceSix />
                Usuarios
              </Link>
            </div>
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
          </>
        )}
      </div>
      <div
        className={`${
          toogleSideBar ? "max-[400px]:-mr-48" : "sm:mr-0"
        } w-[100%] flex-row transition-all duration-500 ease-in-out`}
      >
        {/* SIDEBAR TOP */}
        <div className="w-[100%] bg-white p-5 border">
          <div className="w-[100%] flex items-center justify-between">
            {/* BARRA DE MENU */}
            <FaBars
              className="cursor-pointer text-2xl text-[#606879] hover:scale-110 transition-all duration-300 ease-in-out hover:text-[#3e4249]"
              onClick={() => {
                setToogleSideBar(!toogleSideBar);
              }}
            />
            <p className="text-xs text-[#606879]">ADMINISTRADOR</p>
            <Link
              href="#"
              onClick={signOut}
              className="text-sm text-[#FF5151] hover:opacity-70 hover:text-[#606879] transition-all duration-300 ease-in-out"
            >
              Cerrar sesi&oacute;n
            </Link>
          </div>
        </div>
        {/* CONTENIDO */}
        <div className="w-[100%] p-5 overflow-x-auto max-h-[720px] sd:max-h-[100px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
