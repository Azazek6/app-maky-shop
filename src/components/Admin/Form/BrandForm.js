import { useState } from "react";
import InputComponent from "../InputComponent";
import CheckComponent from "../CheckComponent";

const BrandForm = () => {
  //Estados
  const [isChecked, setIsChecked] = useState(true);
  const [brandForm, setBrandForm] = useState({
    name: "",
    status: true,
  });

  //Funciones generales
  const handleChange = ({ target: { name, value } }) => {
    setBrandForm({ ...brandForm, [name]: value });
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex-row">
      <form>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex">
          <InputComponent
            name="name"
            value={brandForm.name}
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
          />
          <CheckComponent toogle={toggleCheckbox} activate={isChecked} />
        </div>
        <div className="w-[100%] sm:text-right mt-10">
          <button className="bg-[#ff5151] text-white font-bold p-2 w-[100%] sm:w-[30%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
