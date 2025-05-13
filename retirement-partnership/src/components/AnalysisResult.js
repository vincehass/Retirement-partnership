import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { Award, Clock, AlertTriangle, DollarSign, Info } from "lucide-react";

const AnalysisResult = ({ analysis, onClose }) => {
  if (!analysis) return null;

  // Prepare data for the chart
  const chartData = [
    { name: "Partnership Score", value: analysis.partnershipScore },
    {
      name: "Complexity",
      value:
        analysis.integrationComplexity === "Low"
          ? 30
          : analysis.integrationComplexity === "Medium"
          ? 60
          : 90,
    },
    { name: "Implementation", value: analysis.implementationTime * 5 }, // Scale to 0-100 for visualization
    { name: "Potential Value", value: analysis.potentialValue },
  ];

  // Get tier class for styling
  const getTierClass = (tier) => {
    if (tier === "A") return "bg-green-100 text-green-800";
    if (tier === "B") return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  // Map complexity to a numeric value for display
  const complexityToValue = {
    Low: 3,
    Medium: 6,
    High: 9,
  };

  const complexityValue =
    complexityToValue[analysis.integrationComplexity] || 5;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analysis Results</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart */}
        <div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "Partnership Score")
                      return [value.toFixed(1), name];
                    if (name === "Complexity")
                      return [analysis.integrationComplexity, name];
                    if (name === "Implementation")
                      return [analysis.implementationTime + " months", name];
                    if (name === "Potential Value")
                      return [value.toFixed(0) + "/100", name];
                    return [value, name];
                  }}
                />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#4CAF50"
                          : index === 1
                          ? "#F44336"
                          : index === 2
                          ? "#FFC107"
                          : "#2196F3"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <Award className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Partnership Score</p>
                <p className="text-xl font-bold">
                  {analysis.partnershipScore}/100
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <DollarSign className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Potential Value</p>
                <p className="text-xl font-bold">
                  {analysis.potentialValue}/100
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-full mr-3">
                <Clock className="w-5 h-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Implementation Time</p>
                <p className="text-xl font-bold">
                  {analysis.implementationTime} months
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-full mr-3">
                <AlertTriangle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Integration Complexity</p>
                <p className="text-xl font-bold">
                  {analysis.integrationComplexity}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <p className="text-sm text-gray-600 mr-2">Tier Assignment:</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getTierClass(
                  analysis.tier
                )}`}
              >
                Tier {analysis.tier}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Recommendations:
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
