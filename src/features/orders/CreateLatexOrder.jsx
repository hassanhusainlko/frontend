import React, { useState } from "react";
import { useCreateLatexOrderMutation } from "./latexOrdersApi"; // adjust path

export default function CreateLatexOrder() {
  const [createOrder, { isLoading }] = useCreateLatexOrderMutation();

  const [form, setForm] = useState({
    serviceType: "standard",
    latexTitle: "",
    latexType: "",
    additionalNotes: "",
    appliedCoupon: "",
  });

  const [sourceFile, setSourceFile] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSourceFile(file);
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.latexType) {
      setError("Please select the LaTeX conversion type.");
      return false;
    }
    if (!sourceFile) {
      setError("Please upload the source file to be converted.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validate()) return;

    try {
      const payload = {
        serviceType: form.serviceType,
        latexTitle: form.latexTitle,
        latexType: form.latexType,
        additionalNotes: form.additionalNotes,
        appliedCoupon: form.appliedCoupon || null,
        sourceFile,
      };

      await createOrder(payload).unwrap();

      setSuccess("Order created successfully!");

      setForm({
        serviceType: "standard",
        latexTitle: "",
        latexType: "",
        additionalNotes: "",
        appliedCoupon: "",
      });
      setSourceFile(null);
    } catch (err) {
      console.error("Create order failed:", err);
      const msg =
        err?.data?.detail ||
        err?.data?.message ||
        err?.error ||
        "Failed to create order.";
      setError(msg);
    }
  };

  // shared styles
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

  return (
    <div className="max-w-3xl mx-auto mt-40 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create LaTeX Order
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <label className={labelClass}>Service Type</label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="standard">Standard</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Document Title */}
          <div>
            <label htmlFor="latexTitle" className={labelClass}>
              Title of the Document
            </label>
            <input
              id="latexTitle"
              name="latexTitle"
              type="text"
              value={form.latexTitle}
              onChange={handleChange}
              placeholder="Enter the title of the document"
              className={inputClass}
            />
          </div>

          {/* Type of Conversion */}
          <div>
            <label htmlFor="latexType" className={labelClass}>
              Type of Conversion
            </label>
            <select
              id="latexType"
              name="latexType"
              value={form.latexType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Choose…</option>
              <option value="word_to_latex">Word to LaTeX</option>
              <option value="pdf_to_latex">Typed PDF to LaTeX</option>
              <option value="editable_pdf_to_latex">
                Editable PDF to LaTeX
              </option>
            </select>
          </div>

          {/* Source File */}
          <div>
            <label htmlFor="sourceFile" className={labelClass}>
              Document to be converted (Source File)
            </label>

            <div className="flex items-center gap-4">
              <input
                id="sourceFile"
                name="sourceFile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-gray-600 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 
                  hover:file:bg-blue-100"
              />
            </div>

            {sourceFile && (
              <p className="text-sm text-gray-700 mt-1">
                Selected: {sourceFile.name}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="additionalNotes" className={labelClass}>
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows="3"
              value={form.additionalNotes}
              onChange={handleChange}
              placeholder="Any formatting preferences, journal guidelines, etc."
              className={inputClass + " resize-y"}
            />
          </div>

          {/* Coupon */}
          <div>
            <label htmlFor="appliedCoupon" className={labelClass}>
              Coupon (optional)
            </label>
            <input
              id="appliedCoupon"
              name="appliedCoupon"
              type="text"
              value={form.appliedCoupon}
              onChange={handleChange}
              placeholder="Enter coupon code or ID"
              className={inputClass}
            />
          </div>

          {/* Error / Success */}
          <div>
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 text-red-800 px-4 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-2">
                {success}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 justify-center 
              w-full md:w-auto 
              bg-blue-600 hover:bg-blue-700 
              text-white font-semibold 
              px-5 py-2 rounded-md shadow-sm transition"
            >
              {isLoading ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
