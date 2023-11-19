import React from "react";

const TextComponent = () => {
  return (
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="Descripción del producto (OPCIONAL)"
      className="border border-[#606879] focus:ring-2 focus:ring-[#ff7f51] focus:border-[#ff7f51]  px-4 py-3 w-[100%] outline-none rounded-xl text-sm text-[#474d59] placeholder:text-[#606879] transition-all duration-300 ease-in-out resize-none"
    ></textarea>
  );
};

export default TextComponent;
