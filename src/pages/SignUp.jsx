import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import wastelessicon from "../assets/wasteless icon.png";
import ButtonLoader from "../components/common/loaders/ButtonLoader";
import showCustomToast from "../utils/showCustomToast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUser } = useContext(AuthContext);
  const { login } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formErrors = validate();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1500));
  //     console.log("Sign up form submitted", form);
  //     navigate("/home");
  //   } catch (err) {
  //     console.error("Sign up failed", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5050/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.message?.includes("Email")) {
          setErrors({ email: result.message });
          showCustomToast(result.message, "error");
        }
        return;
      }

      console.log("User created:", result);
      showCustomToast("Account created successfully!", "success"); 
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      setUser(result.user);
      setToken(result.token);
      navigate("/home");
    } catch (err) {
      console.error("Sign up failed", err);
      showCustomToast("Something went wrong. Please try again.", "error"); 
    } finally {
      setLoading(false);
    }
  };
  const googleSignup = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Token Response:", tokenResponse);

        const res = await axios.post(
          "https://it-project-server.onrender.com/api/auth/google",
          {
            token: tokenResponse.access_token,
          }
        );
        console.log("Signup Success", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      } catch (err) {
        console.error("Signup failed", err.response?.data || err.message);
      }
    },
    onError: () => console.log("Google Signup Failed"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 bg-green-50"
    >
      <img
        src={wastelessicon}
        alt="WasteLess icon"
        className="w-24 h-24 mb-2"
      />
      <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
        Create your account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 w-full max-w-md bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full p-3 border-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full p-3 border-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full p-3 pr-12 border-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg flex items-center justify-center disabled:opacity-70"
        >
          {loading
            ? //  <ButtonLoader />
              "signing up..."
            : "Sign Up"}
        </button>
        <p className="text-center text-gray-700">or</p>
        <button
          onClick={() => googleSignup()}
          className="border-2 border-gray-300 rounded-md w-full  flex items-center justify-center py-3 text-lg font-semibold text-gray-700"
        >
          Sign up with Google <FcGoogle size={20} />
        </button>

        <p className="text-center text-base text-green-700 font-medium">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-green-900"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </motion.div>
  );
}
