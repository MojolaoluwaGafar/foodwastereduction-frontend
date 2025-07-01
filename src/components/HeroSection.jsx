import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="w-full  overflow-hidden">
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://green.org/wp-content/uploads/2024/01/Food-Waste-Reduction-1024x683.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div> */}

      <div className="py-10 px-6 md:px-12 lg:px-20 flex flex-col justify-center items-center text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold max-w-3xl">
          Let’s Reduce Food Waste Together, One Meal at a Time.
        </h1>
        <p className="text-base sm:text-lg max-w-2xl ">
          Help the planet by sharing your surplus food with those in need.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:flex lg:items-center lg:justify-center">
          <button className="bg-green-600 hover:bg-green-700  py-3 px-6 rounded-md font-medium text-lg transition lg:w-[220px]">
            ➕ Track Food
          </button>
          <button className="border-2 border-green-600 hover:bg-green-700  py-3 px-6 rounded-md font-medium text-lg transition lg:w-[220px]">
            <Link to="/create-donation" className="btn-primary">
              ❤️ Donate Food
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
