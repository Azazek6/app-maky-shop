import { useEffect } from "react";
import { useRouter } from "next/router";
import { HiMiniPlusCircle } from "react-icons/hi2";
import Layout from "@/components/Admin/Layout";
import TableSales from "@/components/Admin/Table/TableSales";
import { useGlobal } from "@/context/GlobalProvider";

const title = [
  {
    id: "fecha_registro",
    name: "Fecha",
  },
  {
    id: "tipo_comprobante",
    name: "Comprobante",
  },
  {
    id: "tipo_pago",
    name: "Pago",
  },
  {
    id: "total",
    name: "Total",
  },
];

const Home = () => {
  const { fetchSale, sale } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    fetchSale();
  }, []);
  return (
    <Layout>
      <h2 className="text-2xl text-[#ff7f51] font-bold my-5">
        LISTADO DE VENTAS
      </h2>
      <div className="w-[100%] flex items-center justify-between my-5">
        <div className="w-[100%] flex justify-end">
          <button
            onClick={() => {
              router.push("/admin/dashboard/sales/create");
            }}
            className="mr-10 flex items-center gap-3 text-sm font-bold px-2 py-3 rounded-xl bg-gradient-to-t text-white cursor-pointer transition-all duration-500 ease-in-out from-rose-400 to-[#ff664a] hover:opacity-80"
          >
            <HiMiniPlusCircle className="font-bold text-2xl" />
            Nueva Venta
          </button>
        </div>
      </div>
      <TableSales title={title} data={sale} />
    </Layout>
  );
};

export default Home;
