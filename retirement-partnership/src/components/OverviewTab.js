import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  Cell,
  ZAxis,
} from "recharts";
import {
  Award,
  Users,
  Check,
  Clock,
  AlertTriangle,
  DollarSign,
  BarChart2,
} from "lucide-react";
import {
  companies,
  tierDistribution,
  industryBarData,
  esgData,
  valueComplexityData,
  industryAnalysis,
  partnershipCriteria,
} from "../data/simulatedData";

const OverviewTab = () => {
  // Calculate summary stats
  const totalCompanies = companies.length;
  const tier1Count = companies.filter(
    (c) => c.tier === "Tier 1 (Priority)"
  ).length;
  const avgImplementation =
    companies.reduce((sum, c) => sum + c.implementation, 0) / totalCompanies;
  const avgScore =
    companies.reduce((sum, c) => sum + c.score, 0) / totalCompanies;
  const totalValue = companies.reduce((sum, c) => sum + c.value, 0);

  const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Partnership Analysis Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold">{totalCompanies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <Award className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tier 1 Companies</p>
              <p className="text-2xl font-bold">
                {tier1Count}{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({Math.round((tier1Count / totalCompanies) * 100)}%)
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-full mr-3">
              <Clock className="w-5 h-5 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Implementation Time</p>
              <p className="text-2xl font-bold">
                {avgImplementation.toFixed(1)}{" "}
                <span className="text-sm font-normal text-gray-500">
                  months
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-full mr-3">
              <DollarSign className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Value Potential</p>
              <p className="text-2xl font-bold">${totalValue.toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Distribution & Top Industries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Partnership Tier Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Top Industries by Partnership Score
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryBarData}>
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Avg. Score",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ESG Performance & Value vs Complexity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            ESG Performance by Tier
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={esgData}>
                <XAxis dataKey="tier" />
                <YAxis
                  domain={[0, 100]}
                  label={{
                    value: "ESG Score",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Value vs. Complexity by Industry
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis
                  dataKey="x"
                  name="Complexity"
                  label={{
                    value: "Integration Complexity",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  domain={[0, 10]}
                />
                <YAxis
                  dataKey="y"
                  name="Value"
                  label={{
                    value: "Potential Value ($K)",
                    angle: -90,
                    position: "insideLeft",
                  }}
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
                  labelFormatter={(label) =>
                    valueComplexityData[label]?.industry || ""
                  }
                />
                <Scatter
                  name="Industries"
                  data={valueComplexityData}
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Partnership Criteria */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Partnership Evaluation Criteria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {partnershipCriteria.map((criteria, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="font-medium text-lg mb-1">{criteria.name}</div>
              <div className="text-sm text-gray-600 mb-2">
                {criteria.description}
              </div>
              <div className="text-xs font-medium text-gray-500 mb-1">
                Key Metrics:
              </div>
              <ul className="text-xs list-disc list-inside">
                {criteria.metrics.map((metric, i) => (
                  <li key={i}>{metric}</li>
                ))}
              </ul>
              <div className="mt-2 text-sm">
                <span className="font-medium">Weight: </span>
                <span className="text-blue-600">
                  {(criteria.weight * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
