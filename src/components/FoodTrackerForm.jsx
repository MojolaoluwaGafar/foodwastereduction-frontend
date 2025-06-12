import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function FoodTrackerForm({ token, onSuccess }) {
  const [formData, setFormData] = useState({
    item: "",
    weight: "",
    type: "saved", // or "donated"
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5050/api/track",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Food tracked:", res.data);
      setFormData({ item: "", weight: "", type: "saved" });
      // onSuccess?.();
      navigate("/history");
    } catch (err) {
      console.error(
        "❌ Error tracking food:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Track Food Item</h2>
      <input
        type="text"
        name="item"
        placeholder="Item Name"
        value={formData.item}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="saved">Saved</option>
        <option value="donated">Donated</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? "Tracking..." : "Track Item"}
      </button>
    </form>
  );
}
