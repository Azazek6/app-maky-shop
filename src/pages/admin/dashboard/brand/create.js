import React from "react";
import Layout from "@/components/Admin/Layout";
import BrandForm from "@/components/Admin/Form/BrandForm";

const Create = () => {
  return (
    <Layout>
      <h2 className="mt-5 mb-5 sm:mb-10 text-lg sm:text-2xl text-[#ff7f51] font-bold">
        DETALLE DE LA MARCA
      </h2>
      <BrandForm />
    </Layout>
  );
};

export default Create;
