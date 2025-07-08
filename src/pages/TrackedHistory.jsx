import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

export default function TrackedHistory() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTrackedItems = async () => {
      try {
        const res = await axios.get(
          "https://foodwastereduction-backend.onrender.com/api/tracked",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setItems(res.data.items);
      } catch (err) {
        console.error("❌ Failed to fetch tracked items:", err);
      }
    };

    if (token) fetchTrackedItems();
  }, [token]);
  // console.log("Tracked items:", items);

  return (
    <div>
      <NavBar />
      <div className="p-6 max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl font-bold text-green-900 mb-4">
          Your Tracked Food Items
          {/* <h2 className="text-2xl font-bold text-green-800">
        Tracked Food History */}
        </h1>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
            >
              <p className="font-semibold">{item.item}</p>
              <p className="text-sm ">Weight: {item.weight} kg</p>
              <p className="text-sm">
                Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </p>
              <p className="text-sm ">
                Tracked on: {new Date(item.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
