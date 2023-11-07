import { useState } from "react";
import { useRouter } from "next/router";
import { HiMiniStar } from "react-icons/hi2";
import Layout from "@/components/Layout";
import Accordeon from "@/components/Accordeon";

const Product = () => {
  const router = useRouter();

  // Estado para guardar el color seleccionado
  const [selectedColor, setSelectedColor] = useState("");

  // Estado para guardar la talla seleccionada
  const [selectedSize, setSelectedSize] = useState("");

  // Estado para guardar la talla seleccionada
  const [selectedImagePreview, setSelectedImagePreview] =
    useState("user-reseña.png");

  // Función para manejar la selección de color
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  // Función para manejar la selección de tallas
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  // Función para manejar la selección de tallas
  const handleImageSelection = (image) => {
    setSelectedImagePreview(image);
  };

  return (
    <Layout title="| PRODUCTO">
      <div className="w-[100%] px-6 py-2 flex">
        <div className="w-[50%]">
          <div className="flex-row">
            <center>
              {selectedImagePreview != "" && (
                <img
                  className="w-[350px] h-[400px] mt-5 p-2 bg-[#FCCB90] bg-opacity-40 rounded-xl"
                  src={`/${selectedImagePreview}`}
                  alt=""
                />
              )}
            </center>
            <div className="flex items-center justify-center gap-5 mt-10">
              <div className="w-[15%]">
                <button
                  className="border p-2 rounded-xl hover:border-[#FF5E3A]"
                  onClick={() => {
                    handleImageSelection("user-reseña.png");
                  }}
                >
                  <img
                    className="w-[100px] h-[100px]"
                    src="/user-reseña.png"
                    alt=""
                  />
                </button>
              </div>
              <div className="w-[15%]">
                <button
                  className="border p-2 rounded-xl hover:border-[#FF5E3A]"
                  onClick={() => {
                    handleImageSelection("card-item.png");
                  }}
                >
                  <img
                    className="w-[100px] h-[100px]"
                    src="/card-item.png"
                    alt=""
                  />
                </button>
              </div>
              <div className="w-[15%]">
                <button
                  className="border p-2 rounded-xl hover:border-[#FF5E3A]"
                  onClick={() => {
                    handleImageSelection("user-reseña.png");
                  }}
                >
                  <img
                    className="w-[100px] h-[100px]"
                    src="/user-reseña.png"
                    alt=""
                  />
                </button>
              </div>
              <div className="w-[15%]">
                <button
                  className="border p-2 rounded-xl hover:border-[#FF5E3A]"
                  onClick={() => {
                    handleImageSelection("card-item.png");
                  }}
                >
                  <img
                    className="w-[100px] h-[100px]"
                    src="/card-item.png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <h2 className="text-4xl font-bold">Zip Tote Basket</h2>
          <p className="text-3xl mt-4">$140</p>
          <div className="flex items-center gap-2 mt-4">
            <HiMiniStar
              className={`text-[12px] sm:text-[16px] text-[#FF5E3A]`}
            />
            <HiMiniStar
              className={`text-[12px] sm:text-[16px] text-[#FF5E3A]`}
            />
            <HiMiniStar
              className={`text-[12px] sm:text-[16px] text-[#FF5E3A]`}
            />
            <HiMiniStar
              className={`text-[12px] sm:text-[16px] text-gray-400`}
            />
          </div>
          <p className="mt-4 text-lg text-[#4F5665]">
            The Zip Tote Basket is the perfect midpoint between shopping tote
            and comfy backpack. With convertible straps, you can hand carry,
            should sling, or backpack this convenient and spacious bag. The zip
            top and durable canvas construction keeps your goods protected for
            all-day use.
          </p>
          {/* SELECCION DE COLORES */}
          <h3 className="mt-5 text-[#636c7d] text-sm font-bold">Color:</h3>
          <div className="w-[100%] flex items-center gap-5 mt-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="color-button"
                value="red"
                className="hidden"
                onChange={() => handleColorSelection("red")}
              />
              <span
                className={`w-10 h-10 border rounded-full bg-red-500 cursor-pointer ${
                  selectedColor === "red" ? "ring ring-offset-1" : ""
                }`}
              ></span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="color-button"
                value="blue"
                className="hidden"
                onChange={() => handleColorSelection("blue")}
              />
              <span
                className={`w-10 h-10 border rounded-full bg-blue-500 cursor-pointer ${
                  selectedColor === "blue" ? "ring ring-offset-1" : ""
                }`}
              ></span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="color-button"
                value="green"
                className="hidden"
                onChange={() => handleColorSelection("green")}
              />
              <span
                className={`w-10 h-10 border rounded-full bg-green-500 cursor-pointer ${
                  selectedColor === "green" ? "ring ring-offset-1" : ""
                }`}
              ></span>
            </label>
          </div>
          {/* SELECCION DE TALLAS */}
          <h3 className="mt-5 text-[#636c7d] text-sm font-bold">Talla:</h3>
          <div className="w-[100%] grid grid-cols-8 mt-3 ">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="size-button"
                value="xxs"
                className="hidden"
                onChange={() => handleSizeSelection("xxs")}
              />
              <span
                className={`w-[100px] text-center py-3 border rounded-md  cursor-pointer  font-bold sm:text-sm ${
                  selectedSize === "xxs"
                    ? "ring ring-offset-1 bg-gradient-to-t from-rose-400 to-[#ff664a] text-white"
                    : ""
                }`}
              >
                XXS
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="size-button"
                value="xs"
                className="hidden"
                onChange={() => handleSizeSelection("xs")}
              />
              <span
                className={`w-[100px] text-center py-3 border rounded-md  cursor-pointer font-bold sm:text-sm ${
                  selectedSize === "xs"
                    ? "ring ring-offset-1 bg-gradient-to-t from-rose-400 to-[#ff664a] text-white"
                    : ""
                }`}
              >
                XS
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="size-button"
                value="s"
                className="hidden"
                onChange={() => handleSizeSelection("s")}
              />
              <span
                className={`w-[100px] text-center py-3 border rounded-md cursor-pointer font-bold sm:text-sm ${
                  selectedSize === "s"
                    ? "ring ring-offset-1 bg-gradient-to-t from-rose-400 to-[#ff664a] text-white"
                    : ""
                }`}
              >
                S
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="size-button"
                value="m"
                className="hidden"
                onChange={() => handleSizeSelection("m")}
              />
              <span
                className={`w-[100px] text-center py-3 border rounded-md cursor-pointer font-bold sm:text-sm ${
                  selectedSize === "m"
                    ? "ring ring-offset-1 bg-gradient-to-t from-rose-400 to-[#ff664a] text-white"
                    : ""
                }`}
              >
                M
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="size-button"
                value="l"
                className="hidden"
                onChange={() => handleSizeSelection("l")}
              />
              <span
                className={`w-[100px] text-center py-3 border rounded-md cursor-pointer font-bold sm:text-sm ${
                  selectedSize === "l"
                    ? "ring ring-offset-1 bg-gradient-to-t from-rose-400 to-[#ff664a] text-white"
                    : ""
                }`}
              >
                L
              </span>
            </label>
          </div>
          {/* BOTON DE AGREGADO */}
          <div className="w-[100%] mt-8">
            <button className="w-[50%] bg-[#FF5E3A] hover:opacity-80 text-white py-3 px-6 font-bold rounded-xl">
              Agregar a la bolsa
            </button>
          </div>

          {/* DETALLES */}
          <div className="mt-5">
            <Accordeon
              title="Detalle del Producto"
              content="The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming Charcoal Gray limited release."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
