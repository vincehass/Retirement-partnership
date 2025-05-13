# Retirement Partnership Analysis

This project provides a dashboard for analyzing potential retirement partnership opportunities. It consists of a React frontend and a Python Flask backend.

## Project Structure

- `retirement-partnership/` - React frontend application
- `api_server.py` - Flask backend API
- `retirement.py` - Python data and analysis module
- `requirements.txt` - Python dependencies

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

## Features

- Interactive dashboard with multiple tabs for different views
- Company list with filtering and searching capabilities
- Industry analysis with visualization
- Implementation roadmap
- New company analysis tool
- Data visualization using recharts

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
