import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-900 border-t ">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <Link to="/home" className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold tracking-wide">WasteLess</h1>
          </Link>
          <p className="text-md text-gray-500">
            &copy; {new Date().getFullYear()} WasteLess. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6 text-sm">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/share-food" className="hover:underline">
            Share
          </Link>
          <Link to="/donations" className="hover:underline">
            Donations
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
