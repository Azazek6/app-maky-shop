import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CardItem from "@/components/CardItem";
import ReviewCardItem from "@/components/ReviewCardItem";
import reviews from "@/sample/reviews.json";
import { useGlobal } from "@/context/GlobalProvider";

const Home = () => {
  const { category, brand, product, fetchCategory, fetchBrand, fetchProduct } =
    useGlobal();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [productForCategory, setProductForCategory] = useState([]);
  const [productForBrand, setProductForBrand] = useState([]);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id === selectedCategoryId ? null : id);
  };

  const handleBrandClick = (id) => {
    setSelectedBrandId(id === selectedBrandId ? null : id);
  };

  useEffect(() => {
    fetchCategory();
    fetchBrand();
    fetchProduct();
  }, []);

  useEffect(() => {
    if (selectedCategoryId != null) {
      setProductForCategory(
        product.filter(
          (itemFilter) =>
            itemFilter.categoria.id_categoria == selectedCategoryId
        )
      );
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedBrandId != null) {
      setProductForBrand(
        product.filter(
          (itemFilter) => itemFilter.marca.id_marca == selectedBrandId
        )
      );
    }
  }, [selectedBrandId]);

  return (
    <Layout>
      {/* BANNER */}
      <div className="w-[100%] flex items-center rounded-xl bg-gradient-to-r from-violet-200 to-pink-200 px-10 py-5">
        <div className="w-[100%] ml-10">
          <p className="text-xs pb-2">Limited Time Only For Winter</p>
          <h1 className="text-7xl pb-2">fashion</h1>
          <h2 className="text-lg pb-2">LOOK YOUR BEST ON YOUR BEST DAY</h2>
          <div className="mt-10">
            <button className="text-xs text-white font-bold px-10 py-3 rounded-xl bg-gradient-to-t from-[#ff664a] to-rose-400 cursor-pointer">
              Explore Now!
            </button>
          </div>
        </div>
        <div className="w-[40%]">
          <img className="w-[500px]" src="/logo.jpg" alt="" />
        </div>
      </div>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">CATEGORIAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Nuestras Categorias</h2>
      </div>
      {/* Menu de opciones por categoria */}
      <div className="w-[100%] mt-8 flex justify-center items-center gap-3">
        {category &&
          category.slice(0, 4).map((itemCategory) => (
            <button
              key={itemCategory.id}
              onClick={() => handleCategoryClick(itemCategory.id)}
              className={`text-[9px] sm:text-xs font-bold px-2 py-3 sm:px-4 sm:py-5 rounded-xl bg-gradient-to-t  cursor-pointer transition-all duration-500 ease-in-out ${
                itemCategory.id === selectedCategoryId
                  ? "from-rose-400 to-[#ff664a] text-white"
                  : "hover:from-rose-400 hover:to-[#ff664a] hover:text-white"
              } hover:bg-white`}
            >
              {itemCategory.nombre}
            </button>
          ))}
      </div>
      {/* SECCION */}
      <section className="m-auto w-[100%] sm:w-[72%] p-8 mt-8">
        {productForCategory.length != 0 ? (
          <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardItem
              item={productForCategory
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)}
            />
          </div>
        ) : selectedCategoryId == null ? (
          <div className="w-[100%] flex justify-center">
            <p className="text-[#4F5665] font-bold text-lg">
              Escoga una categoria para vizualizar los productos
            </p>
          </div>
        ) : (
          <div className="w-[100%] flex justify-center">
            <p className="text-[#4F5665] font-bold text-lg">
              No hay productos disponibles
            </p>
          </div>
        )}
      </section>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">MARCAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">NUESTRAS MARCAS</h2>
      </div>
      {/* Menu de opciones por marca */}
      <div className="w-[100%] mt-8 flex justify-center items-center gap-3">
        {brand &&
          brand.slice(0, 4).map((itemBrand) => (
            <button
              key={itemBrand.id}
              onClick={() => handleBrandClick(itemBrand.id)}
              className={`text-[9px] sm:text-xs font-bold px-2 py-3 sm:px-4 sm:py-5 rounded-xl bg-gradient-to-t  cursor-pointer transition-all duration-500 ease-in-out ${
                itemBrand.id === selectedBrandId
                  ? "from-rose-400 to-[#ff664a] text-white"
                  : "hover:from-rose-400 hover:to-[#ff664a] hover:text-white"
              } hover:bg-white`}
            >
              {itemBrand.nombre}
            </button>
          ))}
      </div>
      {/* SECCION */}
      <section className="m-auto w-[100%] sm:w-[72%] p-8 mt-8">
        {productForBrand.length != 0 ? (
          <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardItem
              item={productForBrand.sort(() => Math.random() - 0.5).slice(0, 6)}
            />
          </div>
        ) : selectedBrandId == null ? (
          <div className="w-[100%] flex justify-center">
            <p className="text-[#4F5665] font-bold text-lg">
              Escoga una marca para vizualizar los productos
            </p>
          </div>
        ) : (
          <div className="w-[100%] flex justify-center">
            <p className="text-[#4F5665] font-bold text-lg">
              No hay productos disponibles
            </p>
          </div>
        )}
      </section>
      {/* Titulo seccion */}
      <div className="w-full text-center mt-8">
        <h3 className="font-medium text-xs">RESEÑAS</h3>
        <center>
          <img src="/Exclude.png" className="w-[65px]" alt="separador" />
        </center>
        <h2 className="mt-2 font-bold">Opinion de los compradores</h2>
      </div>
      {/* SECCION */}
      <section className="m-auto w-[100%] sm:w-[72%] p-8 mt-1">
        <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ReviewCardItem item={reviews} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
