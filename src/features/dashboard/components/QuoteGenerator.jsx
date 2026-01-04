
import React, { useState, useEffect } from "react";

// QuoteGenerator Component
export default function QuoteGenerator() {
  const [quoteForm, setQuoteForm] = useState({
    serviceType: "standard",
    pages: "",
  });
  const [quoteResult, setQuoteResult] = useState(null);
  const [quoteError, setQuoteError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({ ...prev, [name]: value }));
    setQuoteError("");
    setQuoteResult(null);
  };

  const handleSubmit = async () => {
    setQuoteError("");
    setQuoteResult(null);

    const pagesNumber = Number(quoteForm.pages);
    if (!pagesNumber || pagesNumber <= 0) {
      setQuoteError("Please enter a valid number of pages.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const baseRate = quoteForm.serviceType === "urgent" ? 15 : 10;
      const amount = (pagesNumber * baseRate).toFixed(2);
      setQuoteResult({ amount, currency: "USD" });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Generate Quote</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Type
            </label>
            <select
              name="serviceType"
              value={quoteForm.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            >
              <option value="standard">Standard</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Pages
            </label>
            <input
              type="number"
              name="pages"
              value={quoteForm.pages}
              onChange={handleChange}
              min={1}
              placeholder="e.g. 10"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Calculating...
            </span>
          ) : (
            "Generate Quote"
          )}
        </button>
      </div>

      {quoteError && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <p className="text-red-700 text-sm font-medium">{quoteError}</p>
        </div>
      )}

      {quoteResult && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
          <div className="flex items-center justify-between">
            <span className="text-green-700 font-medium">
              Estimated Amount:
            </span>
            <span className="text-2xl font-bold text-green-800">
              {quoteResult.currency} {quoteResult.amount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
