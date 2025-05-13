import { useState } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Filter, Search, Zap, Briefcase, Target, Clock, ArrowRight, Award, DollarSign, BarChart2 } from 'lucide-react';

// Simulated company data - this would come from the Python analysis
const companies = [
  { id: 1, name: 'AlphaTech', industry: 'Technology', score: 87.2, tier: 'Tier 1 (Priority)', value: 425.8, complexity: 3.4, implementation: 4.2, esg: 84.2 },
  { id: 2, name: 'NovaSystems', industry: 'Technology', score: 83.5, tier: 'Tier 1 (Priority)', value: 395.1, complexity: 4.1, implementation: 4.8, esg: 76.9 },
  { id: 3, name: 'VertexCorp', industry: 'Healthcare', score: 81.7, tier: 'Tier 1 (Priority)', value: 512.3, complexity: 5.2, implementation: 5.5, esg: 79.8 },
  { id: 4, name: 'OmniDynamics', industry: 'Finance', score: 80.2, tier: 'Tier 1 (Priority)', value: 657.2, complexity: 6.8, implementation: 7.3, esg: 72.1 },
  { id: 5, name: 'PeakVentures', industry: 'Manufacturing', score: 78.9, tier: 'Tier 1 (Priority)', value: 348.7, complexity: 4.5, implementation: 5.0, esg: 68.5 },
  { id: 6, name: 'CoreSolutions', industry: 'Retail', score: 74.8, tier: 'Tier 2 (High Potential)', value: 215.9, complexity: 3.2, implementation: 3.8, esg: 71.3 },
  { id: 7, name: 'EcoInnovations', industry: 'Energy', score: 72.3, tier: 'Tier 2 (High Potential)', value: 287.4, complexity: 5.8, implementation: 6.5, esg: 93.2 },
  { id: 8, name: 'MetaNetworks', industry: 'Telecommunications', score: 70.9, tier: 'Tier 2 (High Potential)', value: 321.6, complexity: 7.2, implementation: 8.1, esg: 67.8 },
  { id: 9, name: 'GlobalPartners', industry: 'Consumer Goods', score: 66.7, tier: 'Tier 2 (High Potential)', value: 189.5, complexity: 4.7, implementation: 5.2, esg: 75.4 },
  { id: 10, name: 'FutureAlliance', industry: 'Transportation', score: 64.2, tier: 'Tier 2 (High Potential)', value: 247.3, complexity: 6.1, implementation: 7.0, esg: 82.3 },
  { id: 11, name: 'TechEnterprises', industry: 'Technology', score: 58.9, tier: 'Tier 3 (Consider)', value: 142.8, complexity: 5.5, implementation: 6.2, esg: 61.7 },
  { id: 12, name: 'CyberIndustries', industry: 'Technology', score: 57.1, tier: 'Tier 3 (Consider)', value: 175.2, complexity: 6.7, implementation: 7.5, esg: 65.9 },
  { id: 13, name: 'SmartCapital', industry: 'Finance', score: 52.8, tier: 'Tier 3 (Consider)', value: 198.7, complexity: 7.8, implementation: 8.7, esg: 59.4 },
  { id: 14, name: 'DigiGroup', industry: 'Telecommunications', score: 49.3, tier: 'Tier 3 (Consider)', value: 165.4, complexity: 7.1, implementation: 8.3, esg: 63.2 },
  { id: 15, name: 'QuantumInc', industry: 'Manufacturing', score: 41.7, tier: 'Tier 4 (Not Recommended)', value: 89.2, complexity: 8.5, implementation: 9.4, esg: 48.7 },
];

const industries = [...new Set(companies.map(company => company.industry))];

// Industry analysis data
const industryAnalysis = [
  { industry: 'Technology', avgScore: 78.2, avgValue: 284.7, avgComplexity: 4.7, tierOnePercent: 40 },
  { industry: 'Healthcare', avgScore: 76.5, avgValue: 327.8, avgComplexity: 5.8, tierOnePercent: 33 },
  { industry: 'Energy', avgScore: 72.3, avgValue: 287.4, avgComplexity: 5.8, tierOnePercent: 25 },
  { industry: 'Finance', avgScore: 66.5, avgValue: 428.0, avgComplexity: 7.3, tierOnePercent: 20 },
  { industry: 'Manufacturing', avgScore: 60.3, avgValue: 219.0, avgComplexity: 6.5, tierOnePercent: 15 },
  { industry: 'Retail', avgScore: 58.7, avgValue: 155.4, avgComplexity: 4.8, tierOnePercent: 12 },
  { industry: 'Telecommunications', avgScore: 57.1, avgValue: 243.5, avgComplexity: 7.2, tierOnePercent: 10 },
  { industry: 'Consumer Goods', avgScore: 52.3, avgValue: 145.7, avgComplexity: 5.2, tierOnePercent: 8 },
  { industry: 'Transportation', avgScore: 49.8, avgValue: 168.9, avgComplexity: 6.7, tierOnePercent: 5 }
];

// Implementation roadmap data
const roadmapData = [
  { phase: 'Phase 1', companies: 5, totalValue: 2339.1, avgImplementation: 5.4, timeline: '0-6 months' },
  { phase: 'Phase 2', companies: 5, totalValue: 1261.7, avgImplementation: 6.1, timeline: '4-12 months' },
  { phase: 'Phase 3', companies: 3, totalValue: 516.7, avgImplementation: 7.3, timeline: '10-18 months' }
];

// Tier distribution data for pie chart
const tierDistribution = [
  { name: 'Tier 1 (Priority)', value: 5, fill: '#4CAF50' },
  { name: 'Tier 2 (High Potential)', value: 5, fill: '#2196F3' },
  { name: 'Tier 3 (Consider)', value: 4, fill: '#FFC107' },
  { name: 'Tier 4 (Not Recommended)', value: 1, fill: '#F44336' }
];

// ESG data
const esgData = [
  { tier: 'Tier 1 (Priority)', avgScore: 76.3 },
  { tier: 'Tier 2 (High Potential)', avgScore: 78.0 },
  { tier: 'Tier 3 (Consider)', avgScore: 62.6 },
  { tier: 'Tier 4 (Not Recommended)', avgScore: 48.7 }
];

// Bar chart data for top industries
const industryBarData = industryAnalysis.slice(0, 5).map(item => ({
  name: item.industry,
  score: item.avgScore
}));

// Value vs Complexity scatter data
const valueComplexityData = industryAnalysis.map(item => ({
  industry: item.industry,
  x: item.avgComplexity,
  y: item.avgValue,
  z: item.tierOnePercent
}));

export default function RetirementFundDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTier, setSelectedTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter companies based on tier and search query
  const filteredCompanies = companies.filter(company => {
    const matchesTier = selectedTier === 'All' || company.tier === selectedTier;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });
  
  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#F44336'];
  
  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">Retirement Fund Partnership Analysis Dashboard</h1>
        <p className="text-sm">Analysis of 50 potential partner companies for retirement fund integration</p>
      </div>
      
      {/* Navigation */}
      <div className="flex border-b p-2 bg-white">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'overview' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
        >
          <span className="flex items-center">
            <BarChart2 className="w-4 h-4 mr-1" /> Overview
          </span>
        </button>
        <button 
          onClick={() => setActiveTab('companies')} 
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'companies' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
        >
          <span className="