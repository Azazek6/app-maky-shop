import { useState } from "react";
import InputComponent from "./InputComponent";

const InputAutoComplete = ({ dataProduct, options }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Filtra las opciones basándose en la entrada del usuario
    const filtered = options.filter(
      (itemFilter) =>
        itemFilter.codigo.toLowerCase().includes(inputValue.toLowerCase()) ||
        itemFilter.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (inputValue != "") {
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (selectedOption) => {
    setInputValue(selectedOption.nombre);
    dataProduct({
      code: selectedOption.codigo,
      id_product: selectedOption.id,
      product: selectedOption.nombre,
      price: selectedOption.precio,
      igv: 18,
      stock_product: selectedOption.cantidad,
      stock: "",
      total: "",
      discount: "",
    });
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <InputComponent
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Buscar..."
        classStyle="mt-5"
      />

      {filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option.codigo} - {option.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputAutoComplete;
