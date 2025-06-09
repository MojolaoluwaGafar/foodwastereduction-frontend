import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WasteLessIcon from "../assets/wasteless icon.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    setTimeout(() => {
      console.log("Forgot password request sent for:", email);
      setMessage("Password reset instructions have been sent to your email.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-green-50">
      <img
        src={WasteLessIcon}
        alt="WasteLess Logo"
        className="w-24 h-24 mb-3 animate-fade-in"
      />
      <h2 className="text-2xl text-green-800 font-bold mb-2 text-center">
        Forgot your password?
      </h2>
      <p className="text-center text-green-700 mb-5 text-base">
        Enter your email address to receive password reset instructions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md w-full bg-white p-6 rounded-xl shadow-md"
      >
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
            setMessage("");
          }}
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg disabled:opacity-70"
        />

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
        {message && (
          <p className="text-green-700 text-sm font-medium">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white text-lg py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Send Reset Instructions"
          )}
        </button>

        <p className="text-center text-green-700 text-md font-medium mt-4">
          Remember your password?{" "}
          <span
            className="underline cursor-pointer hover:text-green-800"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
