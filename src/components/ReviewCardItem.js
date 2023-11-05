import React from "react";

const ReviewCardItem = ({ item }) => {
  return (
    <>
      {item.map(({ id, image, color, name, description, date }) => (
        <div key={id} className={`w-[100%] flex-row ${color} rounded-xl`}>
          <div className="flex justify-center items-center p-3">
            <img className="w-[100px] sm:w-[150px]" src={`/${image}`} alt="" />
          </div>
          <div className="flex-row bg-white py-3 px-5 text-center">
            <p className="text-[10px] text-[#FF5E3A] font-bold sm:text-sm">
              {name}
            </p>
            <p className="mt-3 text-black text-[10px] sm:text-sm font-bold">
              {description}
            </p>
            <p className="mt-3 text-[#909090] text-[10px] sm:text-sm font-medium">
              {date}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewCardItem;
