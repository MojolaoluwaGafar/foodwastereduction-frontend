import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadToCloudinary from "../utils/uploadToCloudinary";
import showCustomToast from "../utils/showCustomToast";
import Navbar from "../components/NavBar";

export default function CreateDonation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    expiryDate: "",
    quantity: 1,
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm({ ...form, image: url });
      showCustomToast("Image uploaded successfully", "success");
    } catch (err) {
      showCustomToast(err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      return showCustomToast("Image is required", "error");
    }

    try {
      const res = await fetch("http://localhost:5050/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create donation");

      showCustomToast("Donation created successfully", "success");
      navigate("/donations");
    } catch (err) {
      showCustomToast(err.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Create Donation
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-6 shadow-md rounded-lg"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Description"
            rows="4"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Location"
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Quantity"
            min={1}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-3 rounded"
          />
          {uploading && (
            <p className="text-sm text-gray-500">Uploading image...</p>
          )}
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded"
            />
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Please wait..." : "Create Donation"}
          </button>
        </form>
      </div>
    </>
  );
}
