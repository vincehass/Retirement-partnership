# Retirement Partnership Analysis

This project provides a dashboard for analyzing potential retirement partnership opportunities. It consists of a React frontend and a Python Flask backend.

## Live Demo

**Access the live dashboard**: [https://vincehass.github.io/Retirement-partnership/](https://vincehass.github.io/Retirement-partnership/)

The live demo runs on GitHub Pages using simulated data. For full functionality with the backend analytics engine, follow the local setup instructions below.

## Project Overview

The Retirement Partnership Analysis Dashboard helps financial institutions evaluate and prioritize potential partnership opportunities with other companies for retirement products and services. The dashboard provides sophisticated analysis tools to:

1. **Evaluate partnership opportunities**: Assess companies based on financial metrics, ESG scores, implementation complexity, and potential value
2. **Prioritize candidates**: Tier potential partners from "Priority" to "Not Recommended" based on comprehensive scoring
3. **Plan implementation**: Create a strategic roadmap for partnership rollout and integration
4. **Track industry trends**: Visualize industry-specific metrics to identify high-value sectors

## Project Structure

- `retirement-partnership/` - React frontend application
- `api_server.py` - Flask backend API
- `retirement.py` - Python data and analysis module
- `requirements.txt` - Python dependencies

## Analysis Methodology

The partnership analysis engine evaluates companies using a multi-factor model:

- **Partnership Score**: Calculated based on financial metrics, growth potential, operational compatibility, and ESG performance
- **Tier Classification**: Companies are assigned to tiers (Priority, High Potential, Consider, Not Recommended) based on their scores
- **Implementation Complexity**: Evaluates the technical and operational effort required for integration
- **Potential Value**: Estimates the financial opportunity based on revenue, market position, and synergy potential
- **ESG Alignment**: Assesses compatibility with environmental, social, and governance commitments

## Setup Instructions

### Backend Setup

1. Install Python dependencies:

   ```
   pip install -r requirements.txt
   ```

2. Run the Flask API server:
   ```
   python api_server.py
   ```
   The API will be available at http://localhost:5000

### Frontend Setup

1. Navigate to the React app directory:

   ```
   cd retirement-partnership
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```
   The application will be available at http://localhost:3000

## Key Features

- **Company List**: View and filter existing partner companies and their key metrics
- **Industry Analysis**: Interactive visualizations of industry performance metrics to identify trends and opportunities
- **Implementation Roadmap**: Strategic timeline for partnership integration with phase tracking
- **New Company Analysis**: Enter company metrics to receive comprehensive partnership analysis including:
  - Partnership score and tier recommendation
  - Implementation timeline estimate
  - Integration complexity assessment
  - Potential value calculation
  - Strategic recommendations

## API Endpoints

- `GET /api/companies` - Returns all companies data
- `GET /api/industry-analysis` - Returns industry analysis data
- `GET /api/roadmap` - Returns implementation roadmap data
- `GET /api/criteria` - Returns partnership criteria
- `POST /api/analyze` - Analyzes a new potential partner company

## Technology Stack

- **Frontend**: React, Tailwind CSS, Recharts
- **Backend**: Python, Flask, NumPy, Pandas
- **API**: RESTful API using Flask
- **Deployment**: GitHub Pages for frontend, local deployment for backend
