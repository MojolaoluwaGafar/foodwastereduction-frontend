import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import ImpactStats from "../components/ImpactStats";
import FoodTrackerForm from "../components/FoodTrackerForm";
import { useAuth } from "../context/AuthContext";
import DonationCard from "../components/DonationCard";

export default function Home() {
  const { token } = useAuth();
  const [publicDonations, setPublicDonations] = useState([]);

  useEffect(() => {
    if (!token) {
      const fetchPublicDonations = async () => {
        try {
          const res = await fetch("http://localhost:5050/api/food/public");
          const data = await res.json();
          setPublicDonations(data);
        } catch (err) {
          console.error("❌ Failed to fetch public donations", err);
        }
      };
      fetchPublicDonations();
    }
  }, [token]);
  
  // console.log("🔥 Token from useAuth:", token);
  // const tips = [
  //   "Freeze leftover herbs in olive oil!",
  //   "Store apples away from bananas to slow ripening.",
  //   "Use veggie scraps for homemade stock.",
  //   "Plan meals before grocery shopping!",
  //   "Label your leftovers with dates.",
  // ];

  // const [dailyTip, setDailyTip] = useState("");

  // useEffect(() => {
  //   const randomTip = tips[Math.floor(Math.random() * tips.length)];
  //   setDailyTip(randomTip);
  // }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-5 py-6 space-y-8">
        <HeroSection />
        <HowItWorks />
        <ImpactStats token={token} />
        <FoodTrackerForm token={token} />

        {!token && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Recently Shared Food
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {publicDonations.length > 0 ? (
                publicDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))
              ) : (
                <p className="text-gray-500">No donations yet. Be the first!</p>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {/* <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            📈 Your Impact
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Items Tracked", value: "12" },
              { label: "Donated", value: "5" },
              { label: "Waste Saved", value: "4kg" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-4 shadow border border-green-100"
              >
                <p className="text-xl font-bold text-green-700">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Upcoming Expiry */}
        {/* <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            ⏰ Expiring Soon
          </h2>
          <div className="space-y-3">
            {[
              { name: "Spinach", emoji: "🥬", time: "Tomorrow" },
              { name: "Milk", emoji: "🥛", time: "In 2 days" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 rounded-xl shadow-sm flex justify-between items-center text-sm"
              >
                <span>
                  {item.emoji} <span className="font-medium">{item.name}</span>
                </span>
                <span className="text-red-600 font-semibold">{item.time}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Daily Tip */}
        {/* <div className="bg-green-100 border-l-4 border-green-500 text-green-900 p-4 rounded-xl shadow">
          <p className="italic text-sm leading-relaxed">
            💡 <span className="font-semibold">Today’s Tip:</span> “{dailyTip}”
          </p>
        </div> */}
      </div>
    </Layout>
  );
}
