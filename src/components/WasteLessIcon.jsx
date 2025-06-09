export default function WasteLessIcon({
  className = "w-16 h-16 text-green-600",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" />
      <path
        d="M32 15C25 25 25 39 32 49C39 39 39 25 32 15Z"
        stroke="currentColor"
        strokeWidth="4"
        fill="currentColor"
      />
    </svg>
  );
}
