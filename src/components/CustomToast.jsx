import { X } from "lucide-react";
import clsx from "clsx";

const CustomToast = ({ message, t, toast }) => {
  return (
    <div
      className={clsx(
        "bg-white text-black p-4 shadow-md rounded-lg flex items-start justify-between gap-4 w-full max-w-sm",
        toast.visible ? "animate-enter" : "animate-leave"
      )}
    >
      <div className="text-sm font-medium">{message}</div>
      <button onClick={() => toast.dismiss(t.id)}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CustomToast;
