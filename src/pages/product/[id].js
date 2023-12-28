import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HiMiniHome, HiMiniStar } from "react-icons/hi2";
import Layout from "@/components/Layout";
import Accordeon from "@/components/Accordeon";
import BreadCrumbsData from "@/components/BreadCrumbsData";
import { useGlobal } from "@/context/GlobalProvider";

const Product = () => {
  const { addShoppingCar, fetchProductForId } = useGlobal();
  const router = useRouter();

  //Estados
  const [product, setProduct] = useState(null);

  // Estado para guardar el color seleccionado
  // const [selectedColor, setSelectedColor] = useState("");

  // Estado para guardar la talla seleccionada
  const [selectedSize, setSelectedSize] = useState("");

  // Estado para guardar la talla seleccionada
  const [selectedImagePreview, setSelectedImagePreview] =
    useState("user-reseña.png");

  // // Función para manejar la selección de color
  // const handleColorSelection = (color) => {
  //   setSelectedColor(color);
  // };

  // Función para manejar la selección de tallas
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  // Función para manejar la selección de tallas
  const handleImageSelection = (image) => {
    setSelectedImagePreview(image);
  };

  //Detalles navegacion
  const breadcrumbsData = [
    { url: "/", label: <HiMiniHome /> },
    { url: "/product", label: "Productos" },
    { url: `/product/${router.query?.id}`, label: product?.nombre },
  ];

  //Mas detalles
  const getMoreDetail = () => {
    return (
      <>
        <div className="w-[100%] flex-row sm:flex items-center gap-4 mt-3">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            Para:
          </h2>
          <p className="font-semibold text-xs sm:text-sm mt-3 sm:mt-0">
            {product?.etapa.nombre}
          </p>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center gap-4 mt-3">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            Genero:
          </h2>
          <p className="font-semibold text-xs sm:text-sm mt-3 sm:mt-0">
            {product?.genero.nombre}
          </p>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center gap-4 mt-3">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            CATEGORIA:
          </h2>
          <p className="font-semibold text-xs sm:text-sm mt-3 sm:mt-0">
            {product?.categoria.nombre}
          </p>
        </div>
        <div className="w-[100%] flex-row sm:flex items-center gap-4 mt-3">
          <h2 className="font-bold text-[#ff7751] text-sm sm:text-base">
            MARCA:
          </h2>
          <p className="font-semibold text-xs sm:text-sm mt-3 sm:mt-0">
            {product?.marca.nombre}
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    const loadProduct = async (id) => {
      try {
        const { data } = await fetchProductForId(id);
        setProduct(data);
      } catch (error) {
        setProduct(null);
      }
    };

    if (router.query?.id) {
      loadProduct(router.query.id);
    }
  }, [router.query.id]);

  return (
    <Layout title="| PRODUCTO">
      <div className="mb-5 flex items-center justify-center">
        <BreadCrumbsData items={breadcrumbsData} />
      </div>

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
          <h2 className="text-4xl font-bold">{product?.nombre}</h2>
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-base mt-4">
              Stock:{" "}
              <span
                className={`${
                  product?.cantidad >= 5 ? "text-green-900" : "text-red-900"
                } font-bold`}
              >
                {product?.cantidad}
              </span>
            </p>
            <p className="text-sm sm:text-xl mt-4">S/. {product?.precio}</p>
          </div>
          {/* <div className="flex items-center gap-2 mt-4">
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
          </div> */}
          <p className="mt-4 text-lg text-[#4F5665]">{product?.descripcion}</p>
          {/* SELECCION DE COLORES */}
          {/* <h3 className="mt-5 text-[#636c7d] text-sm font-bold">Color:</h3>
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
          </div> */}
          {/* SELECCION DE TALLAS */}
          <h3 className="mt-5 text-[#636c7d] text-sm font-bold">Talla:</h3>
          <div className="w-[100%] grid grid-cols-8 mt-3 ">
            {product?.producto_tallas.map((itemSize, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="size-button"
                  value={itemSize.talla}
                  className="hidden"
                  onChange={() => handleSizeSelection(itemSize.talla)}
                />
                <span
                  className={`w-[100px] text-center py-3 border rounded-md  cursor-pointer  font-bold sm:text-sm ${
                    selectedSize === itemSize.talla
                      ? "ring ring-offset-1 bg-gradient-to-t from-rose-400 to-[#ff664a] text-white"
                      : ""
                  }`}
                >
                  {itemSize.talla}
                </span>
              </label>
            ))}
          </div>
          {/* BOTON DE AGREGADO */}
          <div className="w-[100%] mt-8">
            <button
              onClick={() => {
                addShoppingCar({
                  id_producto: product.id_producto,
                  codigo: product.codigo,
                  nombre: product.nombre,
                  stock: product.cantidad,
                  marca: product.marca,
                  categoria: product.categoria,
                  descripcion: product.descripcion,
                  precio: product.precio,
                  imagen: product.imagen,
                  genero: product.genero,
                });
              }}
              className="w-[50%] bg-[#FF5E3A] hover:opacity-80 text-white py-3 px-6 font-bold rounded-xl"
            >
              Agregar a la bolsa
            </button>
          </div>

          {/* DETALLES */}
          <div className="mt-7">
            <Accordeon title="Detalle del Producto" content={getMoreDetail()} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
