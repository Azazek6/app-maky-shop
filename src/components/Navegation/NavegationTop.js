import React from "react";
import Link from "next/link";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
  HiOutlineBell,
} from "react-icons/hi2";

const NavegationTop = () => {
  return (
    <nav className="flex justify-between items-center gap-3 w-[100%] p-6">
      <div className="w-[22%] ml-10">
        <Link
          href="/"
          className="flex items-center gap-4 w-10 font-bold text-[#FF5151]"
        >
          <img className="w-14 rounded-full" src="/logo.jpg" alt="" />
          MAKYS
        </Link>
      </div>
      <div className="w-[100%] flex justify-center items-center gap-5">
        <Link href="/" className="hover:text-[#FF5151] hover:font-bold">
          Home
        </Link>
        <Link href="/about" className="hover:text-[#FF5151] hover:font-bold">
          Acerca De
        </Link>
      </div>
      <div className="w-[30%] flex justify-center items-center gap-5 ">
        <Link href="" className="hover:text-[#FF5151] hover:font-bold text-2xl">
          <HiOutlineMagnifyingGlass />
        </Link>
        <Link href="" className="hover:text-[#FF5151] hover:font-bold text-2xl">
          <HiOutlineUser />
        </Link>
        <Link href="" className="hover:text-[#FF5151] hover:font-bold text-2xl">
          <HiOutlineBell />
        </Link>
      </div>
    </nav>
  );
};

export default NavegationTop;
