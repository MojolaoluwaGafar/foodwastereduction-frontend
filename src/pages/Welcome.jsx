import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/wasteless icon.png";
import CustomLoader from "../components/common/loaders/PageLoader"; // ✅ Correct import path
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CustomLoader text="Preparing WasteLess..." />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 text-center"
    >
      <img src={logo} alt="WasteLess logo" className="w-28 h-28 mb-3" />

      <h1 className="text-4xl font-bold text-green-800 mb-2">WasteLess</h1>
      <p className="text-lg text-green-700 mb-10 tracking-wide">
        Track. Share. Save.
      </p>

      <button
        onClick={() => navigate("/auth")}
        className="bg-green-600 font-semibold text-white px-8 py-3 rounded-md shadow-lg hover:bg-green-700 transition duration-300"
      >
        Get Started
      </button>
    </motion.div>
  );
}
