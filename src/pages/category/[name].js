import React from 'react'
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const CategoryFind = () => {
  const router = useRouter()
  return (
    <Layout>Categoria: {router.query.name} </Layout>
  )
}

export default CategoryFind