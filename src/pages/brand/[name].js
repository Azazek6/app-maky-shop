import React from 'react'
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const BrandFind = () => {
  const router = useRouter()
  return (
    <Layout>Marca: {router.query.name} </Layout>
  )
}

export default BrandFind