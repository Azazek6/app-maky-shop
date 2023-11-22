import { useState } from "react";
import InputFileComponent from "../InputFileComponent";
import InputComponent from "../InputComponent";
import TextComponent from "../TextComponent";
import SelectedComponent from "../SelectedComponent";
import CheckComponent from "../CheckComponent";

const ProductForm = () => {
  //Estados
  const [isCheckedS, setIsCheckedS] = useState(false);
  const [isCheckedM, setIsCheckedM] = useState(false);
  const [isCheckedL, setIsCheckedL] = useState(false);
  const [isCheckedXL, setIsCheckedXL] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleCheckboxSizeS = () => {
    setIsCheckedS(!isCheckedS);
  };

  const toggleCheckboxSizeM = () => {
    setIsCheckedM(!isCheckedM);
  };

  const toggleCheckboxSizeL = () => {
    setIsCheckedL(!isCheckedL);
  };

  const toggleCheckboxSizeXL = () => {
    setIsCheckedXL(!isCheckedXL);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="w-[100%] flex-row">
      <form encType="multipart/formdata">
        <div className="w-[100%] flex-row gap-5 items-center sm:flex">
          <InputComponent
            name="name"
            // value="{brandForm.name}"
            // onChange={handleChange}
            type="text"
            placeholder="Codigo"
            classStyle="mb-4 sm:mb-0"
          />
          <InputComponent
            name="name"
            // value="{brandForm.name}"
            // onChange={handleChange}
            type="text"
            placeholder="Nombre"
            classStyle="mb-4 sm:mb-0"
          />
          <InputComponent
            name="name"
            // value="{brandForm.name}"
            // onChange={handleChange}
            type="number"
            placeholder="Precio"
          />
        </div>
        <div className="w-[100%] flex-row gap-5 items-center sm:flex mt-5">
          <SelectedComponent title="Marca" classStyle="mb-4 sm:mb-0 sm:w-[50%]" />
          <SelectedComponent title="Categoria" classStyle="sm:w-[50%]"/>
        </div>
        <h2 className="mt-5 text-sm sm:text-lg text-[#ff7f51] font-semibold">
          TALLAS:
        </h2>
        <div className="flex items-center justify-center">
          <CheckComponent
            title="S"
            toogle={toggleCheckboxSizeS}
            activate={isCheckedS}
          />
          <CheckComponent
            title="M"
            toogle={toggleCheckboxSizeM}
            activate={isCheckedM}
          />
          <CheckComponent
            title="L"
            toogle={toggleCheckboxSizeL}
            activate={isCheckedL}
          />
          <CheckComponent
            title="XL"
            toogle={toggleCheckboxSizeXL}
            activate={isCheckedXL}
          />
        </div>
        <div className="mt-8 relative flex-row lg:flex items-center">
          <InputFileComponent
            file={selectedFile}
            handleChange={handleFileChange}
          />
        </div>
        <div className="mt-5">
          <TextComponent />
        </div>
        <div className="w-[100%] sm:text-right mt-5">
          <button className="bg-[#ff5151] text-xs sm:text-base text-white font-bold p-2 w-[100%] rounded-md hover:opacity-70 transition-all duration-300 ease-in-out">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
