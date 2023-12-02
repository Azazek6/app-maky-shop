import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CardItem from "@/components/CardItem";
import InputComponent from "@/components/Admin/InputComponent";
import Layout from "@/components/Layout";
import { useGlobal } from "@/context/GlobalProvider";

const CategoryFind = () => {
  const { product, fetchProduct } = useGlobal();
  const router = useRouter();

  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    fetchProduct();
    setFilteredProduct(
      product.filter(
        (itemFilter) => itemFilter.categoria.nombre == router.query.name
      )
    );
  }, [router.query.name]);
  return (
    <Layout>
      <h2 className="text-center mt-5 mb-10 font-bold text-2xl underline">
        Productos de Categoria: {router.query.name}{" "}
      </h2>
      <div className="flex-row sm:flex items-center gap-8">
        <div className="sm:w-[40%] mb-8 sm:mb-0">
          <InputComponent placeholder="Ingrese nombre de producto a buscar" />
        </div>
        <div className="sm:w-[60%] grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CardItem item={filteredProduct} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryFind;
