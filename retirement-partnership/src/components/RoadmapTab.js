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
  Check,
  AlertCircle,
  Hourglass,
} from "lucide-react";
import { roadmapData } from "../data/simulatedData";

const RoadmapTab = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);

  // Toggle phase expanded state
  const togglePhase = (phaseId) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseId);
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <Check className="w-5 h-5 text-green-600" />;
      case "In Progress":
        return <Hourglass className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Implementation Roadmap
      </h2>

      {/* Timeline overview */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Partnership Timeline</h3>
        <div className="text-sm text-gray-600 mb-4">
          Started: {roadmapData.timeline.start} | Current:{" "}
          {roadmapData.timeline.currentDate}
        </div>

        <div className="relative pb-12">
          {/* Timeline line */}
          <div className="absolute left-0 ml-6 h-full w-0.5 bg-gray-200"></div>

          {/* Milestones */}
          {roadmapData.timeline.milestones.map((milestone, idx) => (
            <div key={idx} className="relative flex items-start mb-8 ml-6">
              {/* Timeline dot */}
              <div className="absolute -left-6 mt-1.5">
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    milestone.date.includes("Expected")
                      ? "border-blue-400 bg-white"
                      : "border-green-500 bg-green-500"
                  }`}
                ></div>
              </div>

              <div>
                <h4 className="font-medium">{milestone.name}</h4>
                <p
                  className={`text-sm ${
                    milestone.date.includes("Expected")
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {milestone.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {roadmapData.phases.map((phase) => (
          <div
            key={phase.id}
            className={`bg-white p-4 rounded-lg shadow 
                       ${
                         expandedPhase === phase.id
                           ? "ring-2 ring-blue-500"
                           : ""
                       }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    phase.status === "Completed"
                      ? "bg-green-100"
                      : phase.status === "In Progress"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  {getStatusIcon(phase.status)}
                </div>
                <div>
                  <h3 className="font-bold">{phase.name}</h3>
                  <div className="text-sm text-gray-600">
                    Duration: {phase.duration} | Status: {phase.status}
                  </div>
                </div>
              </div>

              <div>
                {expandedPhase === phase.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>

            {expandedPhase === phase.id && (
              <div className="mt-4 pl-12">
                <p className="text-gray-700 mb-3">{phase.description}</p>
                <h4 className="font-medium mb-2">Key Tasks:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {phase.tasks.map((task, idx) => (
                    <li key={idx} className="text-gray-700">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTab;
