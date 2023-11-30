import React from "react";

const SelectedComponent = ({
  data,
  title,
  name,
  value,
  handleChange,
  status = false,
  classStyle,
}) => {
  return (
    <select
      name={name}
      id={name}
      disabled={status}
      value={value}
      onChange={handleChange}
      className={`${classStyle} w-[100%] border border-[#606879] focus:ring-2 focus:ring-[#ff7f51] focus:border-[#ff7f51]  px-4 py-3 outline-none rounded-xl text-sm text-[#474d59] transition-all duration-300 ease-in-out`}
    >
      <option value="" disabled selected>
        {title}
      </option>
      {data &&
        data.map((itemData) => (
          <option key={itemData.id} value={itemData.id}>
            {itemData.nombre}
          </option>
        ))}
    </select>
  );
};

export default SelectedComponent;
