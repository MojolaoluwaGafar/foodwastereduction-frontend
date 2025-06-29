import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import showCustomToast from "../utils/showCustomToast";
import Navbar from "../components/NavBar";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/food/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error(error);
      showCustomToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this donation?")) return;

    try {
      const res = await fetch(`http://localhost:5050/api/food/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");
      showCustomToast("Donation deleted", "success");
      setDonations((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      showCustomToast(error.message, "error");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-3xl font-bold text-green-800 mb-6">My Donations</h2>

        {loading ? (
          <p>Loading...</p>
        ) : donations.length === 0 ? (
          <p className="text-gray-600">No donations shared yet.</p>
        ) : (
          <div className="space-y-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-green-700">
                      {donation.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{donation.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Location: {donation.location}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/edit-donation/${donation._id}`}
                      className="px-3 py-1 bg-yellow-400 text-sm text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(donation._id)}
                      className="px-3 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {donation.image && (
                  <img
                    src={donation.image}
                    alt="Food"
                    className="mt-3 w-full max-h-64 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
