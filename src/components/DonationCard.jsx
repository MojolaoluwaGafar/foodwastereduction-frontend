export default function DonationCard({ donation }) {
  const isExpiringSoon = donation.expiryDate
    ? new Date(donation.expiryDate) - new Date() < 3 * 24 * 60 * 60 * 1000
    : false;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100 relative">
      <img
        src={donation.image}
        alt={donation.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-700">{donation.title}</h3>
        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
          {donation.description}
        </p>
        <p className="text-xs text-gray-500 mb-1">📍 {donation.location}</p>
        <p className="text-xs text-gray-500">🍽 Quantity: {donation.quantity}</p>
        <p className="text-xs text-gray-500">
          ⏰ Expires: {new Date(donation.expiryDate).toLocaleDateString()}
        </p>
      </div>
      {isExpiringSoon && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Expiring Soon
        </span>
      )}
    </div>
  );
}
