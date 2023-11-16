import React from "react";
import Layout from "@/components/Admin/Layout";
import CategoryForm from "@/components/Admin/Form/CategoryForm";

const Create = () => {
  return (
    <Layout>
      <h2 className="mt-5 mb-10 text-2xl text-[#ff7f51] font-bold">
        DETALLES DE LA CATEGORIA
      </h2>
      <CategoryForm />
    </Layout>
  );
};

export default Create;
