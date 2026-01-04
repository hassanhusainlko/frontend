import React, { useState } from "react";
import { useCreateDataAnalysisOrderMutation } from "./dataAnalysisApi"; // adjust path

export default function CreateDataAnalysisOrder() {
  const [createDataOrder, { isLoading }] = useCreateDataAnalysisOrderMutation();

  const [form, setForm] = useState({
    serviceType: "standard", // 'standard' | 'urgent'
    dataTitle: "",
    dataObjective: "",
    dataType: "",
    additionalNotes: "",
    appliedCoupon: "",
  });

  const [mainDocument, setMainDocument] = useState(null);
  const [supportingDocument, setSupportingDocument] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  // file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    if (name === "mainDocument") {
      setMainDocument(file);
    } else if (name === "supportingDocument") {
      setSupportingDocument(file);
    }
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.dataTitle.trim()) {
      setError("Please enter a project/data title.");
      return false;
    }
    if (!form.dataObjective.trim()) {
      setError("Please describe your analysis objective.");
      return false;
    }
    if (!form.dataType.trim()) {
      setError("Please specify data type.");
      return false;
    }
    if (!mainDocument) {
      setError("Please upload the main dataset/document.");
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
        dataTitle: form.dataTitle.trim(),
        dataObjective: form.dataObjective.trim(),
        dataType: form.dataType.trim(),
        mainDocument,
        supportingDocument,
        additionalNotes: form.additionalNotes.trim(),
        appliedCoupon: form.appliedCoupon || null,
      };

      await createDataOrder(payload).unwrap();

      setSuccess("Data analysis order created successfully!");

      // reset simple fields
      setForm({
        serviceType: "standard",
        dataTitle: "",
        dataObjective: "",
        dataType: "",
        additionalNotes: "",
        appliedCoupon: "",
      });
      setMainDocument(null);
      setSupportingDocument(null);
      // If you want to clear file inputs visually too, you can use refs or <form>.reset()
    } catch (err) {
      console.error("Create data analysis order failed:", err);
      const msg =
        err?.data?.detail ||
        err?.data?.message ||
        err?.error ||
        "Failed to create data analysis order.";
      setError(msg);
    }
  };

  // Shared input styles
  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="max-w-3xl mx-auto mt-40 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Data Analysis Order
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
              required
              className={inputClass}
            >
              <option value="standard">Standard</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Project / Data Title */}
          <div>
            <label htmlFor="dataTitle" className={labelClass}>
              Project / Data Title
            </label>
            <input
              id="dataTitle"
              type="text"
              name="dataTitle"
              value={form.dataTitle}
              onChange={handleChange}
              placeholder="e.g. Sales Forecasting for Retail Chain"
              className={inputClass}
            />
          </div>

          {/* Objective */}
          <div>
            <label htmlFor="dataObjective" className={labelClass}>
              Analysis Objective
            </label>
            <textarea
              id="dataObjective"
              name="dataObjective"
              rows="4"
              value={form.dataObjective}
              onChange={handleChange}
              placeholder="e.g. Predict future sales using past 3 years data, identify key drivers, etc."
              className={inputClass + " resize-y"}
            />
          </div>

          {/* Data Type */}
          <div>
            <label htmlFor="dataType" className={labelClass}>
              Data Type
            </label>
            <input
              id="dataType"
              type="text"
              name="dataType"
              value={form.dataType}
              onChange={handleChange}
              placeholder="e.g. Time series, survey data, panel data, etc."
              className={inputClass}
            />
          </div>

          {/* Main Dataset (required) */}
          <div>
            <label htmlFor="mainDocument" className={labelClass}>
              Main Dataset / Document{" "}
              <span className="text-gray-400">(required)</span>
            </label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="mainDocument"
                className="flex-1 cursor-pointer flex items-center justify-between gap-4 rounded-md border border-dashed border-gray-200 px-4 py-3 hover:border-gray-300 transition"
              >
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {mainDocument ? mainDocument.name : "Choose main dataset"}
                  </div>
                  <div className="text-xs text-gray-500">
                    CSV / Excel / SPSS / ZIP / PDF
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded">
                  Browse
                </span>
              </label>

              <input
                id="mainDocument"
                name="mainDocument"
                type="file"
                accept=".csv,.xlsx,.xls,.sav,.txt,.zip,.pdf"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Upload your primary dataset (CSV/Excel/SPSS/ZIP etc.)
            </p>
          </div>

          {/* Supporting Document (optional) */}
          <div>
            <label htmlFor="supportingDocument" className={labelClass}>
              Supporting Document{" "}
              <span className="text-gray-400">(optional)</span>
            </label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="supportingDocument"
                className="flex-1 cursor-pointer flex items-center justify-between gap-4 rounded-md border border-dashed border-gray-200 px-4 py-3 hover:border-gray-300 transition"
              >
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {supportingDocument
                      ? supportingDocument.name
                      : "Choose supporting file"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Additional instructions, forms, or documents
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded">
                  Browse
                </span>
              </label>

              <input
                id="supportingDocument"
                name="supportingDocument"
                type="file"
                accept=".csv,.xlsx,.xls,.pdf,.doc,.docx,.zip"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              You can attach additional instructions, survey forms, or related
              files.
            </p>
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
              placeholder="Any specific methods, tools, or output format preferences."
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
              className="inline-flex items-center gap-2 justify-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-sm transition"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Data Analysis Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
