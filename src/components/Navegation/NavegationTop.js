import { useState } from "react";
import Link from "next/link";
import {
  HiMiniBars3,
  HiOutlineXMark,
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineWrenchScrewdriver
} from "react-icons/hi2";
import { useGlobal } from "../../context/GlobalProvider";

const NavegationTop = () => {
  const { actionBar, handleClickShowActionBar, handleClickShowCredential } =
    useGlobal();

  return (
    <>
      <nav className="flex justify-between items-center gap-3 w-[100%] p-6 fixed z-50 top-0 left-0 bg-white ">
        <div className="w-[100%] sm:w-[22%] sm:ml-10 flex items-center gap-5">
          <div className="block sm:hidden border border-[#8892a9] rounded-md p-1 hover:opacity-70 transition-all duration-300 ease-in-out">
            {!actionBar ? (
              <HiMiniBars3
                className="text-2xl cursor-pointer "
                onClick={handleClickShowActionBar}
              />
            ) : (
              <HiOutlineXMark
                className="text-2xl cursor-pointer "
                onClick={handleClickShowActionBar}
              />
            )}
          </div>
          <Link
            href="/"
            className="flex items-center gap-4 w-10 font-bold text-[#FF5151]"
          >
            <img className="w-14 rounded-full" src="/logo.jpg" alt="" />
            MAKYS
          </Link>
        </div>
        <div className="w-[100%] hidden sm:flex justify-center items-center gap-5 ">
          <Link href="/" className="hover:text-[#FF5151] hover:font-bold">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#FF5151] hover:font-bold">
            Acerca De
          </Link>
        </div>
        <div className="w-[30%] hidden sm:flex justify-center items-center gap-5 ">
          <Link
            href=""
            className="hover:text-[#FF5151] hover:font-bold text-2xl"
          >
            <HiOutlineMagnifyingGlass />
          </Link>
          <Link
            href="/"
            onClick={handleClickShowCredential}
            className="hover:text-[#FF5151] hover:font-bold text-2xl"
          >
            <HiOutlineUser />
          </Link>
          <Link
            href="/admin"
            target="_blank"
            title="Dashboard"
            className="hover:text-[#FF5151] hover:font-bold text-2xl"
          >
            <HiOutlineWrenchScrewdriver />
          </Link>
          <Link
            href=""
            className="hover:text-[#FF5151] hover:font-bold text-2xl"
          >
            <HiOutlineBell />
          </Link>
        </div>
      </nav>
      {/* NAVEGACION MOBIL */}
      <nav
        className={`w-[100%] flex-row z-50 top-0 left-0 fixed mt-20 ${
          actionBar ? "ml-0" : "-ml-[100%] bg-transparent"
        }  bg-[#a5abb877] items-center py-3 px-5 transition-all duration-500 ease-in-out`}
      >
        <div className="w-[100%]">
          <Link
            href="/"
            className="hover:text-[#FF5151] hover:font-bold text-sm block p-1"
          >
            Home
          </Link>
        </div>
        <div className="w-[100%] mt-2">
          <Link
            href="/about"
            className="hover:text-[#FF5151] hover:font-bold text-sm block p-1"
          >
            Acerca De
          </Link>
        </div>

        <hr className="mt-3 mb-3 border-[#2c2c2c74]" />

        <div className="w-[100%]">
          <Link
            href="/"
            className="hover:text-[#FF5151] hover:font-bold text-sm block p-1"
          >
            Mi Perfil
          </Link>
        </div>
        <div className="w-[100%] mt-2">
          <Link
            href="/signin"
            className="hover:text-[#FF5151] hover:font-bold text-sm block p-1"
          >
            Iniciar Sesi&oacute;n
          </Link>
        </div>
        <div className="w-[100%] mt-2">
        <Link
            href="/admin/signin"
            target="_blank"
            title="Dashboard"
            className="hover:text-[#FF5151] hover:font-bold text-sm block p-1"
          >
            <HiOutlineWrenchScrewdriver />
          </Link>
        </div>
        <div className="w-[100%] mt-2">
          <Link
            href="/signin"
            className="hover:text-[#FF5151] hover:font-bold text-sm block p-1"
          >
            Cerrar Sesi&oacute;n
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavegationTop;
