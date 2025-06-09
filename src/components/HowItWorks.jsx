import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: "🍲",
    title: "List Extra Food",
    description: "Quickly share your leftover or surplus food.",
  },
  {
    icon: "🔍",
    title: "Find Seekers",
    description: "People in need can request the food you list.",
  },
  {
    icon: "🌱",
    title: "Reduce Waste",
    description: "Support your community and protect the planet.",
  },
];

const HowItWorks = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-5 px-4 md:px-8 mt-10 text-center space-y-8">
      <motion.h2
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>

      <motion.p
        className="text-lg md:text-xl max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Join the movement to fight food waste in just a few simple steps.
      </motion.p>

      <div className="relative flex items-center justify-center">
        <button
          onClick={() => scroll("left")}
          className="flex absolute left-2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto px-8 snap-x snap-mandatory scroll-smooth"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="min-w-[280px] md:min-w-[300px] snap-start bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="flex absolute right-2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
