import { useState } from "react";
import InputComponent from "../InputComponent";
import CheckComponent from "../CheckComponent";

const UserFrom = () => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form>
      <h2 className="mt-5 mb-5 sm:mb-10 text-lg sm:text-2xl text-[#ff7f51] font-bold">
        DETALLES GENERALES
      </h2>
      <div className="w-[100%] flex-row sm:flex items-center gap-8 px-5">
        <InputComponent placeholder="DNI" type="number" />
        <InputComponent placeholder="Apellidos" classStyle="mt-4 sm:mt-0"/>
        <InputComponent placeholder="Nombres" classStyle="mt-4 sm:mt-0"/>
      </div>
      <div className="w-[100%] flex-row sm:flex items-center gap-8 sm:mt-6 px-5">
        <InputComponent placeholder="Correo" type="email" classStyle="mt-4 sm:mt-0"/>
        <InputComponent placeholder="Telefono" type="number" classStyle="mt-4 sm:mt-0"/>
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
        <InputComponent placeholder="Usuario" />
        <InputComponent placeholder="Contraseña" classStyle="mt-4 sm:mt-0"/>
      </div>
      <div className="w-[100%] sm:text-right mt-10">
        <button className="bg-[#ff5151] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default UserFrom;
