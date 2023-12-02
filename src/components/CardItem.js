import React from "react";
import Link from "next/link";
import { HiMiniStar } from "react-icons/hi2";
import { host_product_image } from "@/configuration/utils";

const CardItem = ({ item }) => {
  return (
    <>
      {item.map(({ id, imagen, nombre, precio, stars }) => (
        <div
          key={id}
          className="w-[100%] flex-row bg-gradient-to-t from-red-200 to-amber-100 rounded-xl"
        >
          <div className="flex justify-center items-center p-3">
            <img
              className="w-[100px] sm:w-[150px]"
              src={
                imagen != ""
                  ? `${host_product_image}/${imagen}`
                  : "/card-item.png"
              }
              alt=""
            />
          </div>
          <div className="flex-row bg-white py-3 px-5">
            <Link
              href={`/product/${id}`}
              className="text-[10px] font-bold sm:text-xs sm:font-normal hover:text-[#FF5E3A]"
            >
              {nombre}
            </Link>
            <div className="w-[100%] flex items-center justify-between mt-5">
              <button className="bg-[#FF5E3A] hover:opacity-70 text-xs sm:text-sm text-white py-1 px-5 font-bold rounded-xl">
                $ {precio}
              </button>
              <div className="flex items-center gap-2">
                {/* {stars.map((item) => (
                  <HiMiniStar
                    className={`text-[11px] sm:text-[14px] ${
                      item == 1
                        ? "text-[#FF5E3A] hover:text-gray-400"
                        : "text-gray-400 hover:text-[#FF5E3A]"
                    }  cursor-pointer`}
                  />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardItem;
