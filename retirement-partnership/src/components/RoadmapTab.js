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
  LineChart,
  Line,
} from "recharts";
import {
  Clock,
  DollarSign,
  Target,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { roadmapData, companies } from "../data/simulatedData";

const RoadmapTab = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);

  // Toggle phase expanded state
  const togglePhase = (phase) => {
    if (expandedPhase === phase) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phase);
    }
  };

  // Get companies for each phase
  const getPhaseCompanies = (phase) => {
    const phaseTiers = {
      "Phase 1": "Tier 1 (Priority)",
      "Phase 2": "Tier 2 (High Potential)",
      "Phase 3": "Tier 3 (Consider)",
    };

    const tier = phaseTiers[phase];
    return companies
      .filter((c) => c.tier === tier)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  };

  // Create timeline data for Gantt-like chart
  const createTimelineData = () => {
    const timelineData = [];

    // Phase 1 companies (start at month 0)
    const phase1Companies = getPhaseCompanies("Phase 1");
    let currentMonth = 0;

    phase1Companies.forEach((company, index) => {
      // Stagger starts to simulate a rollout
      const startMonth = Math.max(0, currentMonth - 1);
      timelineData.push({
        company: company.name,
        start: startMonth,
        duration: company.implementation,
        phase: "Phase 1",
        value: company.value,
        industry: company.industry,
      });

      currentMonth = startMonth + company.implementation * 0.7; // Allow for overlap
    });

    // Phase 2 companies (start after phase 1 is partially complete)
    const phase2Companies = getPhaseCompanies("Phase 2");
    const phase2Start = currentMonth * 0.5;

    phase2Companies.forEach((company, index) => {
      const startMonth = phase2Start + index * 0.7;
      timelineData.push({
        company: company.name,
        start: startMonth,
        duration: company.implementation,
        phase: "Phase 2",
        value: company.value,
        industry: company.industry,
      });
    });

    // Phase 3 companies (start after phase 2 is partially complete)
    const phase3Companies = getPhaseCompanies("Phase 3");
    const phase3Start = phase2Start + phase2Companies.length * 0.7 + 1;

    phase3Companies.forEach((company, index) => {
      const startMonth = phase3Start + index * 0.5;
      timelineData.push({
        company: company.name,
        start: startMonth,
        duration: company.implementation,
        phase: "Phase 3",
        value: company.value,
        industry: company.industry,
      });
    });

    return timelineData;
  };

  // Timeline data
  const timelineData = createTimelineData();

  // Get colors for phases
  const getPhaseColor = (phase) => {
    if (phase === "Phase 1") return "#4CAF50";
    if (phase === "Phase 2") return "#2196F3";
    return "#FFC107";
  };

  // Custom Timeline Chart Component
  const TimelineChart = ({ data }) => {
    // Find the latest end date to determine chart width
    const maxEnd =
      Math.max(...data.map((item) => item.start + item.duration)) + 1;

    return (
      <div
        className="relative overflow-x-auto"
        style={{ minHeight: `${data.length * 40 + 50}px` }}
      >
        {/* Header - Months */}
        <div className="flex border-b sticky top-0 bg-white z-10">
          <div className="w-48 flex-shrink-0 p-2 font-medium text-sm">
            Company
          </div>
          {Array.from({ length: maxEnd + 1 }).map((_, month) => (
            <div
              key={month}
              className="w-16 flex-shrink-0 text-center p-2 text-xs font-medium text-gray-600"
            >
              Month {month}
            </div>
          ))}
        </div>

        {/* Timeline rows */}
        {data.map((item, index) => {
          const startPosition = `${item.start * 64}px`;
          const width = `${item.duration * 64}px`;

          return (
            <div key={index} className="flex border-b relative h-10">
              <div className="w-48 flex-shrink-0 p-2 text-sm font-medium truncate">
                {item.company}
                <div className="text-xs text-gray-500">{item.industry}</div>
              </div>

              {/* Timeline bar */}
              <div
                className="absolute h-6 rounded-lg flex items-center justify-center text-xs text-white font-medium"
                style={{
                  left: `calc(12rem + ${startPosition})`,
                  width,
                  backgroundColor: getPhaseColor(item.phase),
                  top: "8px",
                }}
              >
                {item.duration.toFixed(1)}m
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Create cumulative value data for chart
  const createCumulativeValueData = () => {
    // Sort all companies by implementation timeline
    const timelineCompanies = [...timelineData].sort(
      (a, b) => a.start + a.duration - (b.start + b.duration)
    );

    let cumulativeValue = 0;
    const valueMilestones = [];

    timelineCompanies.forEach((item) => {
      cumulativeValue += item.value;
      valueMilestones.push({
        month: item.start + item.duration,
        value: cumulativeValue,
        company: item.company,
      });
    });

    // Create smoothed data points for the chart
    const chartData = [];
    chartData.push({ month: 0, value: 0 });

    valueMilestones.forEach((milestone) => {
      chartData.push({
        month: milestone.month,
        value: milestone.value,
        company: milestone.company,
      });
    });

    return chartData;
  };

  const valueProgressionData = createCumulativeValueData();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Implementation Roadmap
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roadmapData.map((phase, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow cursor-pointer
                       ${
                         expandedPhase === phase.phase
                           ? "ring-2 ring-blue-500"
                           : ""
                       }`}
            onClick={() => togglePhase(phase.phase)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full mr-3 
                                ${
                                  index === 0
                                    ? "bg-green-100"
                                    : index === 1
                                    ? "bg-blue-100"
                                    : "bg-yellow-100"
                                }`}
                >
                  {index === 0 ? (
                    <Target className={`w-5 h-5 text-green-700`} />
                  ) : index === 1 ? (
                    <Clock className={`w-5 h-5 text-blue-700`} />
                  ) : (
                    <Users className={`w-5 h-5 text-yellow-700`} />
                  )}
                </div>
                <div>
                  <p className="text-lg font-bold">{phase.phase}</p>
                  <p className="text-sm text-gray-600">
                    Timeline: {phase.timeline}
                  </p>
                </div>
              </div>
              {expandedPhase === phase.phase ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div>
                <p className="text-xs text-gray-500">Companies</p>
                <p className="text-lg font-semibold">{phase.companies}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Potential Value</p>
                <p className="text-lg font-semibold">
                  ${(phase.totalValue / 1000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg Implementation</p>
                <p className="text-lg font-semibold">
                  {phase.avgImplementation.toFixed(1)}{" "}
                  <span className="text-xs">months</span>
                </p>
              </div>
            </div>

            {/* Expanded content */}
            {expandedPhase === phase.phase && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-2">
                  Top Companies in {phase.phase}
                </p>
                <div className="space-y-2">
                  {getPhaseCompanies(phase.phase)
                    .slice(0, 5)
                    .map((company, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">{company.name}</p>
                          <p className="text-xs text-gray-500">
                            {company.industry}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ${company.value.toFixed(0)}K
                          </p>
                          <p className="text-xs text-gray-500">
                            {company.implementation.toFixed(1)} months
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Value Progression Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Cumulative Value Progression
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={valueProgressionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{
                  value: "Months",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Cumulative Value ($K)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value) => [
                  `$${value.toFixed(0)}K`,
                  "Cumulative Value",
                ]}
                labelFormatter={(label) => `Month ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Implementation Timeline</h3>
        <div className="text-sm text-gray-600 mb-4">
          <p>
            Visualization of when each partnership will be implemented and how
            long it will take.
          </p>
        </div>

        <div className="overflow-x-auto">
          <TimelineChart data={timelineData} />
        </div>

        <div className="flex items-center mt-4 text-sm text-gray-600 space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
            <span>Phase 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-1"></div>
            <span>Phase 2</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-1"></div>
            <span>Phase 3</span>
          </div>
        </div>
      </div>

      {/* Implementation Strategy */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Implementation Strategy</h3>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-green-50">
            <h4 className="font-medium text-green-800 mb-2">
              Phase 1 Strategy (0-6 months)
            </h4>
            <p className="text-sm">
              Focus on high-priority partnerships with highest value and lowest
              complexity. Begin with technology and healthcare industries where
              integration is simpler and potential value is high. Establish
              dedicated teams for each major industry segment.
            </p>
            <div className="mt-3 flex items-center text-sm text-green-800">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>
                Expected value: ${(roadmapData[0].totalValue / 1000).toFixed(1)}
                M
              </span>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-blue-50">
            <h4 className="font-medium text-blue-800 mb-2">
              Phase 2 Strategy (4-12 months)
            </h4>
            <p className="text-sm">
              Expand to high-potential partners with more complex integrations.
              Leverage lessons learned from Phase 1 to improve implementation
              efficiency. Begin targeting finance and energy sectors with
              customized partnership approaches.
            </p>
            <div className="mt-3 flex items-center text-sm text-blue-800">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>
                Expected value: ${(roadmapData[1].totalValue / 1000).toFixed(1)}
                M
              </span>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-yellow-50">
            <h4 className="font-medium text-yellow-800 mb-2">
              Phase 3 Strategy (10-18 months)
            </h4>
            <p className="text-sm">
              Address moderate-fit companies with the best potential from
              remaining candidates. Focus on industries that performed well in
              earlier phases. Implement streamlined integration processes based
              on experience from previous phases.
            </p>
            <div className="mt-3 flex items-center text-sm text-yellow-800">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>
                Expected value: ${(roadmapData[2].totalValue / 1000).toFixed(1)}
                M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapTab;
