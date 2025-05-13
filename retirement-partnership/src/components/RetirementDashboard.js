import React, { useState } from "react";
import {
  BarChart2,
  Users,
  Activity,
  Target,
  Clock,
  DollarSign,
  Filter,
  Search,
  Info,
  PlusCircle,
} from "lucide-react";
import OverviewTab from "./OverviewTab";
import CompanyListTab from "./CompanyListTab";
import IndustryAnalysisTab from "./IndustryAnalysisTab";
import RoadmapTab from "./RoadmapTab";
import AddCompanyForm from "./AddCompanyForm";
import AnalysisResult from "./AnalysisResult";
import { companies, industries } from "../data/simulatedData";

const RetirementDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  // Filter companies based on tier, industry, and search query
  const filteredCompanies = companies.filter((company) => {
    const matchesTier = selectedTier === "All" || company.tier === selectedTier;
    const matchesIndustry =
      selectedIndustry === "All" || company.industry === selectedIndustry;
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesIndustry && matchesSearch;
  });

  // Get unique tiers
  const tiers = [...new Set(companies.map((company) => company.tier))];

  // Handle new company analysis completion
  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">
          Retirement Fund Partnership Analysis Dashboard
        </h1>
        <p className="text-sm">
          Analysis of 50 potential partner companies for retirement fund
          integration
        </p>
      </div>

      {/* Navigation */}
      <div className="flex border-b p-2 bg-white overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "overview"
              ? "bg-blue-100 text-blue-800"
              : "text-gray-600"
          }`}
        >
          <span className="flex items-center">
            <BarChart2 className="w-4 h-4 mr-1" /> Overview
          </span>
        </button>
        <button
          onClick={() => setActiveTab("companies")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "companies"
              ? "bg-blue-100 text-blue-800"
              : "text-gray-600"
          }`}
        >
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" /> Companies
          </span>
        </button>
        <button
          onClick={() => setActiveTab("industry")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "industry"
              ? "bg-blue-100 text-blue-800"
              : "text-gray-600"
          }`}
        >
          <span className="flex items-center">
            <Activity className="w-4 h-4 mr-1" /> Industry Analysis
          </span>
        </button>
        <button
          onClick={() => setActiveTab("roadmap")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "roadmap"
              ? "bg-blue-100 text-blue-800"
              : "text-gray-600"
          }`}
        >
          <span className="flex items-center">
            <Target className="w-4 h-4 mr-1" /> Implementation Roadmap
          </span>
        </button>
        <button
          onClick={() => setActiveTab("analyze")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "analyze"
              ? "bg-blue-100 text-blue-800"
              : "text-gray-600"
          }`}
        >
          <span className="flex items-center">
            <PlusCircle className="w-4 h-4 mr-1" /> New Company
          </span>
        </button>
      </div>

      {/* Filter Bar */}
      {activeTab === "companies" && (
        <div className="p-3 bg-white border-b flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-600 mr-2">Filter by Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="p-1 border rounded text-sm"
            >
              <option value="All">All Tiers</option>
              {tiers.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-600 mr-2">
              Filter by Industry:
            </span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="p-1 border rounded text-sm"
            >
              <option value="All">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center flex-grow">
            <Search className="w-4 h-4 mr-1 text-gray-500" />
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1 border rounded text-sm w-full max-w-md"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow p-4">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "companies" && (
          <CompanyListTab companies={filteredCompanies} />
        )}
        {activeTab === "industry" && <IndustryAnalysisTab />}
        {activeTab === "roadmap" && <RoadmapTab />}
        {activeTab === "analyze" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">
              Analyze New Potential Partner
            </h2>

            {analysisResult && (
              <AnalysisResult
                analysis={analysisResult}
                onClose={() => setAnalysisResult(null)}
              />
            )}

            <AddCompanyForm onAnalysisComplete={handleAnalysisComplete} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-3 text-center text-sm text-gray-600 border-t">
        <p>Retirement Fund Partnership Analysis Dashboard © 2023</p>
      </div>
    </div>
  );
};

export default RetirementDashboard;
