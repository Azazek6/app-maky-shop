import React from "react";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLocation,
  IoMail,
  IoCall,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="mt-12 bg-[#FCCB90] bg-opacity-40 px-20 py-10 grid grid-cols-1 xl:grid-cols-5 gap-12">
      <div className="w-[100%]">
        <Link
          href="/"
          className="flex items-center gap-4 w-10 font-bold text-[#FF5151]"
        >
          <img className="w-14 rounded-full" src="/logo.jpg" alt="" />
          MAKYS
        </Link>
        <p className="mt-5 text-[#4F5665] text-sm leading-loose font-medium">
          Lorem ispum is a placeholder text commonly used as a free text.
        </p>
        {/* ENLACES SOCIALES */}
        <div className="flex mt-5 gap-5 items-center">
          <Link
            href=""
            target="_blank"
            className="flex items-center bg-[#FF5E3A] p-2 rounded-full text-white text-3xl"
          >
            <IoLogoFacebook className="text-lg" />
          </Link>
          <Link
            href=""
            target="_blank"
            className="flex items-center bg-[#FF5E3A] p-2 rounded-full text-white text-3xl"
          >
            <IoLogoInstagram className="text-lg" />
          </Link>
          <Link
            href=""
            target="_blank"
            className="flex items-center bg-[#FF5E3A] p-2 rounded-full text-white text-3xl"
          >
            <IoLogoWhatsapp className="text-lg" />
          </Link>
        </div>
        {/* DERECHOS DE PÁGINA */}
        <p className="mt-6 text-xs text-[#FF5E3A]">
          &copy; Copyrights {new Date().getFullYear()} | by Azazek
        </p>
        <p className="mt-3 text-xs text-[#FF5E3A]">@makys</p>
      </div>
      <div className="w-[100%]">
        <h2 className="font-bold">Producto</h2> <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
        <br />
        <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
        <br />
        <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
        <br />
        <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
      </div>
      <div className="w-[100%]">
        <h2 className="font-bold">Categoria</h2> <br />
        <Link href="" className="text-sm">
          Precio
        </Link>{" "}
        <br /> <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
        <br /> <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
        <br /> <br />
        <Link href="" className="text-sm">
          Precio
        </Link>
      </div>
      <div className="w-[100%]">
        <h2 className="font-bold">Cuenta</h2> <br />
        <Link href="" className="text-sm">
          Mi cuenta
        </Link>{" "}
        <br />
        <br />
        <Link href="" className="text-sm">
          Historial
        </Link>
        <br />
        <br />
        <Link href="" className="text-sm">
          Historial
        </Link>
        <br />
        <br />
        <Link href="" className="text-sm">
          Historial
        </Link>
      </div>
      <div className="w-[100%]">
        <h2 className="font-bold mb-5">Cont&aacute;ctanos</h2>
        <div className="ml-2 flex items-center gap-2">
          <div className="flex items-center bg-[#FF5E3A] rounded-full p-1">
            <IoLocation className="text-white text-xs" />
          </div>
          <span className="text-xs">123 Street Trafford, London, UK</span>
        </div>
        <div className="ml-2 mt-5 flex items-center gap-2">
          <div className="flex items-center bg-[#FF5E3A] rounded-full p-1">
            <IoMail className="text-white text-xs" />
          </div>
          <span className="text-xs">info@sitename.com</span>
        </div>
        <div className="ml-2 mt-5 flex items-center gap-2">
          <div className="flex items-center bg-[#FF5E3A] rounded-full p-1">
            <IoCall className="text-white text-xs" />
          </div>
          <span className="text-xs">+456 789 789 001</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
