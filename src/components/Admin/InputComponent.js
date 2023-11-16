import React from "react";

const InputComponent = ({ name, value, onChange, placeholder, type }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-[#606879] focus:ring-2 focus:ring-[#ff7f51] focus:border-[#ff7f51]  px-4 py-3 w-[100%] sm:w-[50%] outline-none rounded-xl text-sm text-[#474d59] placeholder:text-[#606879] transition-all duration-300 ease-in-out"
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
