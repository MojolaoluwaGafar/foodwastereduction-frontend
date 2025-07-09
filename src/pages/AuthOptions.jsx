import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import wasteLessicon from "../assets/wasteless icon.png";
import CustomPageLoader from "../components/common/loaders/PageLoader";
import ButtonLoader from "../components/common/loaders/ButtonLoader";

export default function AuthOptions() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(null); // null, 'signup', or 'signin'

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (path) => {
    setIsNavigating(path);
    setTimeout(() => navigate(`/${path}`), 800);
  };

  if (pageLoading) return <CustomPageLoader text="Getting things ready..." />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 text-center"
    >
      <img
        src={wasteLessicon}
        alt="WasteLess Logo"
        className="w-28 h-28 mb-6 drop-shadow-md"
      />
      <h1 className="text-4xl font-bold text-green-800 mb-2">WasteLess</h1>
      {/* <p className="text-lg max-w-md">
        Let’s get started with your food-saving journey! 
      </p> */}
      <p className="mb-10 text-lg max-w-md">
        Create an account or sign in to continue your food-saving journey.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => handleNavigate("signup")}
          aria-busy={isNavigating === "signup"}
          disabled={isNavigating !== null}
          className="bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all text-lg font-semibold flex items-center justify-center disabled:opacity-80"
        >
          {isNavigating === "signup" ? (
            <span className="flex items-center gap-2">
              {/* <ButtonLoader size={20} color="white" />  */}
              Creating...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        <button
          onClick={() => handleNavigate("signin")}
          aria-busy={isNavigating === "signin"}
          disabled={isNavigating !== null}
          className="border border-green-600 text-green-700 py-3 rounded-lg hover:bg-green-100 transition-all text-lg font-semibold flex items-center justify-center disabled:opacity-80"
        >
          {isNavigating === "signin" ? (
            <span className="flex items-center gap-2">
              {/* <ButtonLoader size={20} color="green" /> */}
              Redirecting...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </motion.div>
  );
}
