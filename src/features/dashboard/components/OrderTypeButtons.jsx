
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
// OrderTypeButtons Component
export default function OrderTypeButtons() {
  const navigate = useNavigate();

  const goToLatexOrder = () => {
    navigate("/orders/create-latex/"); // adjust route as needed
  };

  const goToDataAnalysisOrder = () => {
    navigate("/orders/create-data-analysis"); // adjust route as needed
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* LaTeX Order Button */}
      <button
        className="group bg-white border-2 border-blue-600 text-blue-600 font-semibold py-4 px-6 
                 rounded-lg shadow-md transition-all duration-200 hover:bg-blue-600 hover:text-white 
                 hover:shadow-lg hover:border-blue-600"
        onClick={goToLatexOrder}
      >
        <div className="flex items-center justify-center gap-3">
          <svg
            className="w-5 h-5 transition-colors duration-200 group-hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="transition-colors duration-200 group-hover:text-white">
            Place LaTeX Order
          </span>
        </div>
      </button>

      {/* Data Analysis Order Button */}
      <button
        className="group bg-white border-2 border-green-600 text-green-600 font-semibold py-4 px-6 
                 rounded-lg shadow-md transition-all duration-200 hover:bg-green-600 hover:text-white 
                 hover:shadow-lg hover:border-green-600"
        onClick={goToDataAnalysisOrder}
      >
        <div className="flex items-center justify-center gap-3">
          <svg
            className="w-5 h-5 transition-colors duration-200 group-hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="transition-colors duration-200 group-hover:text-white">
            Place Data Analysis Order
          </span>
        </div>
      </button>
    </div>
  );
}
