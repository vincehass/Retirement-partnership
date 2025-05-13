import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
} from "recharts";
import { industryAnalysis, companies } from "../data/simulatedData";

const IndustryAnalysisTab = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Sort industries by average score
  const sortedIndustries = [...industryAnalysis].sort(
    (a, b) => b.avgScore - a.avgScore
  );

  // Calculate industry metrics
  const getIndustryMetrics = (industry) => {
    const companiesInIndustry = companies.filter(
      (c) => c.industry === industry
    );

    // Calculate tier distribution
    const tierDistribution = companiesInIndustry.reduce((acc, company) => {
      acc[company.tier] = (acc[company.tier] || 0) + 1;
      return acc;
    }, {});

    // Convert tier distribution to array for chart
    const tierData = Object.entries(tierDistribution).map(([tier, count]) => ({
      tier,
      count,
      fill:
        tier === "Tier 1 (Priority)"
          ? "#4CAF50"
          : tier === "Tier 2 (High Potential)"
          ? "#2196F3"
          : tier === "Tier 3 (Consider)"
          ? "#FFC107"
          : "#F44336",
    }));

    // Calculate average metrics
    const avgValue =
      companiesInIndustry.reduce((sum, c) => sum + c.value, 0) /
      companiesInIndustry.length;
    const avgComplexity =
      companiesInIndustry.reduce((sum, c) => sum + c.complexity, 0) /
      companiesInIndustry.length;
    const avgImplementation =
      companiesInIndustry.reduce((sum, c) => sum + c.implementation, 0) /
      companiesInIndustry.length;
    const avgEsg =
      companiesInIndustry.reduce((sum, c) => sum + c.esg, 0) /
      companiesInIndustry.length;

    // Company details
    const companyDetails = companiesInIndustry
      .map((c) => ({
        id: c.id,
        name: c.name,
        score: c.score,
        tier: c.tier,
        value: c.value,
        complexity: c.complexity,
        implementation: c.implementation,
        esg: c.esg,
      }))
      .sort((a, b) => b.score - a.score);

    return {
      tierData,
      avgValue,
      avgComplexity,
      avgImplementation,
      avgEsg,
      companyDetails,
      companiesCount: companiesInIndustry.length,
    };
  };

  // Get data for value vs complexity chart
  const valueComplexityData = sortedIndustries.map((item) => ({
    name: item.industry,
    x: item.avgComplexity,
    y: item.avgValue,
    z: item.tierOnePercent,
  }));

  // Get data for industry scores bar chart
  const industryScoreData = sortedIndustries.map((item) => ({
    name: item.industry,
    score: item.avgScore,
  }));

  // Handler for industry selection
  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry === selectedIndustry ? null : industry);
  };

  // Get metrics for selected industry
  const selectedIndustryMetrics = selectedIndustry
    ? getIndustryMetrics(selectedIndustry)
    : null;

  // Get tier class for styling
  const getTierClass = (tier) => {
    if (tier === "Tier 1 (Priority)") return "bg-green-100 text-green-800";
    if (tier === "Tier 2 (High Potential)") return "bg-blue-100 text-blue-800";
    if (tier === "Tier 3 (Consider)") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Industry Analysis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Score Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Industry Average Partnership Scores
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={industryScoreData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  onClick={(data) => handleIndustryClick(data)}
                  style={{ cursor: "pointer" }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${value.toFixed(1)}`,
                    "Average Score",
                  ]}
                />
                <Bar
                  dataKey="score"
                  fill="#8884d8"
                  onClick={(data) => handleIndustryClick(data.name)}
                >
                  {industryScoreData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === selectedIndustry ? "#4CAF50" : "#8884d8"
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Click on an industry to see detailed analysis
          </div>
        </div>

        {/* Value vs Complexity */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Value vs Integration Complexity by Industry
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="x"
                  name="Complexity"
                  label={{
                    value: "Integration Complexity",
                    position: "bottom",
                    offset: 0,
                  }}
                  domain={[0, 10]}
                  type="number"
                />
                <YAxis
                  dataKey="y"
                  name="Value"
                  label={{
                    value: "Potential Value ($K)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  type="number"
                />
                <ZAxis dataKey="z" range={[50, 400]} name="% in Tier 1" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name, props) => {
                    if (name === "Complexity") return [value.toFixed(1), name];
                    if (name === "Value")
                      return [`$${value.toFixed(0)}K`, name];
                    if (name === "% in Tier 1") return [`${value}%`, name];
                    return [value, name];
                  }}
                  labelFormatter={(index) => valueComplexityData[index].name}
                />
                <Scatter
                  name="Industries"
                  data={valueComplexityData}
                  fill="#8884d8"
                  onClick={(data) => handleIndustryClick(data.name)}
                >
                  {valueComplexityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === selectedIndustry ? "#4CAF50" : "#8884d8"
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Click on a dot to see detailed analysis
          </div>
        </div>
      </div>

      {/* Selected Industry Analysis */}
      {selectedIndustry && selectedIndustryMetrics && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {selectedIndustry} Industry Analysis
            </h3>
            <button
              onClick={() => setSelectedIndustry(null)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-800 font-medium">
                    Companies
                  </div>
                  <div className="text-xl font-bold">
                    {selectedIndustryMetrics.companiesCount}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-800 font-medium">
                    Avg Score
                  </div>
                  <div className="text-xl font-bold">
                    {industryAnalysis
                      .find((i) => i.industry === selectedIndustry)
                      ?.avgScore.toFixed(1)}
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-800 font-medium">
                    Avg Value
                  </div>
                  <div className="text-xl font-bold">
                    ${selectedIndustryMetrics.avgValue.toFixed(0)}K
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="text-sm text-yellow-800 font-medium">
                    Avg Complexity
                  </div>
                  <div className="text-xl font-bold">
                    {selectedIndustryMetrics.avgComplexity.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium mb-2">
                  Tier Distribution
                </div>
                <div className="space-y-2">
                  {selectedIndustryMetrics.tierData.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getTierClass(
                          tier.tier
                        )}`}
                      >
                        {tier.tier}
                      </span>
                      <span className="text-sm font-medium">
                        {tier.count} companies
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="text-sm font-medium mb-2">
                  Integration Strategy
                </div>
                <p className="text-sm text-gray-600">
                  {selectedIndustryMetrics.avgValue > 300 &&
                  selectedIndustryMetrics.avgComplexity < 5
                    ? "High-value, low-complexity. Prime target for immediate partnership outreach."
                    : selectedIndustryMetrics.avgValue > 300
                    ? "High-value but complex integration. Consider pilot programs with selected companies."
                    : selectedIndustryMetrics.avgComplexity < 5
                    ? "Simpler integration but moderate value. Good for quick wins and portfolio diversification."
                    : "Challenging sector with moderate return. Consider only standout companies from this industry."}
                </p>
              </div>
            </div>

            {/* Companies Table */}
            <div className="lg:col-span-2">
              <div className="text-sm font-medium mb-2">
                Companies in {selectedIndustry}
              </div>
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Company
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Score
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Value
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Complexity
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Tier
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedIndustryMetrics.companyDetails.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                          {company.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {company.score.toFixed(1)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          ${company.value.toFixed(0)}K
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {company.complexity.toFixed(1)}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 text-xs leading-5 font-semibold rounded-full ${getTierClass(
                              company.tier
                            )}`}
                          >
                            {company.tier.split(" ")[0]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryAnalysisTab;
