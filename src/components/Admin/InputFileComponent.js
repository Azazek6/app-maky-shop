import React from "react";

const InputFileComponent = ({ handleChange, file }) => {
  return (
    <>
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-gradient-to-r from-red-500 to-amber-500 font-bold text-white py-2 px-4 rounded-md hover:opacity-70 transition-all duration-300 ease-in-out shadow-md inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Seleccionar Imagen del Producto</span>
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleChange}
      />
      {file && (
        <span className="ml-2 bg-gray-800 text-white py-1 px-2 rounded-md">
          {file.name}
        </span>
      )}
    </>
  );
};

export default InputFileComponent;
