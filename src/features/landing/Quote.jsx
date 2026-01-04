import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Quote() {
  const [quote, setQuote] = useState({
    documentType: "",
    serviceType: "",
    pages: "",
  });
  const [cardValue, setCardValue] = useState({ price: 0, days: 0 });
  const [showCard, setShowCard] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { documentType, serviceType, pages } = quote;
    const pagesNum = Number(pages);
    if (!documentType || !serviceType || !pagesNum || pagesNum <= 0) {
      // simple guard — you can replace with better validation/UI
      alert(
        "Please select document type, service type and enter a valid number of pages."
      );
      return;
    }

    let calculatedPrice = 0;
    let expectedDays = 0;

    // current business logic preserved; adjust multipliers as needed
    if (documentType === "Thesis" && serviceType === "Urgent") {
      calculatedPrice = pagesNum * 10;
      expectedDays = pagesNum * 2;
    } else if (documentType === "Thesis" && serviceType === "Regular") {
      calculatedPrice = pagesNum * 5;
      expectedDays = pagesNum * 4;
    } else {
      // fallback (e.g., Research Paper, Dissertation) — example logic
      if (serviceType === "Urgent") {
        calculatedPrice = pagesNum * 6;
        expectedDays = Math.max(1, Math.ceil(pagesNum / 2));
      } else {
        calculatedPrice = pagesNum * 3;
        expectedDays = Math.max(2, Math.ceil(pagesNum / 1.5));
      }
    }

    setCardValue({ price: calculatedPrice, days: expectedDays });
    setShowCard(true);
  };

  return (
    <div className="w-full px-4 md:px-8 mb-8">
      <h4 className="text-xl font-semibold mt-6 mb-6 flex items-center">
        <i className="fa-solid fa-check-to-slot mr-2" /> Referral Program
      </h4>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 gap-4 md:grid-cols-4 items-end"
      >
        {/* Document Type */}
        <div>
          <label
            htmlFor="documentType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Document Type
          </label>
          <select
            id="documentType"
            name="documentType"
            value={quote.documentType}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          >
            <option value="">Choose...</option>
            <option value="Research Paper">Research Paper</option>
            <option value="Thesis">Thesis</option>
            <option value="Dissertation">Dissertation</option>
          </select>
        </div>

        {/* Service Type */}
        <div>
          <label
            htmlFor="serviceType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service Type
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={quote.serviceType}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          >
            <option value="">Choose...</option>
            <option value="Regular">Regular</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Number of Pages */}
        <div>
          <label
            htmlFor="pages"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Pages
          </label>
          <input
            id="pages"
            name="pages"
            type="number"
            min="1"
            value={quote.pages}
            onChange={handleChange}
            placeholder="e.g. 12"
            className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-md bg-red-600 text-white py-2 px-4 font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Result Card */}
      {showCard && (
        <motion.div
          className="max-w-2xl mx-auto mt-6 rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="bg-white p-6">
            <div className="text-sm text-gray-500 mb-2">
              Priority Type: {quote.serviceType}
            </div>
            <h5 className="text-lg font-semibold mb-2">
              Document Type: {quote.documentType}
            </h5>
            <p className="text-gray-700 mb-4">
              Number of Pages:{" "}
              <span className="font-medium">{quote.pages}</span>
              <br />
              Price: <span className="font-medium">₹{cardValue.price}</span>
            </p>

            <div className="flex gap-3">
              <Link
                to="/home/place-order"
                className="inline-block rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
              >
                Create Order
              </Link>

              <button
                type="button"
                onClick={() => setShowCard(false)}
                className="inline-block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3 text-sm text-gray-600">
            Expected Delivery Time:{" "}
            <span className="font-medium">{cardValue.days}</span> Business Days
          </div>
        </motion.div>
      )}
    </div>
  );
}
