import { X, CheckCircle, AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";
import clsx from "clsx";

const CustomToast = ({ closeToast, message, type = "success" }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={clsx(
        "flex items-start justify-between space-x-4 p-4 rounded-lg shadow-lg border max-w-sm w-full",
        {
          "bg-green-50 border-green-200 text-green-800": isSuccess,
          "bg-red-50 border-red-200 text-red-800": !isSuccess,
        }
      )}
    >
      <div className="flex items-start gap-2">
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
        ) : (
          <AlertTriangle className="w-5 h-5 mt-0.5 text-red-600" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={closeToast}
        className={clsx("hover:opacity-70", {
          "text-green-600": isSuccess,
          "text-red-600": !isSuccess,
        })}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

CustomToast.propTypes = {
  closeToast: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
};

export default CustomToast;
