import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Admin/Layout";
import TableGeneral from "@/components/Admin/Table/TableGeneral";
import { useGlobal } from "@/context/GlobalProvider";
import { truncateText } from "@/helpers/general";

const Home = () => {
  const { order, fetchOrders } = useGlobal();
  const router = useRouter();

  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    order.map((itemOrder) => {
      setOrderDetail(itemOrder.orden_detalles);
    });
  }, [order]);
  return (
    <Layout>
      <div className="w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-center">
        {orderDetail.map((itemOrder) => (
          <div
            key={itemOrder.id_orden_detalle}
            className={`w-[100%] flex-row bg-[#FF5E3A] rounded-xl`}
          >
            <div className="flex justify-center items-center p-3">
              <img
                className="w-[120px] sm:w-[200px]"
                src={`/order-image.png`}
                alt=""
              />
            </div>
            <div className="flex-row bg-white py-3 px-5 text-center">
              <p className="text-[10px] text-[#FF5E3A] font-bold sm:text-sm">
                {truncateText(itemOrder.producto.nombre, 30)}
              </p>
              <p className="mt-3 text-black text-[10px] sm:text-sm font-bold">
                {truncateText(itemOrder.producto.descripcion, 20)}
              </p>
              <p className="mt-3 text-[#ff2626] text-[10px] sm:text-sm font-medium">
                {itemOrder.cantidad}
              </p>
              <p
                onClick={() =>
                  router.push(
                    `/admin/dashboard/order/detail/${itemOrder.id_orden_detalle}`
                  )
                }
                className="mt-3 text-[#0f6f32] text-[9px] sm:text-sm font-bold cursor-pointer hover:underline"
              >
                Procesar
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
