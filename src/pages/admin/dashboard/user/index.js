import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HiMagnifyingGlass, HiMiniPlusCircle } from "react-icons/hi2";
import Layout from "@/components/Admin/Layout";
import TableGeneral from "@/components/Admin/Table/TableGeneral";
import SelectedComponent from "@/components/Admin/SelectedComponent";
import { useGlobal } from "@/context/GlobalProvider";

const dataFilter = [
  { id: "1", nombre: "CLIENTES" },
  { id: "2", nombre: "USUARIOS DEL PANEL" },
];

const title = [
  {
    id: "documento",
    name: "DNI",
  },
  {
    id: "apellidos",
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
  const { user, fetchUser } = useGlobal();
  const router = useRouter();
  const [filteredUser, setFilteredUser] = useState([]);

  const handleChangleFilterData = ({ target: { name, value } }) => {
    setFilteredUser(user.filter((itemFilter) => itemFilter.id_rol == value));
  };

  useEffect(() => {
    fetchUser();
    setFilteredUser(user);
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl text-[#ff7f51] font-bold">LISTA DE USUARIOS</h2>
      <div className="w-[100%] p-3 mt-4">
        <SelectedComponent
          data={dataFilter}
          handleChange={handleChangleFilterData}
          title="----------- Filtro -----------"
        />
      </div>

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
        <TableGeneral title={title} data={filteredUser} section="user" />
      </div>
    </Layout>
  );
};

export default Home;
