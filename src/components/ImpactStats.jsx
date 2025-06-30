import { useEffect, useState } from "react";
import showCustomToast from "../utils/showCustomToast";

export default function ImpactStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/auth/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user stats");

      const data = await res.json();
      setStats(data);
    } catch (error) {
      showCustomToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 text-center mt-6">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p className="text-sm text-gray-600">Items Tracked</p>
        <h3 className="text-2xl font-bold text-green-700">
          {stats.itemsTracked}
        </h3>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p className="text-sm text-gray-600">Food Donated</p>
        <h3 className="text-2xl font-bold text-green-700">
          {stats.foodDonated}
        </h3>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p className="text-sm text-gray-600">Waste Saved (kg)</p>
        <h3 className="text-2xl font-bold text-green-700">
          {stats.wasteSaved}
        </h3>
      </div>
    </div>
  );
}
