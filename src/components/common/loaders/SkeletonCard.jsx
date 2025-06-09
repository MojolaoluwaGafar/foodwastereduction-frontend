import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      className="p-4 border rounded shadow space-y-4"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <div className="h-40 bg-gray-300 rounded" />
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </motion.div>
  );
}