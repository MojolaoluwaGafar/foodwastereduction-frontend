import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
      />
    </div>
  );
}