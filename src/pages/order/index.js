import { useEffect } from "react";
import Layout from "@/components/Layout";
import OrderTable from "@/components/Table/OrderTable";
import { useGlobal } from "@/context/GlobalProvider";

const title = [
  {
    id: "fecha_registro",
    name: "Fecha de Orden",
  },
  {
    id: "tipo_envio",
    name: "Metodo de Envio",
  },
  {
    id: "medio_pago",
    name: "Metodo de Pago",
  },
  {
    id: "tipo_compra",
    name: "Comprobante",
  },
  {
    id: "monto_total",
    name: "Monto a Pagar",
  },
  {
    id: "estado",
    name: "Estado",
  },
];

const Home = () => {
  const { fetchOrdersForClient, order } = useGlobal();

  useEffect(() => {
    fetchOrdersForClient();
  }, []);

  return (
    <Layout>
      <h2 className="text-center mt-3 mb-10 font-bold text-3xl">Historial de Pedidos</h2>
      {/* TABLA DE DATOS */}
      <div className="px-14 w-[100%] mt-8">
        <OrderTable title={title} data={order} />
      </div>
    </Layout>
  );
};

export default Home;
