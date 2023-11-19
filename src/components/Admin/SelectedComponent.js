import React from "react";

const SelectedComponent = ({ title, classStyle }) => {
  return (
    <select
      name=""
      id=""
      className={`${classStyle} w-[100%] border border-[#606879] focus:ring-2 focus:ring-[#ff7f51] focus:border-[#ff7f51]  px-4 py-3 sm:w-[50%] outline-none rounded-xl text-sm text-[#474d59] transition-all duration-300 ease-in-out`}
    >
      <option value="">{title}</option>
      <option value="">Marca1</option>
      <option value="">Marca2</option>
    </select>
  );
};

export default SelectedComponent;
