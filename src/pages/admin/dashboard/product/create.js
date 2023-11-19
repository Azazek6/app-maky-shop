import React from "react";
import Layout from "@/components/Admin/Layout";
import ProductForm from "@/components/Admin/Form/ProductForm";

const Create = () => {
  return (
    <Layout>
      <h2 className="mt-5 mb-5 sm:mb-10 text-lg sm:text-2xl text-[#ff7f51] font-bold">
        DETALLES DEL PRODUCTO
      </h2>
      <ProductForm />
    </Layout>
  );
};

export default Create;
