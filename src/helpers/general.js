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
