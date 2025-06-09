import { useEffect, useState } from "react";
import axios from "axios";

export default function ImpactStats({ token }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      console.log("Fetching stats with token:", token);

      try {
        const res = await axios.get("http://localhost:5050/api/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched stats:", res.data);
        setStats(res.data.stats);
      } catch (err) {
        console.error(
          "❌ Error fetching stats:",
          err.response?.data || err.message
        );
      }
    };

    if (token) fetchStats();
  }, [token]);
  

  if (!stats) return <p className="text-center">Loading your impact...</p>;

  const items = [
    { label: "Items Tracked", value: stats?.itemsTracked || 0, emoji: "📦" },
    { label: "Food Donated", value: stats?.foodDonated || 0, emoji: "🍛" },
    { label: "Waste Saved", value: `${stats?.wasteSaved || 0}kg`, emoji: "🌍" },
  ];
  

  return (
    <section className="py-10 px-4 md:px-8 text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Your Impact
      </h2>
      <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
        Every action counts. See how you’ve contributed to reducing food waste.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-green-50 border border-green-100 rounded-xl p-6 shadow"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <p className="text-2xl font-bold text-green-700">{item.value}</p>
            <p className="text-sm text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
