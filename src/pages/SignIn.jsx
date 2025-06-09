import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import WasteLessIcon from "../assets/wasteless icon.png";
import { Eye, EyeOff } from "lucide-react";
import ButtonLoader from "../components/common/loaders/ButtonLoader";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/home");
    } catch (error) {
      setServerError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-green-50">
      <img
        src={WasteLessIcon}
        alt="WasteLess Logo"
        className="w-28 h-28 mb-3"
      />
      <h1 className="text-2xl text-green-800 font-bold mb-2 text-center max-w-md">
        Sign in to your account to track, share, and save healthy food.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-md w-full bg-white p-6 rounded-xl shadow-md mt-4"
      >
        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            disabled={loading}
            className={`w-full p-3 border-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-600 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } disabled:opacity-70`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm font-medium mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            disabled={loading}
            className={`w-full p-3 border-2 rounded-lg text-lg font-medium pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } disabled:opacity-70`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3.5 right-3 text-gray-600"
            aria-label="Toggle password visibility"
            disabled={loading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm font-medium mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {serverError && (
          <p className="text-red-600 text-center font-semibold">
            {serverError}
          </p>
        )}

        <div className="flex justify-end">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-md text-green-700 font-medium underline cursor-pointer"
          >
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg flex items-center justify-center disabled:opacity-70"
        >
          {loading ? 
          // <ButtonLoader />
          "signing in..."
           : "Sign In"}
        </button>

        <p className="text-center text-md font-semibold text-green-700">
          Don’t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
