import axios from "axios";
import {
  companies,
  industryAnalysis,
  roadmapData,
  criteria,
} from "../data/simulatedData";

// Environment detection - are we on GitHub Pages?
const isGitHubPages = window.location.hostname.includes("github.io");

// API base URL - use mock data if on GitHub Pages
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (isGitHubPages ? "" : "http://localhost:5000/api");

// Fetch all company data
export const fetchCompanies = async () => {
  try {
    if (isGitHubPages) {
      // Use mock data on GitHub Pages
      return {
        success: true,
        companies: companies,
      };
    }

    const response = await axios.get(`${API_BASE_URL}/companies`);
    return {
      success: true,
      companies: response.data,
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { success: false, error: error.message };
  }
};

// Fetch industry analysis
export const fetchIndustryAnalysis = async () => {
  try {
    if (isGitHubPages) {
      // Use mock data on GitHub Pages
      return {
        success: true,
        industryAnalysis: industryAnalysis,
      };
    }

    const response = await axios.get(`${API_BASE_URL}/industry-analysis`);
    return {
      success: true,
      industryAnalysis: response.data,
    };
  } catch (error) {
    console.error("Error fetching industry analysis:", error);
    return { success: false, error: error.message };
  }
};

// Fetch roadmap data
export const fetchRoadmapData = async () => {
  try {
    if (isGitHubPages) {
      // Use mock data on GitHub Pages
      return {
        success: true,
        roadmap: roadmapData,
      };
    }

    const response = await axios.get(`${API_BASE_URL}/roadmap`);
    return {
      success: true,
      roadmap: response.data,
    };
  } catch (error) {
    console.error("Error fetching roadmap data:", error);
    return { success: false, error: error.message };
  }
};

// Analyze a new potential company
export const analyzeNewCompany = async (companyData) => {
  try {
    if (isGitHubPages) {
      // Generate mock analysis on GitHub Pages
      const score = Math.min(
        Math.floor(
          (companyData.revenue * 0.2 +
            companyData.employees * 0.1 +
            companyData.profitMargin * 30 +
            companyData.esgScore * 10) /
            50
        ),
        100
      );

      // Mock tier based on score
      let tier;
      if (score >= 80) tier = "Gold";
      else if (score >= 60) tier = "Silver";
      else if (score >= 40) tier = "Bronze";
      else tier = "Not Recommended";

      return {
        success: true,
        analysis: {
          partnershipScore: score,
          tier: tier,
          implementationTime: Math.floor(Math.random() * 12) + 2 + " months",
          integrationComplexity: ["Low", "Medium", "High"][
            Math.floor(Math.random() * 3)
          ],
          potentialValue:
            "$" +
            (
              Math.floor((companyData.revenue * 0.05) / 1000) * 1000
            ).toLocaleString(),
          recommendations: [
            "Schedule initial meeting with stakeholders",
            "Review financial integration opportunities",
            "Evaluate technical compatibility",
            tier !== "Not Recommended"
              ? "Begin partnership agreement drafting"
              : "Reassess in 6 months",
          ],
        },
      };
    }

    const response = await axios.post(`${API_BASE_URL}/analyze`, companyData);
    return {
      success: true,
      analysis: {
        partnershipScore: response.data.partnershipScore,
        tier: response.data.tier,
        implementationTime: response.data.implementationTime,
        integrationComplexity: response.data.integrationComplexity,
        potentialValue: response.data.potentialValue,
        recommendations: response.data.recommendations,
      },
    };
  } catch (error) {
    console.error("Error analyzing company:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
};

// Fetch partnership criteria
export const fetchPartnershipCriteria = async () => {
  try {
    if (isGitHubPages) {
      // Use mock data on GitHub Pages
      return {
        success: true,
        criteria: criteria,
      };
    }

    const response = await axios.get(`${API_BASE_URL}/criteria`);
    return {
      success: true,
      criteria: response.data,
    };
  } catch (error) {
    console.error("Error fetching partnership criteria:", error);
    return { success: false, error: error.message };
  }
};

const api = {
  fetchCompanies,
  fetchIndustryAnalysis,
  fetchRoadmapData,
  analyzeNewCompany,
  fetchPartnershipCriteria,
};

export default api;
