import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageLoader({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 bg-gray-300 rounded"
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
}