import React, { useState } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Award,
  Clock,
  AlertTriangle,
  DollarSign,
  Info,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";

const CompanyListTab = ({ companies }) => {
  const [sortField, setSortField] = useState("score");
  const [sortDirection, setSortDirection] = useState("desc");
  const [expandedCompany, setExpandedCompany] = useState(null);

  // Sort companies based on the selected field and direction
  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  });

  // Handle sort click
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (field !== sortField) return null;

    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  // Get tier class for styling
  const getTierClass = (tier) => {
    if (tier === "Tier 1 (Priority)") return "bg-green-100 text-green-800";
    if (tier === "Tier 2 (High Potential)") return "bg-blue-100 text-blue-800";
    if (tier === "Tier 3 (Consider)") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Toggle company expanded state
  const toggleExpanded = (id) => {
    if (expandedCompany === id) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(id);
    }
  };

  // Company detail metrics for expanded view
  const getDetailMetrics = (company) => {
    return [
      { name: "Partnership Score", value: company.score },
      { name: "ESG Score", value: company.esg },
      { name: "Potential Value ($K)", value: company.value },
      { name: "Integration Complexity", value: company.complexity },
      { name: "Implementation (months)", value: company.implementation },
    ];
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Company Analysis</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("score")}
                >
                  <span className="flex items-center">
                    Partnership Score {getSortIcon("score")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("value")}
                >
                  <span className="flex items-center">
                    Potential Value {getSortIcon("value")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("complexity")}
                >
                  <span className="flex items-center">
                    Complexity {getSortIcon("complexity")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("implementation")}
                >
                  <span className="flex items-center">
                    Implementation {getSortIcon("implementation")}
                  </span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tier
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCompanies.map((company) => (
                <React.Fragment key={company.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {company.industry}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {company.score.toFixed(1)}/100
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${company.value.toFixed(0)}K
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {company.complexity.toFixed(1)}/10
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {company.implementation.toFixed(1)} months
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierClass(
                          company.tier
                        )}`}
                      >
                        {company.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => toggleExpanded(company.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {expandedCompany === company.id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded details row */}
                  {expandedCompany === company.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="7" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="col-span-1 md:col-span-2">
                            <h4 className="font-medium text-gray-800 mb-3">
                              Company Metrics
                            </h4>
                            <div className="h-48">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={getDetailMetrics(company)}
                                  layout="vertical"
                                >
                                  <Tooltip
                                    formatter={(value) => [
                                      value.toFixed(1),
                                      "",
                                    ]}
                                    labelFormatter={(index) =>
                                      getDetailMetrics(company)[index].name
                                    }
                                  />
                                  <Bar dataKey="value" fill="#8884d8">
                                    {getDetailMetrics(company).map(
                                      (entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={
                                            index % 2 ? "#82ca9d" : "#8884d8"
                                          }
                                        />
                                      )
                                    )}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded shadow-sm">
                            <h4 className="font-medium text-gray-800 mb-2">
                              Partnership Details
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Industry:
                                </span>
                                <span className="text-sm font-medium">
                                  {company.industry}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  ESG Score:
                                </span>
                                <span className="text-sm font-medium">
                                  {company.esg.toFixed(1)}/100
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Value Potential:
                                </span>
                                <span className="text-sm font-medium">
                                  ${company.value.toFixed(0)}K
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Integration Complexity:
                                </span>
                                <span className="text-sm font-medium">
                                  {company.complexity.toFixed(1)}/10
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Implementation Time:
                                </span>
                                <span className="text-sm font-medium">
                                  {company.implementation.toFixed(1)} months
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Partnership Tier:
                                </span>
                                <span
                                  className={`text-sm font-medium px-2 rounded-full ${getTierClass(
                                    company.tier
                                  )}`}
                                >
                                  {company.tier}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-200">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                Recommendations
                              </h5>
                              <p className="text-sm text-gray-600">
                                {company.tier === "Tier 1 (Priority)"
                                  ? "High priority for partnership. Begin outreach immediately."
                                  : company.tier === "Tier 2 (High Potential)"
                                  ? "Strong potential. Consider for second phase of implementation."
                                  : company.tier === "Tier 3 (Consider)"
                                  ? "Moderate fit. Keep on radar but focus on higher tiers first."
                                  : "Not recommended at this time due to low partnership score."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {companies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No companies match your filter criteria. Try adjusting your filters.
        </div>
      )}
    </div>
  );
};

export default CompanyListTab;
