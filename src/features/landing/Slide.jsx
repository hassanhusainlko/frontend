import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import slider_1 from "/slider_1.png";
import slider_2 from "/slider_2.png";
import slider_3 from "/slider_2.png";

const slides = [slider_1, slider_2, slider_3];

export default function Slider() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[280px] md:h-[450px] mt-24 overflow-hidden bg-gray-100 rounded-xl shadow">
      <AnimatePresence>
        <motion.img
          key={index}
          src={slides[index]}
          alt="Slider Image"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
