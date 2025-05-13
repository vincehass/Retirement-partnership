from flask import Flask, jsonify, request
from flask_cors import CORS
import retirement

app = Flask(__name__)
CORS(app)

# Load data from retirement module
companies = retirement.get_companies()
industry_analysis = retirement.get_industry_analysis()
roadmap = retirement.get_roadmap()
partnership_criteria = retirement.get_partnership_criteria()

@app.route('/api/companies', methods=['GET'])
def get_companies():
    """Return all companies data"""
    return jsonify(companies)

@app.route('/api/industry-analysis', methods=['GET'])
def get_industry_analysis():
    """Return industry analysis data"""
    return jsonify(industry_analysis)

@app.route('/api/roadmap', methods=['GET'])
def get_roadmap():
    """Return implementation roadmap data"""
    return jsonify(roadmap)

@app.route('/api/criteria', methods=['GET'])
def get_criteria():
    """Return partnership criteria"""
    return jsonify(partnership_criteria)

@app.route('/api/analyze', methods=['POST'])
def analyze_company():
    """Analyze a new potential partner company"""
    data = request.json
    
    # Validate request data
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ["name", "industry", "revenue", "employees", "profitMargin", "esgScore"]
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({
            "error": "Missing required fields",
            "missing": missing_fields
        }), 400
    
    try:
        # Call the analyze function from retirement module
        result = retirement.analyze_company(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = 5000
    print(f"Starting API server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True) 