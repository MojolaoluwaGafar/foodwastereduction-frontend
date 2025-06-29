import { useState } from "react";
import showCustomToast from "../utils/showCustomToast";
import Navbar from "../components/NavBar";
import uploadToCloudinary from "../utils/uploadToCloudinary";
import { useNavigate } from "react-router-dom";

export default function ShareFood() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      showCustomToast("Please select an image", "error");
      return;
    }

    try {
      showCustomToast("Uploading image...", "success");
      const imageUrl = await uploadToCloudinary(form.image);

      const res = await fetch("http://localhost:5050/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          location: form.location,
          image: imageUrl,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to share food");
      }

      showCustomToast("Food shared successfully!", "success");

      // ✅ Clear form
      setForm({
        title: "",
        description: "",
        location: "",
        image: null,
      });
      setPreview(null);

      // ✅ Redirect to My Donations page
      navigate("/donations");
    } catch (err) {
      console.error(err);
      showCustomToast(err.message || "Something went wrong", "error");
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Share Food</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-6 shadow-md rounded-lg"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Food Title"
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-3 rounded"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded mt-2"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
          >
            Share Food
          </button>
        </form>
      </div>
    </div>
  );
}
