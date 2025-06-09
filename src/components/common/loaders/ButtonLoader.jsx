import { motion } from "framer-motion";

export default function ButtonLoader({ isLoading, children }) {
  return (
    <span
      disabled={isLoading}
      className="relative flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg transition hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
        />
      )}
      <span className={isLoading ? "opacity-80" : ""}>{children}</span>
    </span>
  );
}
