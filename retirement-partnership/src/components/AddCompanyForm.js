import React, { useState } from "react";
import { analyzeNewCompany } from "../utils/api";

const INITIAL_FORM_STATE = {
  name: "",
  industry: "Financial Technology",
  revenue: "",
  employees: "",
  profitMargin: "",
  esgScore: "",
};

const AddCompanyForm = ({ onAnalysisComplete }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Convert string values to appropriate types
      const dataToSubmit = {
        ...formData,
        revenue: parseFloat(formData.revenue),
        employees: parseInt(formData.employees, 10),
        profitMargin: parseFloat(formData.profitMargin),
        esgScore: parseFloat(formData.esgScore),
      };

      const result = await analyzeNewCompany(dataToSubmit);

      if (result.success) {
        onAnalysisComplete(result.analysis);
        setFormData(INITIAL_FORM_STATE);
      } else {
        setError(result.error || "An error occurred during analysis");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const industries = [
    "Financial Technology",
    "Insurance",
    "Wealth Management",
    "Banking",
    "Retirement Services",
    "Investment Banking",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        Analyze New Potential Partner
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Annual Revenue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Revenue ($)
            </label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Employee Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Count
            </label>
            <input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Profit Margin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profit Margin (%)
            </label>
            <input
              type="number"
              name="profitMargin"
              value={formData.profitMargin}
              onChange={handleChange}
              required
              min="-100"
              max="100"
              step="0.1"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* ESG Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ESG Score (0-100)
            </label>
            <input
              type="number"
              name="esgScore"
              value={formData.esgScore}
              onChange={handleChange}
              required
              min="0"
              max="100"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Analyzing..." : "Analyze Company"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyForm;
