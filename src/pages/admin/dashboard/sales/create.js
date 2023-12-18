import React from 'react'
import SalesForm from "@/components/Admin/Form/SalesForm";
import Layout from "@/components/Admin/Layout";

const Create = () => {
  return (
    <Layout>
      <h2 className="mt-5 mb-5 sm:mb-8 text-lg sm:text-2xl text-[#ff7f51] font-bold">
        DETALLE DE VENTA
      </h2>
      <SalesForm/>
    </Layout>
  )
}

export default Create