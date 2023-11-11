import React from "react";
import Layout from "@/components/Admin/Layout";
import BrandForm from "@/components/Admin/Form/BrandForm";

const Create = () => {
  return (
    <Layout>
      <h2 className="mt-5 mb-10 text-2xl text-[#ff7f51] font-bold">
        DETALLES DE LA MARCA
      </h2>
      <BrandForm />
    </Layout>
  );
};

export default Create;
