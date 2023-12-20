import { toast } from "sonner";
import {
  HiCheckCircle,
  HiMiniExclamationTriangle,
  HiMiniXCircle,
} from "react-icons/hi2";

export const toastMessage = (message, status) => {
  toast(message, {
    icon:
      status == 1 ? (
        <HiCheckCircle color="#15803d" size={18} />
      ) : status == 2 ? (
        <HiMiniExclamationTriangle color="#ffae05" size={18} />
      ) : (
        <HiMiniXCircle color="#ff2626" size={18} />
      ),
  });
};

// Calcular el sub Total del producto
export const calSubTotalProduct = (product) => {
  let total = product.reduce(
    (acc, currItem) => acc + parseFloat(currItem.monto_total),
    0
  );

  return parseFloat(total).toFixed(2);
};

// Calcular el descuento del producto
export const calDiscountProduct = (product) => {
  let total = product.reduce(
    (acc, currItem) => acc + parseFloat(currItem.discount),
    0
  );

  return parseFloat(total).toFixed(2);
};

export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
