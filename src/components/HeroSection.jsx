export default function HeroSection() {
  return (
    <div className="bg-[url(https://green.org/wp-content/uploads/2024/01/Food-Waste-Reduction-1024x683.jpg)] py-5 lg:py-15 px-5 text-center space-y-4">
      {/* <h1 className="text-2xl font-bold text-green-800">
        Welcome Back, `(user)`   </h1> */}
      <h1 className="text-2xl font-bold">
        Let’s Reduce Food Waste Together, One Meal at a Time.
      </h1>
      <p className="text-lg text-gray-800 mt-1">
        Help the planet by sharing your surplus food with those in need.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:flex lg:items-center lg:justify-center">
        <button className="bg-green-600 text-lg hover:bg-green-700 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 transition lg:w-[350px]">
          ➕ Track Food
        </button>
        <button className="border-2 text-lg hover:bg-green-800 text-green-900 hover:text-white py-3 rounded-md  font-medium flex items-center justify-center gap-2 transition lg:w-[350px]">
          ❤️ Donate Food
        </button>
      </div>
    </div>
  );
}
