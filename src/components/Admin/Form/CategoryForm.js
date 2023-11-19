import { useState } from "react";
import InputComponent from "../InputComponent";

const CategoryForm = () => {
  //Estados
  const [isChecked, setIsChecked] = useState(true);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    status: true,
  });

  //Funciones generales
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = ({ target: { name, value } }) => {
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  return (
    <div className="flex-row">
      <form>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex">
          <InputComponent
            name="name"
            value={categoryForm.name}
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
          />
          <label
            className={` w-[100%] mt-8 sm:w-[20%] sm:mt-0 flex items-center justify-center sm:justify-normal space-x-2 cursor-pointer ${
              isChecked ? "text-[#ff7f51] font-bold" : "text-gray-700"
            }`}
            htmlFor="status"
            onClick={toggleCheckbox}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={isChecked}
              name="status"
              onChange={() => {}}
            />
            <div
              //onClick={toggleCheckbox}
              className="w-6 h-6 border-2 border-[#ff7f51] rounded-md flex items-center justify-center transition duration-300 ease-in-out group-hover:border-opacity-60"
            >
              {isChecked && (
                <svg
                  className="w-4 h-4 text-[#ff7f51]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <span>{isChecked ? "Activado" : "Desactivado"}</span>
          </label>
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

export default CategoryForm;
