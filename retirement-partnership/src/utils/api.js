import axios from "axios";

// This is a simulated API integration - in a real environment,
// this would connect to an actual backend API exposing the Python analysis

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Fetch all company data
export const fetchCompanies = async () => {
  try {
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

export default {
  fetchCompanies,
  fetchIndustryAnalysis,
  fetchRoadmapData,
  analyzeNewCompany,
  fetchPartnershipCriteria,
};
