// src/utils/showCustomToast.js
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";

const showCustomToast = (message, type = "success") => {
  toast(
    ({ closeToast }) => (
      <CustomToast message={message} closeToast={closeToast} type={type} />
    ),
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }
  );
};

export default showCustomToast;
