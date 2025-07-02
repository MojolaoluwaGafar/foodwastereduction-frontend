import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import showCustomToast from "../utils/showCustomToast";
import Navbar from "../components/NavBar";

export default function EditDonation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    expiryDate: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchDonation = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/food/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch donation");

      const data = await res.json();
      setForm(data);
    } catch (error) {
      showCustomToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5050/api/food/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      showCustomToast("Donation updated successfully", "success");
      navigate("/donations");
    } catch (error) {
      showCustomToast(error.message, "error");
    }
  };

  useEffect(() => {
    fetchDonation();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Edit Donation
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              placeholder="Description"
              rows="4"
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              placeholder="Location"
            />
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate?.split("T")[0] || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              placeholder="Expiry Date"
            />
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              placeholder="Quantity"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Donation"
                className="w-full max-h-64 object-cover rounded"
              />
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
            >
              Update Donation
            </button>
          </form>
        )}
      </div>
    </>
  );
}
