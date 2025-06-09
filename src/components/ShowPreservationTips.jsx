import { preservationTips } from "../data/preservationTips";

// Example component: ShowPreservationTips.jsx
export default function ShowPreservationTips({ foodName }) {
  const tip = preservationTips[foodName?.toLowerCase()];

  if (!tip) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl shadow-sm mt-4">
        ❗ No preservation tips found for <strong>{foodName}</strong>.
      </div>
    );
  }

  return (
    <div className="bg-green-50 p-5 rounded-xl shadow-md mt-4">
      <h3 className="font-semibold text-green-800 mb-2">
        🥫 How to Store <span className="capitalize">{foodName}</span>
      </h3>
      <p>
        <strong>Storage:</strong> {tip.storage}
      </p>
      <p>
        <strong>Estimated Shelf Life:</strong> {tip.duration}
      </p>
      <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
        {tip.tips.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
