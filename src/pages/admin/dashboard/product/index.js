import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HiMagnifyingGlass, HiMiniPlusCircle } from "react-icons/hi2";
import Layout from "@/components/Admin/Layout";
import CardProduct from "@/components/Admin/Card/CardProduct";
import SelectedComponent from "@/components/Admin/SelectedComponent";
import { useGlobal } from "@/context/GlobalProvider";

const listSizes = [
  { id: "S", nombre: "S" },
  { id: "M", nombre: "M" },
  { id: "L", nombre: "L" },
  { id: "XL", nombre: "XL" },
];

const Product = () => {
  const { product, brand, category, fetchBrand, fetchCategory, fetchProduct } =
    useGlobal();

  const router = useRouter();
  const [disableSelect, setDisableSelect] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    brand: "",
    size: "",
    name: "",
  });

  const handleSearchSelect = () => {
    if (filter.category === "" && filter.brand === "" && filter.size === "") {
      setFilteredProduct(product);
      return;
    }

    let filteredResult = product;

    if (filter.category !== "") {
      filteredResult = filteredResult.filter(
        (itemFilter) => itemFilter.categoria.id_categoria == filter.category
      );
    }

    if (filter.brand !== "") {
      filteredResult = filteredResult.filter(
        (itemFilter) => itemFilter.marca.id_marca == filter.brand
      );
    }

    if (filter.size !== "") {
      filteredResult = filteredResult.filter((itemFilter) =>
        itemFilter.producto_tallas.some((talla) => talla.talla === filter.size)
      );
    }

    setFilteredProduct(filteredResult);
  };

  const handleChangeSelect = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    fetchBrand();
    fetchCategory();
    fetchProduct();
  }, []);

  useEffect(() => {
    setFilteredProduct(product);
  }, [product]);

  useEffect(() => {
    handleSearchSelect();
  }, [filter.category, filter.brand, filter.size]);

  useEffect(() => {
    if (filter.name == "") {
      setDisableSelect(false);
      return;
    }
    setDisableSelect(true);

    setFilteredProduct(
      product.filter((itemFilter) =>
        itemFilter.nombre.toUpperCase().includes(filter.name.toUpperCase())
      )
    );
  }, [filter.name]);

  return (
    <Layout>
      <h2 className="text-2xl text-[#ff7f51] font-bold">MIS PRODUCTOS</h2>
      <div className="w-[100%] flex justify-end mt-5 mb-3">
        <button
          onClick={() => {
            router.push("/admin/dashboard/product/create");
          }}
          className=" flex items-center gap-3 text-sm font-bold px-2 py-3 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:opacity-80"
        >
          <HiMiniPlusCircle className="font-bold text-2xl" />
          Nuevo Producto
        </button>{" "}
      </div>
      <div className="w-[100%] flex items-center justify-center mt-5 gap-10">
        <div className="w-[100%] ">
          <SelectedComponent
            data={category.filter((itemFilter) => itemFilter.estado == 1)}
            name="category"
            handleChange={handleChangeSelect}
            value={filter.category}
            status={disableSelect}
            title="Categoria"
          />
        </div>
        <div className="w-[100%]">
          <SelectedComponent
            data={brand.filter((itemFilter) => itemFilter.estado == 1)}
            name="brand"
            status={disableSelect}
            handleChange={handleChangeSelect}
            value={filter.brand}
            title="Marca"
          />
        </div>
      </div>
      <div className="w-[100%] flex items-center mt-5 gap-10">
        <div className=" w-[100%]">
          <SelectedComponent
            data={listSizes}
            name="size"
            handleChange={handleChangeSelect}
            value={filter.size}
            status={disableSelect}
            title="Tallas"
          />
        </div>
        <div className="relative w-[100%]">
          <div className="flex items-center justify-center">
            <input
              type="text"
              name="name"
              value={filter.name}
              onChange={handleChangeSelect}
              placeholder="Ingrese nombre a buscar"
              className="w-[100%] mt-[3px] text-sm outline-none border border-[#cfcecf] p-2 placeholder:text-[#979fa9] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-y-0 right-5 flex items-center pr-2 mt-1 text-[#979fa9]">
              <HiMagnifyingGlass className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE DATOS */}
      <div className="w-[100%] mt-8">
        <CardProduct data={filteredProduct} />
      </div>
    </Layout>
  );
};

export default Product;
