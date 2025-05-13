# Retirement Fund Partnership Analysis Dashboard

An interactive dashboard for analyzing potential partner companies for retirement fund integration.

## Overview

This dashboard presents a comprehensive analysis of 50 potential partner companies, evaluating them based on various metrics including:

- Partnership fit score
- Integration complexity
- Implementation timeline
- Potential value
- ESG performance
- Industry-specific metrics

The analysis helps identify the most promising companies to partner with for retirement fund services.

## Features

- **Overview Dashboard**: Summary metrics and key visualizations
- **Company Analysis**: Detailed view of each potential partner with filtering and sorting
- **Industry Analysis**: Industry-specific metrics and comparison tools
- **Implementation Roadmap**: Timeline and strategy for executing partnerships

## Technologies Used

- React.js
- Recharts for data visualization
- Tailwind CSS for styling
- Python (backend) for data analysis

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Run the setup script:

```bash
./run_dashboard.sh
```

Or manually:

```bash
cd retirement-partnership
npm install
npm start
```

The application will start and open in your default browser at `http://localhost:3000`.

## Project Structure

- `src/` - React application source files
  - `components/` - React components for each dashboard section
  - `data/` - Simulated data from Python analysis
- `public/` - Static assets
- `retirement.py` - Python script for data analysis and generation

## Data Analysis

The Python backend (`retirement.py`) performs:

- Company feature simulation
- Partnership fit scoring
- Clustering analysis
- Integration complexity estimation
- Implementation timeline calculation
- ESG performance evaluation

The results are imported into the React frontend for visualization and interaction.

## License

MIT
