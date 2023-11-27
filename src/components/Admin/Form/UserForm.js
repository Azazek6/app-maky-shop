import { useState } from "react";
import InputComponent from "../InputComponent";
import CheckComponent from "../CheckComponent";
import { toastMessage } from "@/helpers/general";
import { useGlobal } from "@/context/GlobalProvider";

const UserFrom = () => {
  const { singUp } = useGlobal();

  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    document: "",
    names: "",
    lastnames: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    id_rol: "2",
    status: "",
  });

  const clear = () => {
    setUserForm({
      document: "",
      names: "",
      lastnames: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      id_rol: "2",
      status: "",
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserForm({ ...userForm, [name]: value });
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      userForm.status = isChecked;
      userForm.username = userForm.document;
      const { status, data } = await singUp(userForm);

      if (status == 201) {
        setLoading(false);
        clear();
        toastMessage(data.message, 1);
      }
    } catch (error) {
      setLoading(false);
      toastMessage(error.response.data.message, 3);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mt-5 mb-5 sm:mb-10 text-lg sm:text-2xl text-[#ff7f51] font-bold">
        DETALLES GENERALES
      </h2>
      <div className="w-[100%] flex-row sm:flex items-center gap-8 px-5">
        <InputComponent
          name="document"
          value={userForm.document}
          onChange={handleChange}
          placeholder="DNI"
          type="number"
        />
        <InputComponent
          name="lastnames"
          value={userForm.lastnames}
          onChange={handleChange}
          placeholder="Apellidos"
          classStyle="mt-4 sm:mt-0"
        />
        <InputComponent
          name="names"
          value={userForm.names}
          onChange={handleChange}
          placeholder="Nombres"
          classStyle="mt-4 sm:mt-0"
        />
      </div>
      <div className="w-[100%] flex-row sm:flex items-center gap-8 sm:mt-6 px-5">
        <InputComponent
          name="email"
          value={userForm.email}
          onChange={handleChange}
          placeholder="Correo"
          type="email"
          classStyle="mt-4 sm:mt-0"
        />
        <InputComponent
          name="phone"
          value={userForm.phone}
          onChange={handleChange}
          placeholder="Telefono"
          type="number"
          classStyle="mt-4 sm:mt-0"
        />
        <CheckComponent
          toogle={toggleCheckbox}
          activate={isChecked}
          title="Activado"
          classStyle="mt-6 sm:mt-0"
        />
      </div>

      <h2 className="mt-7 mb-5 sm:mb-10 text-lg sm:text-2xl text-[#ff7f51] font-bold">
        CREDENCIALES
      </h2>
      <div className="w-[100%] flex-row sm:flex items-center gap-8 px-5">
        <InputComponent
          name="username"
          value={userForm.document}
          onChange={handleChange}
          readonly
          placeholder="Usuario"
        />
        <InputComponent
          name="password"
          value={userForm.password}
          onChange={handleChange}
          placeholder="Contraseña"
          classStyle="mt-4 sm:mt-0"
        />
      </div>
      <div className="w-[100%] sm:text-right mt-10">
        <button
          disabled={loading}
          className="bg-[#ff5151] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out"
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default UserFrom;
