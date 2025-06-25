import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast";

const showToast = (message, type = "info") => {
  toast.custom((t) => (
    <CustomToast t={t} toast={toast} message={message} type={type} />
  ));
};

export default showToast;
