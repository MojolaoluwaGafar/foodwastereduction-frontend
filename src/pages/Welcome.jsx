import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/wasteless icon.png";
import CustomLoader from "../components/common/loaders/PageLoader"; 
import showCustomToast from "../utils/showCustomToast";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const toggleReason = (id) => {
    if (selectedReasons.includes(id)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== id));
    } else {
      setSelectedReasons([...selectedReasons, id]);
    }
  };

  const handleGetStarted = () => {
    if (selectedReasons.length === 0) {
      return showCustomToast("Please select at least one reason", "error");
    }

    const chosen = reasons
      .filter((r) => selectedReasons.includes(r.id))
      .map((r) => r.label);

    localStorage.setItem("userPurpose", JSON.stringify(chosen));
    showCustomToast("Purpose saved. Let's go!", "success");
    navigate("/auth");
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CustomLoader text="Preparing WasteLess..." />;

  const reasons = [
    {
      id: 1,
      label: "Reduce food waste",
      description:
        "Track your food waste and learn how to reduce it effectively.",
    },
    {
      id: 2,
      label: "Share with others",
      description:
        "Share your food waste data with friends and family to raise awareness.",
    },
    {
      id: 3,
      label: "Save money",
      description:
        "Learn how reducing food waste can save you money in the long run.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 text-center"
    >
      {/* <img src={logo} alt="WasteLess logo" className="w-28 h-28 mb-3" />

      <h1 className="text-4xl font-bold text-green-800 mb-2">WasteLess</h1>
      <p className="text-lg text-green-700 mb-10 tracking-wide">
        Track. Share. Save.
      </p>

      <button
        onClick={() => navigate("/auth")}
        className="bg-green-600 font-semibold text-white px-8 py-3 rounded-md shadow-lg hover:bg-green-700 transition duration-300"
      >
        Get Started
      </button> */}

      {/* <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
          Welcome to FoodSave 🌍
        </h1> */}
      <img src={logo} alt="WasteLess logo" className="w-28 h-28 mb-3" />

      <h1 className="text-4xl font-bold text-green-800 mb-2">WasteLess</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        Why are you joining us today?
      </p>

      <div className="space-y-4 w-full max-w-md">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => toggleReason(reason.id)}
            className={`w-full py-3 text-lg font-semibold text-green-700 px-4 rounded-lg border-1 transition duration-200  ${
              selectedReasons.includes(reason.id)
                ? "bg-green-600 text-white border-green-700"
                : "bg-white text-gray-800  hover:border-green-500"
            }`}
          >
            {reason.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleGetStarted}
        className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
      >
        Get started
      </button>
    </motion.div>
  );
}
