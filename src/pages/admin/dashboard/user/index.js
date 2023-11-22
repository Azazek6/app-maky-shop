import React from "react";
import { useRouter } from "next/router";
import { HiMagnifyingGlass, HiMiniPlusCircle } from "react-icons/hi2";
import Layout from "@/components/Admin/Layout";
import TableGeneral from "@/components/Admin/Table/TableGeneral";

const userList = [
  {
    apellido: "SCR324G5",
    nombres: "SCR324G5",
    documento: "70991065",
    usuario: "70991065",
    email: "asad@gmail.com",
    telefono: "968703924",
    estado: "Activo",
  },
  {
    apellido: "SCR324G5",
    nombres: "SCR324G5",
    documento: "45124578",
    usuario: "45124578",
    email: "asad@gmail.com",
    telefono: "968703924",
    estado: "Activo",
  },
  {
    apellido: "SCR324G5",
    nombres: "SCR324G5",
    documento: "63236515",
    usuario: "63236515",
    email: "asad@gmail.com",
    telefono: "968703924",
    estado: "Activo",
  },
  {
    apellido: "SCR324G5",
    nombres: "SCR324G5",
    documento: "48756485",
    usuario: "48756485",
    email: "asad@gmail.com",
    telefono: "968703924",
    estado: "Activo",
  },
];

const title = [
  {
    id: "documento",
    name: "DNI",
  },
  {
    id: "apellido",
    name: "Apellidos",
  },
  {
    id: "nombres",
    name: "Nombres",
  },
  {
    id: "usuario",
    name: "Usuario",
  },
  {
    id: "email",
    name: "Correo",
  },
  {
    id: "telefono",
    name: "Telefono",
  },
  {
    id: "estado",
    name: "Estado",
  },
];

const Home = () => {
  const router = useRouter();
  return (
    <Layout>
      <h2 className="text-2xl text-[#ff7f51] font-bold">LISTA DE USUARIOS</h2>
      <div className="w-[100%] flex justify-end mt-5 mb-3">
        <button
          onClick={() => {
            router.push("/admin/dashboard/user/create");
          }}
          className=" flex items-center gap-3 text-sm font-bold px-2 py-3 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:opacity-80"
        >
          <HiMiniPlusCircle className="font-bold text-2xl" />
          Nuevo Usuario
        </button>{" "}
      </div>
      {/* TABLA DE DATOS */}
      <div className="w-[100%] mt-8">
        <TableGeneral title={title} data={userList} section="/brand/edit/1" />
      </div>
    </Layout>
  );
};

export default Home;
