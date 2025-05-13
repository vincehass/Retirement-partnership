import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import random
from datetime import datetime, timedelta
import math

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Define industry categories
INDUSTRIES = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail",
    "Energy", "Telecommunications", "Consumer Goods", "Transportation",
    "Real Estate"
]

# Define business models
BUSINESS_MODELS = [
    "B2B", "B2C", "B2B2C", "D2C", "Subscription", "Marketplace",
    "Freemium", "Software as a Service (SaaS)", "Platform"
]

# Define company size categories
COMPANY_SIZES = ["Small", "Medium", "Large", "Enterprise"]

# Define geographic regions
REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"]

# Define ESG commitment levels
ESG_LEVELS = ["Low", "Medium", "High", "Very High"]

# Sample data for companies
COMPANIES = [
    {
        "id": 1,
        "name": "FinTech Solutions Inc.",
        "industry": "Financial Technology",
        "revenue": 89000000,
        "employees": 450,
        "profitMargin": 15.7,
        "esgScore": 82,
        "tier": "A",
        "partnershipScore": 87,
        "integrationComplexity": "Medium",
        "implementationTime": 8,
        "potentialValue": 92
    },
    {
        "id": 2,
        "name": "InsureTech Global",
        "industry": "Insurance",
        "revenue": 120000000,
        "employees": 780,
        "profitMargin": 12.3,
        "esgScore": 76,
        "tier": "B",
        "partnershipScore": 72,
        "integrationComplexity": "High",
        "implementationTime": 14,
        "potentialValue": 85
    },
    {
        "id": 3,
        "name": "WealthWise Advisors",
        "industry": "Wealth Management",
        "revenue": 56000000,
        "employees": 320,
        "profitMargin": 18.9,
        "esgScore": 88,
        "tier": "A",
        "partnershipScore": 91,
        "integrationComplexity": "Low",
        "implementationTime": 5,
        "potentialValue": 89
    },
    {
        "id": 4,
        "name": "Digital Banking Corp",
        "industry": "Banking",
        "revenue": 210000000,
        "employees": 1250,
        "profitMargin": 11.2,
        "esgScore": 79,
        "tier": "B",
        "partnershipScore": 75,
        "integrationComplexity": "Medium",
        "implementationTime": 10,
        "potentialValue": 78
    },
    {
        "id": 5,
        "name": "RetireEase Technologies",
        "industry": "Retirement Services",
        "revenue": 72000000,
        "employees": 410,
        "profitMargin": 14.5,
        "esgScore": 85,
        "tier": "A",
        "partnershipScore": 89,
        "integrationComplexity": "Medium",
        "implementationTime": 7,
        "potentialValue": 94
    },
    {
        "id": 6,
        "name": "Pension Management Group",
        "industry": "Retirement Services",
        "revenue": 95000000,
        "employees": 530,
        "profitMargin": 13.8,
        "esgScore": 81,
        "tier": "A",
        "partnershipScore": 85,
        "integrationComplexity": "Medium",
        "implementationTime": 9,
        "potentialValue": 87
    },
    {
        "id": 7,
        "name": "Golden Years Financial",
        "industry": "Retirement Services",
        "revenue": 48000000,
        "employees": 290,
        "profitMargin": 16.2,
        "esgScore": 84,
        "tier": "A",
        "partnershipScore": 86,
        "integrationComplexity": "Low",
        "implementationTime": 6,
        "potentialValue": 88
    },
    {
        "id": 8,
        "name": "CryptFin Innovations",
        "industry": "Financial Technology",
        "revenue": 38000000,
        "employees": 180,
        "profitMargin": 9.8,
        "esgScore": 71,
        "tier": "C",
        "partnershipScore": 65,
        "integrationComplexity": "High",
        "implementationTime": 15,
        "potentialValue": 70
    },
    {
        "id": 9,
        "name": "InsureAll Corporation",
        "industry": "Insurance",
        "revenue": 135000000,
        "employees": 820,
        "profitMargin": 11.9,
        "esgScore": 75,
        "tier": "B",
        "partnershipScore": 74,
        "integrationComplexity": "Medium",
        "implementationTime": 11,
        "potentialValue": 79
    },
    {
        "id": 10,
        "name": "TradeSmart Securities",
        "industry": "Investment Banking",
        "revenue": 185000000,
        "employees": 950,
        "profitMargin": 16.8,
        "esgScore": 77,
        "tier": "B",
        "partnershipScore": 78,
        "integrationComplexity": "High",
        "implementationTime": 12,
        "potentialValue": 83
    },
    {
        "id": 11,
        "name": "NeoBank Ventures",
        "industry": "Banking",
        "revenue": 64000000,
        "employees": 340,
        "profitMargin": 10.5,
        "esgScore": 80,
        "tier": "B",
        "partnershipScore": 76,
        "integrationComplexity": "Medium",
        "implementationTime": 9,
        "potentialValue": 81
    },
    {
        "id": 12,
        "name": "Future Fund Managers",
        "industry": "Wealth Management",
        "revenue": 92000000,
        "employees": 420,
        "profitMargin": 17.4,
        "esgScore": 86,
        "tier": "A",
        "partnershipScore": 88,
        "integrationComplexity": "Low",
        "implementationTime": 7,
        "potentialValue": 90
    }
]

# Industry analysis data
INDUSTRY_ANALYSIS = {
    "industries": ["Financial Technology", "Insurance", "Wealth Management", "Banking", "Retirement Services", "Investment Banking"],
    "averageScores": [82, 73, 89, 76, 87, 78],
    "marketGrowth": [16.2, 8.7, 10.5, 6.8, 12.3, 9.1],
    "regulatoryComplexity": [7.5, 8.9, 6.8, 9.2, 7.0, 8.5],
    "customerSatisfaction": [76, 68, 82, 70, 85, 72],
    "innovationIndex": [90, 65, 78, 72, 80, 75],
    "trends": [
        {
            "industry": "Financial Technology",
            "trend": "Increasing adoption of API-based services",
            "impact": "High",
            "opportunity": "Expand digital offering through strategic partnerships"
        },
        {
            "industry": "Insurance",
            "trend": "Shift to personalized risk assessment",
            "impact": "Medium",
            "opportunity": "Develop targeted retirement products based on risk profiles"
        },
        {
            "industry": "Wealth Management",
            "trend": "Growth in robo-advisory services",
            "impact": "High",
            "opportunity": "Integrate automated portfolio management for smaller accounts"
        },
        {
            "industry": "Banking",
            "trend": "Consolidation of digital banking services",
            "impact": "Medium",
            "opportunity": "Partner with digital banks for streamlined retirement accounts"
        },
        {
            "industry": "Retirement Services",
            "trend": "Increased demand for ESG-focused retirement plans",
            "impact": "High",
            "opportunity": "Develop ESG-screened retirement portfolios"
        },
        {
            "industry": "Investment Banking",
            "trend": "Growing focus on alternative investments",
            "impact": "Medium",
            "opportunity": "Expand retirement offerings to include alternative asset classes"
        }
    ]
}

# Roadmap data
current_date = datetime.now()
ROADMAP = {
    "phases": [
        {
            "phase": "Phase 1: Initial Integration",
            "startDate": (current_date + timedelta(days=15)).strftime("%Y-%m-%d"),
            "endDate": (current_date + timedelta(days=75)).strftime("%Y-%m-%d"),
            "tasks": [
                {"task": "API Integration Setup", "duration": 15, "dependencies": []},
                {"task": "Data Migration Planning", "duration": 20, "dependencies": [0]},
                {"task": "Security Protocol Alignment", "duration": 25, "dependencies": [0]},
                {"task": "Initial Testing", "duration": 15, "dependencies": [1, 2]}
            ]
        },
        {
            "phase": "Phase 2: Platform Development",
            "startDate": (current_date + timedelta(days=90)).strftime("%Y-%m-%d"),
            "endDate": (current_date + timedelta(days=180)).strftime("%Y-%m-%d"),
            "tasks": [
                {"task": "Joint Product Definition", "duration": 20, "dependencies": []},
                {"task": "UI/UX Design", "duration": 30, "dependencies": [0]},
                {"task": "Backend Development", "duration": 40, "dependencies": [0]},
                {"task": "Quality Assurance", "duration": 25, "dependencies": [1, 2]}
            ]
        },
        {
            "phase": "Phase 3: Market Launch",
            "startDate": (current_date + timedelta(days=195)).strftime("%Y-%m-%d"),
            "endDate": (current_date + timedelta(days=285)).strftime("%Y-%m-%d"),
            "tasks": [
                {"task": "Marketing Campaign Development", "duration": 35, "dependencies": []},
                {"task": "Sales Team Training", "duration": 20, "dependencies": [0]},
                {"task": "Beta Testing", "duration": 30, "dependencies": []},
                {"task": "Official Launch", "duration": 15, "dependencies": [0, 1, 2]}
            ]
        }
    ],
    "milestones": [
        {
            "milestone": "Technical Integration Complete",
            "date": (current_date + timedelta(days=75)).strftime("%Y-%m-%d"),
            "criteria": "Successful end-to-end data flow between systems"
        },
        {
            "milestone": "Joint Platform MVP",
            "date": (current_date + timedelta(days=180)).strftime("%Y-%m-%d"),
            "criteria": "Functional product with core features implemented"
        },
        {
            "milestone": "First Customer Onboarding",
            "date": (current_date + timedelta(days=210)).strftime("%Y-%m-%d"),
            "criteria": "Successful onboarding of pilot customer group"
        },
        {
            "milestone": "Full Market Release",
            "date": (current_date + timedelta(days=285)).strftime("%Y-%m-%d"),
            "criteria": "Product available to all target market segments"
        }
    ],
    "risks": [
        {
            "risk": "Integration Complexity",
            "likelihood": "Medium",
            "impact": "High",
            "mitigation": "Detailed technical discovery phase and architecture planning"
        },
        {
            "risk": "Regulatory Compliance",
            "likelihood": "High",
            "impact": "High",
            "mitigation": "Early involvement of compliance teams from both organizations"
        },
        {
            "risk": "Market Timing",
            "likelihood": "Medium",
            "impact": "Medium",
            "mitigation": "Phased rollout approach with continuous feedback loops"
        },
        {
            "risk": "Resource Constraints",
            "likelihood": "Medium",
            "impact": "Medium",
            "mitigation": "Detailed resource planning and regular capacity reviews"
        }
    ]
}

# Partnership criteria
PARTNERSHIP_CRITERIA = {
    "financialFactors": [
        {"factor": "Revenue Stability", "weight": 15, "description": "Consistent or growing revenue over the past 3 years"},
        {"factor": "Profit Margin", "weight": 20, "description": "Net profit as a percentage of revenue"},
        {"factor": "Market Share", "weight": 10, "description": "Company's share of the target market"}
    ],
    "technicalFactors": [
        {"factor": "API Maturity", "weight": 25, "description": "Robustness and documentation of existing APIs"},
        {"factor": "Data Security", "weight": 20, "description": "Compliance with industry standards and regulations"},
        {"factor": "Scalability", "weight": 15, "description": "Ability to handle increasing transaction volumes"}
    ],
    "strategicFactors": [
        {"factor": "Market Alignment", "weight": 20, "description": "Overlap with our target market segments"},
        {"factor": "Product Complementarity", "weight": 25, "description": "How well their offerings enhance our product suite"},
        {"factor": "Cultural Fit", "weight": 15, "description": "Alignment of corporate values and working styles"}
    ],
    "riskFactors": [
        {"factor": "Regulatory Compliance", "weight": 25, "description": "History of compliance with relevant regulations"},
        {"factor": "Reputation", "weight": 20, "description": "Brand perception and public sentiment"},
        {"factor": "Financial Stability", "weight": 30, "description": "Risk of financial distress or bankruptcy"}
    ]
}

# Create company names
def generate_company_name():
    prefixes = ["Alpha", "Beta", "Nova", "Vertex", "Quantum", "Omni", "Eco", "Tech", "Global", "Next", 
                "Future", "Smart", "Digi", "Meta", "Cyber", "Green", "Prime", "Spark", "Core", "Peak"]
    suffixes = ["Corp", "Inc", "Systems", "Group", "Solutions", "Dynamics", "Partners", "Innovations", 
                "Technologies", "Enterprises", "Networks", "Industries", "Capital", "Ventures", "Alliance"]
    return f"{random.choice(prefixes)}{random.choice(suffixes)}"

# Function to generate synthetic companies
def generate_companies(n=50):
    companies = []
    
    for i in range(n):
        company = {
            "id": i + 1,
            "name": generate_company_name(),
            "industry": random.choice(INDUSTRIES),
            "business_model": random.choice(BUSINESS_MODELS),
            "company_size": random.choice(COMPANY_SIZES),
            "region": random.choice(REGIONS),
            
            # Financial metrics
            "annual_revenue_millions": round(np.random.lognormal(mean=4, sigma=1), 2),
            "profit_margin": min(max(np.random.normal(0.15, 0.08), -0.15), 0.40),  # Cap between -15% and 40%
            "revenue_growth_rate": min(max(np.random.normal(0.10, 0.15), -0.20), 0.60),  # Cap between -20% and 60%
            "debt_to_equity": round(max(np.random.lognormal(mean=0, sigma=0.7), 0), 2),
            
            # Employee metrics
            "employee_count": int(np.random.lognormal(mean=5, sigma=1.5)),
            "avg_employee_age": round(np.random.normal(35, 5), 1),
            "avg_salary_thousands": round(np.random.normal(70, 20), 1),
            
            # Retirement-specific metrics
            "existing_retirement_plan": random.random() > 0.3,  # 70% have a plan
            "retirement_contribution_match_pct": round(random.uniform(0, 6), 1) if random.random() > 0.3 else 0,
            "plan_participation_rate": random.uniform(0.4, 0.95) if random.random() > 0.3 else 0,
            
            # ESG factors
            "esg_score": round(random.uniform(30, 95), 1),
            "esg_commitment": random.choice(ESG_LEVELS),
            
            # Risk factors (1-10 scale, where 10 is highest risk)
            "financial_stability_risk": random.randint(1, 10),
            "regulatory_risk": random.randint(1, 10),
            "market_volatility_risk": random.randint(1, 10),
        }
        
        # Derive company size from employee count
        if company["employee_count"] < 100:
            company["company_size"] = "Small"
        elif company["employee_count"] < 1000:
            company["company_size"] = "Medium"
        elif company["employee_count"] < 10000:
            company["company_size"] = "Large"
        else:
            company["company_size"] = "Enterprise"
        
        # Add time since founding
        company["years_in_business"] = random.randint(1, 50)
        founding_date = datetime.now() - timedelta(days=365 * company["years_in_business"])
        company["founding_year"] = founding_date.year
        
        # Add tech adoption metrics
        company["tech_adoption_score"] = round(min(max(np.random.normal(7, 2), 1), 10), 1)  # 1-10 scale
        
        # Calculate synthetic Partnership Fit Score based on multiple factors
        fit_score = 0
        
        # Financial stability contributes positively
        fit_score += (100 - (company["financial_stability_risk"] * 5)) / 100  # Lower risk is better
        
        # Employee metrics impact
        fit_score += min(company["employee_count"] / 5000, 1) * 0.5  # More employees = better, cap at 5000
        
        # Existing retirement plan reduces immediate potential
        fit_score -= 0.3 if company["existing_retirement_plan"] else 0
        
        # Growth rate impacts positively
        fit_score += min(max(company["revenue_growth_rate"], 0), 0.3) * 2  # Higher growth is better
        
        # Industry specific adjustments
        industry_factors = {
            "Technology": 0.2,
            "Healthcare": 0.15,
            "Finance": -0.1,  # Likely has competing options
            "Manufacturing": 0.05,
            "Retail": 0,
            "Energy": 0.1,
            "Telecommunications": 0.05,
            "Consumer Goods": 0,
            "Transportation": 0.05,
            "Real Estate": 0.1
        }
        fit_score += industry_factors.get(company["industry"], 0)
        
        # Adjust for company maturity
        if company["years_in_business"] < 5:
            fit_score -= 0.2  # Very young companies are higher risk
        elif company["years_in_business"] > 30:
            fit_score += 0.1  # Established companies are more stable
        
        # Final score between 0-10, normalized
        company["partnership_fit_score"] = round(max(min((fit_score + 1) * 5, 10), 1), 1)  # Scale to 1-10
        
        # Add company to our list
        companies.append(company)
    
    return pd.DataFrame(companies)

# Generate 50 companies
df = generate_companies(50)

# Calculate potential integration score based on feature combinations
def calculate_integration_scores(df):
    # Add an integration complexity score (1-10 scale, where 10 is most complex)
    df['integration_complexity'] = np.round(np.random.uniform(1, 10, size=len(df)), 1)
    
    # Calculate potential annual value based on employee count and avg salary
    df['potential_annual_value'] = df['employee_count'] * df['avg_salary_thousands'] * 0.05  # Assuming 5% contribution
    
    # Estimate implementation timeline in months
    df['estimated_implementation_months'] = np.round(
        df['integration_complexity'] * 0.5 +  # More complex = longer timeline
        (4 - np.log10(df['employee_count'] + 1)) +  # Larger companies take longer, but with diminishing effect
        (1 if df['existing_retirement_plan'] else 0)  # Existing plans need migration time
    )
    
    # Cap implementation time reasonably
    df['estimated_implementation_months'] = np.clip(df['estimated_implementation_months'], 1, 12)
    
    # Calculate a cost-benefit ratio
    df['cost_benefit_ratio'] = np.round(
        df['potential_annual_value'] / (df['integration_complexity'] * df['estimated_implementation_months']), 2
    )
    
    return df

# Calculate integration metrics
df = calculate_integration_scores(df)

# Create a function for company clustering
def cluster_companies(df, n_clusters=4):
    # Select features for clustering
    cluster_features = [
        'annual_revenue_millions', 'profit_margin', 'revenue_growth_rate',
        'employee_count', 'plan_participation_rate', 'esg_score',
        'financial_stability_risk', 'partnership_fit_score',
        'integration_complexity', 'cost_benefit_ratio'
    ]
    
    # Scale the data
    scaler = StandardScaler()
    X = scaler.fit_transform(df[cluster_features].fillna(0))
    
    # Determine optimal number of clusters using silhouette score
    silhouette_scores = []
    K = range(2, 10)
    for k in K:
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(X)
        silhouette_scores.append(silhouette_score(X, kmeans.labels_))
    
    optimal_k = K[np.argmax(silhouette_scores)]
    print(f"Optimal number of clusters: {optimal_k}")
    
    # Use the optimal number of clusters
    kmeans = KMeans(n_clusters=optimal_k, random_state=42)
    df['cluster'] = kmeans.fit_predict(X)
    
    # Run PCA for visualization
    pca = PCA(n_components=2)
    principal_components = pca.fit_transform(X)
    df['pc1'] = principal_components[:, 0]
    df['pc2'] = principal_components[:, 1]
    
    # Get cluster centers in original feature space
    cluster_centers = scaler.inverse_transform(kmeans.cluster_centers_)
    cluster_profiles = pd.DataFrame(
        cluster_centers, 
        columns=cluster_features
    )
    
    # Name the clusters based on their characteristics
    cluster_names = []
    for i, profile in cluster_profiles.iterrows():
        if profile['annual_revenue_millions'] > df['annual_revenue_millions'].median() and profile['employee_count'] > df['employee_count'].median():
            size = "Large"
        else:
            size = "Small-Medium"
            
        if profile['partnership_fit_score'] > df['partnership_fit_score'].median():
            fit = "High-Fit"
        else:
            fit = "Low-Fit"
            
        if profile['integration_complexity'] > df['integration_complexity'].median():
            complexity = "Complex"
        else:
            complexity = "Simple"
            
        cluster_names.append(f"{size} {fit} {complexity}")
    
    # Map cluster numbers to descriptive names
    cluster_map = {i: name for i, name in enumerate(cluster_names)}
    df['cluster_name'] = df['cluster'].map(cluster_map)
    
    return df, cluster_profiles, cluster_map

# Perform clustering
df, cluster_profiles, cluster_map = cluster_companies(df)

# Create a function for visualizations
def create_visualizations(df, cluster_profiles, cluster_map):
    visualizations = {}
    
    # 1. Cluster visualization using PCA
    fig = px.scatter(
        df, x='pc1', y='pc2', color='cluster_name',
        hover_name='name', 
        hover_data=['industry', 'annual_revenue_millions', 'employee_count', 'partnership_fit_score'],
        title='Company Clusters (PCA Visualization)',
        color_discrete_sequence=px.colors.qualitative.G10
    )
    fig.update_layout(height=600, width=900)
    visualizations['cluster_pca'] = fig
    
    # 2. Partnership Fit vs Integration Complexity scatter plot
    fig = px.scatter(
        df, x='partnership_fit_score', y='integration_complexity',
        color='cluster_name', size='potential_annual_value',
        hover_name='name', hover_data=['industry', 'employee_count'],
        title='Partnership Fit vs Integration Complexity',
        color_discrete_sequence=px.colors.qualitative.G10,
        labels={'partnership_fit_score': 'Partnership Fit Score (higher is better)',
                'integration_complexity': 'Integration Complexity (lower is better)'}
    )
    
    # Add quadrant lines and labels
    fig.add_shape(type="line", x0=5.5, y0=0, x1=5.5, y1=10, line=dict(dash="dash", color="gray"))
    fig.add_shape(type="line", x0=0, y0=5.5, x1=10, y1=5.5, line=dict(dash="dash", color="gray"))
    
    fig.add_annotation(x=8, y=2.5, text="High Fit, Low Complexity<br>(Primary Targets)", showarrow=False)
    fig.add_annotation(x=8, y=8, text="High Fit, High Complexity<br>(Strategic Targets)", showarrow=False)
    fig.add_annotation(x=3, y=8, text="Low Fit, High Complexity<br>(Avoid)", showarrow=False)
    fig.add_annotation(x=3, y=2.5, text="Low Fit, Low Complexity<br>(Consider if Needed)", showarrow=False)
    
    fig.update_layout(height=600, width=900)
    visualizations['fit_vs_complexity'] = fig
    
    # 3. Industry distribution by cluster
    industry_cluster = pd.crosstab(df['industry'], df['cluster_name'])
    fig = px.bar(
        industry_cluster, title='Industry Distribution by Cluster',
        color_discrete_sequence=px.colors.qualitative.G10
    )
    fig.update_layout(height=500, width=900)
    visualizations['industry_by_cluster'] = fig
    
    # 4. Cost-Benefit Analysis
    fig = px.scatter(
        df, x='estimated_implementation_months', y='potential_annual_value',
        color='cluster_name', size='cost_benefit_ratio', size_max=25,
        hover_name='name', hover_data=['industry', 'integration_complexity'],
        title='Implementation Timeline vs Potential Value',
        color_discrete_sequence=px.colors.qualitative.G10,
        labels={'estimated_implementation_months': 'Estimated Implementation (months)',
                'potential_annual_value': 'Potential Annual Value ($K)'}
    )
    fig.update_layout(height=600, width=900)
    visualizations['implementation_timeline'] = fig
    
    # 5. Business Model Distribution
    bm_counts = df['business_model'].value_counts().reset_index()
    bm_counts.columns = ['Business Model', 'Count']
    
    fig = px.pie(
        bm_counts, values='Count', names='Business Model',
        title='Distribution of Business Models',
        color_discrete_sequence=px.colors.qualitative.Pastel
    )
    fig.update_layout(height=500, width=700)
    visualizations['business_model_dist'] = fig
    
    # 6. Radar chart for cluster profiles
    features_for_radar = [
        'annual_revenue_millions', 'profit_margin', 'revenue_growth_rate',
        'partnership_fit_score', 'integration_complexity', 'cost_benefit_ratio'
    ]
    
    # Normalize the features for radar chart
    radar_df = cluster_profiles[features_for_radar].copy()
    for col in radar_df.columns:
        radar_df[col] = (radar_df[col] - radar_df[col].min()) / (radar_df[col].max() - radar_df[col].min())
    
    fig = go.Figure()
    
    for i in range(len(radar_df)):
        fig.add_trace(go.Scatterpolar(
            r=radar_df.iloc[i].values.tolist() + [radar_df.iloc[i].values.tolist()[0]],
            theta=features_for_radar + [features_for_radar[0]],
            fill='toself',
            name=cluster_map[i]
        ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 1]
            )
        ),
        title="Cluster Profiles (Normalized)",
        height=600, width=800
    )
    visualizations['cluster_radar'] = fig
    
    # 7. Partnership Fit Score by Industry and Size
    fig = px.box(
        df, x='industry', y='partnership_fit_score', color='company_size',
        title='Partnership Fit Score by Industry and Company Size',
        color_discrete_sequence=px.colors.qualitative.Pastel
    )
    fig.update_layout(height=500, width=900, xaxis={'tickangle': 45})
    visualizations['fit_by_industry'] = fig
    
    # 8. Heatmap of key metrics by cluster
    pivot_df = df.pivot_table(
        index='cluster_name',
        values=['partnership_fit_score', 'integration_complexity', 'potential_annual_value', 
                'cost_benefit_ratio', 'employee_count', 'annual_revenue_millions'],
        aggfunc='mean'
    ).round(2)
    
    fig = px.imshow(
        pivot_df.T,
        text_auto=True,
        aspect="auto",
        title="Average Metrics by Cluster",
        color_continuous_scale='Viridis'
    )
    fig.update_layout(height=500, width=900)
    visualizations['cluster_heatmap'] = fig
    
    # 9. Risk profile visualization
    risk_cols = ['financial_stability_risk', 'regulatory_risk', 'market_volatility_risk']
    risk_df = df.groupby('cluster_name')[risk_cols].mean().reset_index()
    
    fig = px.bar(
        risk_df, x='cluster_name', y=risk_cols,
        title='Risk Profile by Cluster',
        barmode='group',
        color_discrete_sequence=px.colors.qualitative.Safe
    )
    fig.update_layout(height=500, width=900)
    visualizations['risk_profile'] = fig
    
    return visualizations

# Generate visualizations
visualizations = create_visualizations(df, cluster_profiles, cluster_map)

# Define partnership evaluation criteria
def define_partnership_criteria():
    criteria = {
        "Financial Stability": {
            "description": "Evaluates the company's financial health and growth prospects",
            "metrics": ["annual_revenue_millions", "profit_margin", "revenue_growth_rate", "financial_stability_risk"],
            "weight": 0.25
        },
        "Integration Feasibility": {
            "description": "Assesses how easy it would be to integrate with existing systems",
            "metrics": ["integration_complexity", "estimated_implementation_months", "existing_retirement_plan"],
            "weight": 0.20
        },
        "Market Opportunity": {
            "description": "Measures the potential value of the partnership",
            "metrics": ["employee_count", "potential_annual_value", "cost_benefit_ratio"],
            "weight": 0.30
        },
        "Strategic Alignment": {
            "description": "Evaluates alignment with strategic goals like ESG commitments",
            "metrics": ["esg_score", "partnership_fit_score", "tech_adoption_score"],
            "weight": 0.15
        },
        "Risk Profile": {
            "description": "Assesses overall risk factors",
            "metrics": ["regulatory_risk", "market_volatility_risk", "years_in_business"],
            "weight": 0.10
        }
    }
    return criteria

# Calculate partnership scores based on criteria
def calculate_partnership_scores(df, criteria):
    # Create normalized versions of each metric
    df_normalized = df.copy()
    
    # Identify metrics where lower is better
    lower_better = [
        'financial_stability_risk', 'regulatory_risk', 'market_volatility_risk',
        'integration_complexity', 'estimated_implementation_months'
    ]
    
    # Normalize all metrics to 0-1 scale
    for category in criteria.values():
        for metric in category['metrics']:
            if metric in df.columns:
                if metric in lower_better:
                    # For metrics where lower is better, invert the scale
                    df_normalized[f'norm_{metric}'] = 1 - (df[metric] - df[metric].min()) / (df[metric].max() - df[metric].min())
                else:
                    # For metrics where higher is better
                    df_normalized[f'norm_{metric}'] = (df[metric] - df[metric].min()) / (df[metric].max() - df[metric].min())
    
    # Calculate category scores
    for category, details in criteria.items():
        metrics = [f'norm_{m}' for m in details['metrics'] if f'norm_{m}' in df_normalized.columns]
        if metrics:
            df_normalized[f'{category}_score'] = df_normalized[metrics].mean(axis=1)
    
    # Calculate overall partnership score
    overall_score = 0
    for category, details in criteria.items():
        if f'{category}_score' in df_normalized.columns:
            overall_score += df_normalized[f'{category}_score'] * details['weight']
    
    df_normalized['overall_partnership_score'] = overall_score
    
    # Scale to 0-100 for easier interpretation
    df_normalized['overall_partnership_score'] = df_normalized['overall_partnership_score'] * 100
    
    return df_normalized

# Define criteria and calculate scores
criteria = define_partnership_criteria()
df_scored = calculate_partnership_scores(df, criteria)

# Create partnership tiers
def create_partnership_tiers(df_scored):
    # Create tiers based on overall score
    conditions = [
        (df_scored['overall_partnership_score'] >= 75),
        (df_scored['overall_partnership_score'] >= 60) & (df_scored['overall_partnership_score'] < 75),
        (df_scored['overall_partnership_score'] >= 45) & (df_scored['overall_partnership_score'] < 60),
        (df_scored['overall_partnership_score'] < 45)
    ]
    
    tier_labels = ['Tier 1 (Priority)', 'Tier 2 (High Potential)', 'Tier 3 (Consider)', 'Tier 4 (Not Recommended)']
    
    df_scored['partnership_tier'] = np.select(conditions, tier_labels)
    
    return df_scored

# Create partnership tiers
df_final = create_partnership_tiers(df_scored)

# Create final visualizations
def create_final_visualizations(df_final, criteria):
    final_visualizations = {}
    
    # 1. Overall partnership score distribution
    fig = px.histogram(
        df_final, x='overall_partnership_score',
        color='partnership_tier',
        marginal='box',
        title='Overall Partnership Score Distribution',
        labels={'overall_partnership_score': 'Overall Partnership Score (0-100)'},
        color_discrete_sequence=px.colors.qualitative.Set1
    )
    fig.update_layout(height=500, width=900)
    final_visualizations['score_distribution'] = fig
    
    # 2. Top 10 companies based on overall score
    top_10 = df_final.nlargest(10, 'overall_partnership_score')
    
    fig = px.bar(
        top_10, y='name', x='overall_partnership_score',
        color='partnership_tier',
        labels={'overall_partnership_score': 'Overall Partnership Score (0-100)', 'name': 'Company'},
        title='Top 10 Companies by Partnership Score',
        text='overall_partnership_score',
        orientation='h',
        color_discrete_sequence=px.colors.qualitative.Set1
    )
    fig.update_traces(texttemplate='%{text:.1f}', textposition='outside')
    fig.update_layout(height=500, width=900, yaxis={'categoryorder':'total ascending'})
    final_visualizations['top_10_companies'] = fig
    
    # 3. Category scores by partnership tier
    category_cols = [f'{category}_score' for category in criteria.keys()]
    category_names = list(criteria.keys())
    
    tier_data = df_final.groupby('partnership_tier')[category_cols].mean().reset_index()
    tier_data_melted = pd.melt(tier_data, id_vars=['partnership_tier'], 
                               value_vars=category_cols, 
                               var_name='Category', value_name='Score')
    tier_data_melted['Category'] = tier_data_melted['Category'].str.replace('_score', '')
    
    fig = px.bar(
        tier_data_melted, x='Category', y='Score',
        color='partnership_tier', barmode='group',
        title='Average Category Scores by Partnership Tier',
        color_discrete_sequence=px.colors.qualitative.Set1
    )
    fig.update_layout(height=500, width=900)
    final_visualizations['category_by_tier'] = fig
    
    # 4. Parallel coordinates plot for multi-dimensional analysis
    dimensions = ['annual_revenue_millions', 'employee_count', 'partnership_fit_score', 
                  'integration_complexity', 'potential_annual_value', 'overall_partnership_score']
    
    fig = px.parallel_coordinates(
        df_final, dimensions=dimensions,
        color='partnership_tier',
        labels={dim: dim.replace('_', ' ').title() for dim in dimensions},
        color_discrete_sequence=px.colors.qualitative.Set1,
        title='Multi-dimensional Analysis of Partnership Factors'
    )
    fig.update_layout(height=600, width=1000)
    final_visualizations['parallel_coordinates'] = fig
    
    # 5. Category score radar chart for tier comparison
    fig = go.Figure()
    
    for tier in tier_data['partnership_tier']:
        tier_scores = tier_data[tier_data['partnership_tier'] == tier]
        fig.add_trace(go.Scatterpolar(
            r=tier_scores[category_cols].values.tolist()[0] + [tier_scores[category_cols].values.tolist()[0][0]],
            theta=category_names + [category_names[0]],
            fill='toself',
            name=tier
        ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 1]
            )
        ),
        title="Partnership Category Scores by Tier",
        height=600, width=800
    )
    final_visualizations['tier_radar'] = fig
    
    # 6. Industry distribution by tier
    industry_tier = pd.crosstab(df_final['industry'], df_final['partnership_tier'])
    industry_tier_pct = industry_tier.div(industry_tier.sum(axis=1), axis=0)
    
    fig = px.bar(
        industry_tier_pct, title='Partnership Tier Distribution by Industry',
        color_discrete_sequence=px.colors.qualitative.Set1,
        barmode='stack'
    )
    fig.update_layout(height=500, width=900, xaxis={'tickangle': 45})
    final_visualizations['industry_tier_dist'] = fig
    
    return final_visualizations

# Create final visualizations
final_visualizations = create_final_visualizations(df_final, criteria)

# Create overall recommendation function
def create_recommendations(df_final):
    # Calculate stats for recommendations
    tier_counts = df_final['partnership_tier'].value_counts()
    tier_stats = df_final.groupby('partnership_tier').agg({
        'overall_partnership_score': 'mean',
        'potential_annual_value': 'sum',
        'integration_complexity': 'mean',
        'estimated_implementation_months': 'mean'
    }).round(2)
    
    top_tier_industries = df_final[df_final['partnership_tier'] == 'Tier 1 (Priority)']['industry'].value_counts().head(3)
    
    recommendations = {
        'tier_counts': tier_counts,
        'tier_stats': tier_stats,
        'top_tier_industries': top_tier_industries,
        'top_10_companies': df_final.nlargest(10, 'overall_partnership_score')[['name', 'industry', 'overall_partnership_score', 'partnership_tier', 'potential_annual_value']],
        'implementation_plan': {
            'phase1': df_final[df_final['partnership_tier'] == 'Tier 1 (Priority)'].nlargest(5, 'overall_partnership_score')[['name', 'estimated_implementation_months']],
            'phase2': df_final[df_final['partnership_tier'] == 'Tier 2 (High Potential)'].nlargest(5, 'overall_partnership_score')[['name', 'estimated_implementation_months']]
        }
    }
    
    return recommendations

# Generate recommendations
recommendations = create_recommendations(df_final)

# Print summary statistics
print("\n=== PARTNERSHIP ANALYSIS SUMMARY ===")
print(f"Total companies analyzed: {len(df_final)}")
print(f"Companies by partnership tier:\n{recommendations['tier_counts']}")
print("\nTop 10 partnership candidates:")
print(recommendations['top_10_companies'][['name', 'industry', 'overall_partnership_score', 'partnership_tier']])
print("\nIndustry distribution in Tier 1:")
print(recommendations['top_tier_industries'])

# Export visualizations to HTML (in a real scenario)
# for name, fig in {**visualizations, **final_visualizations}.items():
#     fig.write_html(f"{name}.html")

# Export final dataframe to CSV (in a real scenario)
# df_final.to_csv("partnership_analysis_results.csv", index=False)

# Display top 5 recommended partners
print("\n=== TOP 5 RECOMMENDED PARTNERSHIP CANDIDATES ===")
top_5 = df_final.nlargest(5, 'overall_partnership_score')
for i, (_, company) in enumerate(top_5.iterrows(), 1):
    print(f"{i}. {company['name']} ({company['industry']})")
    print(f"   Score: {company['overall_partnership_score']:.1f}/100, Potential Value: ${company['potential_annual_value']:.1f}K")
    print(f"   Implementation: {company['estimated_implementation_months']:.1f} months, Complexity: {company['integration_complexity']:.1f}/10")
    
# Create a summary of our recommendations
def create_executive_summary(df_final, recommendations, criteria):
    """
    Create an executive summary of the partnership analysis
    """
    summary = {}
    
    # Overall portfolio statistics
    summary['portfolio_stats'] = {
        'total_companies': len(df_final),
        'total_potential_value': df_final['potential_annual_value'].sum(),
        'avg_implementation_time': df_final['estimated_implementation_months'].mean(),
        'tier_distribution': df_final['partnership_tier'].value_counts().to_dict()
    }
    
    # Recommendations by tier
    summary['tier_recommendations'] = {}
    for tier in df_final['partnership_tier'].unique():
        tier_df = df_final[df_final['partnership_tier'] == tier]
        top_industries = tier_df['industry'].value_counts().head(3).to_dict()
        avg_metrics = tier_df[['overall_partnership_score', 'potential_annual_value', 
                              'integration_complexity', 'estimated_implementation_months']].mean().to_dict()
        
        summary['tier_recommendations'][tier] = {
            'count': len(tier_df),
            'top_industries': top_industries,
            'avg_metrics': avg_metrics,
            'sample_companies': tier_df.nlargest(3, 'overall_partnership_score')['name'].tolist()
        }
    
    # Implementation strategy
    phase1_companies = df_final[df_final['partnership_tier'] == 'Tier 1 (Priority)'].nlargest(5, 'overall_partnership_score')
    phase2_companies = df_final[df_final['partnership_tier'] == 'Tier 2 (High Potential)'].nlargest(5, 'overall_partnership_score')
    
    summary['implementation_strategy'] = {
        'phase1': {
            'companies': phase1_companies['name'].tolist(),
            'avg_timeline': phase1_companies['estimated_implementation_months'].mean(),
            'total_value': phase1_companies['potential_annual_value'].sum()
        },
        'phase2': {
            'companies': phase2_companies['name'].tolist(),
            'avg_timeline': phase2_companies['estimated_implementation_months'].mean(),
            'total_value': phase2_companies['potential_annual_value'].sum()
        }
    }
    
    # Key insights
    high_value_easy = df_final[(df_final['potential_annual_value'] > df_final['potential_annual_value'].quantile(0.75)) & 
                             (df_final['integration_complexity'] < df_final['integration_complexity'].quantile(0.25))]
    
    fast_growing = df_final[df_final['revenue_growth_rate'] > df_final['revenue_growth_rate'].quantile(0.9)]
    
    summary['key_insights'] = {
        'high_value_easy_integration': high_value_easy['name'].tolist(),
        'fast_growing_companies': fast_growing['name'].tolist(),
        'best_industries': df_final.groupby('industry')['overall_partnership_score'].mean().nlargest(3).to_dict(),
        'worst_industries': df_final.groupby('industry')['overall_partnership_score'].mean().nsmallest(3).to_dict()
    }
    
    return summary

# Generate the executive summary
executive_summary = create_executive_summary(df_final, recommendations, criteria)

# Function to create a visual partnership roadmap
def create_partnership_roadmap(df_final):
    """
    Create a visual partnership implementation roadmap
    """
    # Select top companies from each tier for implementation phases
    phase1 = df_final[df_final['partnership_tier'] == 'Tier 1 (Priority)'].nlargest(5, 'overall_partnership_score')
    phase2 = df_final[df_final['partnership_tier'] == 'Tier 2 (High Potential)'].nlargest(5, 'overall_partnership_score')
    phase3 = df_final[df_final['partnership_tier'] == 'Tier 3 (Consider)'].nlargest(3, 'overall_partnership_score')
    
    # Create a dataframe for the Gantt chart
    roadmap_data = []
    
    # Calculate cumulative timeline for each phase
    current_month = 0
    
    # Phase 1 companies
    for i, (_, company) in enumerate(phase1.iterrows()):
        # Stagger start times with some overlap
        start_month = max(0, current_month - 1) if i > 0 else 0
        duration = company['estimated_implementation_months']
        
        roadmap_data.append({
            'Task': company['name'],
            'Start': start_month,
            'Finish': start_month + duration,
            'Phase': 'Phase 1',
            'Value': company['potential_annual_value'],
            'Industry': company['industry']
        })
        
        current_month = start_month + duration - 1  # Allow for some overlap
    
    # Phase 2 companies (start after phase 1 is 50% complete)
    phase2_start = current_month - 2
    for i, (_, company) in enumerate(phase2.iterrows()):
        start_month = phase2_start + i * 0.5  # Stagger starts
        duration = company['estimated_implementation_months']
        
        roadmap_data.append({
            'Task': company['name'],
            'Start': start_month,
            'Finish': start_month + duration,
            'Phase': 'Phase 2',
            'Value': company['potential_annual_value'],
            'Industry': company['industry']
        })
    
    # Phase 3 companies (start after phase 2 is 50% complete)
    phase3_start = phase2_start + len(phase2) * 0.5 + 2
    for i, (_, company) in enumerate(phase3.iterrows()):
        start_month = phase3_start + i
        duration = company['estimated_implementation_months']
        
        roadmap_data.append({
            'Task': company['name'],
            'Start': start_month,
            'Finish': start_month + duration,
            'Phase': 'Phase 3',
            'Value': company['potential_annual_value'],
            'Industry': company['industry']
        })
    
    roadmap_df = pd.DataFrame(roadmap_data)
    
    # Create a Gantt chart
    fig = px.timeline(
        roadmap_df, x_start='Start', x_end='Finish', y='Task', color='Phase',
        hover_data=['Industry', 'Value'],
        labels={'Task': 'Company', 'Start': 'Start (months)', 'Finish': 'Finish (months)'},
        title='Partnership Implementation Roadmap',
        color_discrete_sequence=px.colors.qualitative.Set1
    )
    
    # Add value as text
    for i, row in enumerate(roadmap_df.itertuples()):
        fig.add_annotation(
            x=(row.Start + row.Finish) / 2,
            y=i,
            text=f"${row.Value:.0f}K",
            showarrow=False,
            font=dict(color='black', size=10)
        )
    
    fig.update_yaxes(autorange="reversed")
    fig.update_layout(height=600, width=900)
    
    return fig, roadmap_df

# Create the roadmap
roadmap_fig, roadmap_df = create_partnership_roadmap(df_final)

# Create industry-specific targeting strategy
def create_industry_targeting_strategy(df_final):
    """
    Create an industry-specific targeting strategy
    """
    # Analyze performance by industry
    industry_analysis = df_final.groupby('industry').agg({
        'overall_partnership_score': 'mean',
        'potential_annual_value': 'mean',
        'integration_complexity': 'mean',
        'estimated_implementation_months': 'mean',
        'partnership_tier': lambda x: (x == 'Tier 1 (Priority)').mean() * 100  # % in Tier 1
    }).round(2)
    
    industry_analysis.columns = [
        'Avg Score', 'Avg Value ($K)', 'Avg Complexity', 
        'Avg Implementation (months)', '% in Tier 1'
    ]
    
    # Sort by average score
    industry_analysis = industry_analysis.sort_values('Avg Score', ascending=False)
    
    # Create a visualization of industry targeting priority
    fig = make_subplots(rows=1, cols=2, specs=[[{"type": "bar"}, {"type": "scatter"}]],
                        subplot_titles=('Industry Average Scores', 'Value vs. Complexity by Industry'))
    
    # Add bar chart
    fig.add_trace(
        go.Bar(
            x=industry_analysis.index,
            y=industry_analysis['Avg Score'],
            marker_color=px.colors.qualitative.Set1[0],
            name='Average Score'
        ),
        row=1, col=1
    )
    
    # Add scatter plot
    fig.add_trace(
        go.Scatter(
            x=industry_analysis['Avg Complexity'],
            y=industry_analysis['Avg Value ($K)'],
            mode='markers+text',
            marker=dict(
                size=industry_analysis['% in Tier 1'] / 2 + 10,
                color=px.colors.qualitative.Set1[1],
                opacity=0.7
            ),
            text=industry_analysis.index,
            textposition="top center",
            name='Industries'
        ),
        row=1, col=2
    )
    
    fig.update_layout(
        title_text='Industry Targeting Strategy',
        height=500, width=1100
    )
    
    fig.update_xaxes(title_text='', tickangle=45, row=1, col=1)
    fig.update_xaxes(title_text='Integration Complexity', row=1, col=2)
    fig.update_yaxes(title_text='Average Score', row=1, col=1)
    fig.update_yaxes(title_text='Average Value ($K)', row=1, col=2)
    
    return fig, industry_analysis

# Create industry targeting strategy
industry_strategy_fig, industry_analysis = create_industry_targeting_strategy(df_final)

# Create a company database with all results
company_database = df_final[[
    'name', 'industry', 'business_model', 'company_size', 'region',
    'annual_revenue_millions', 'employee_count', 'profit_margin',
    'overall_partnership_score', 'partnership_tier', 'potential_annual_value',
    'integration_complexity', 'estimated_implementation_months',
    'cost_benefit_ratio', 'esg_score'
]].sort_values('overall_partnership_score', ascending=False)

# Create a function to summarize ESG performance
def analyze_esg_performance(df_final):
    """
    Analyze ESG performance of potential partners
    """
    # ESG score statistics by partnership tier
    esg_by_tier = df_final.groupby('partnership_tier')['esg_score'].agg(['mean', 'min', 'max']).round(1)
    
    # ESG score by industry
    esg_by_industry = df_final.groupby('industry')['esg_score'].mean().sort_values(ascending=False).round(1)
    
    # Companies with high ESG scores
    high_esg_companies = df_final[df_final['esg_score'] > df_final['esg_score'].quantile(0.75)]
    
    # Create a visualization
    fig = make_subplots(rows=1, cols=2, specs=[[{"type": "box"}, {"type": "bar"}]],
                        subplot_titles=('ESG Score Distribution by Tier', 'Average ESG Score by Industry'))
    
    # Add box plot
    fig.add_trace(
        go.Box(
            y=df_final['esg_score'],
            x=df_final['partnership_tier'],
            name='ESG Scores',
            marker_color=px.colors.qualitative.Set2[0]
        ),
        row=1, col=1
    )
    
    # Add bar chart
    fig.add_trace(
        go.Bar(
            x=esg_by_industry.index,
            y=esg_by_industry.values,
            marker_color=px.colors.qualitative.Set2[1],
            name='Industry ESG'
        ),
        row=1, col=2
    )
    
    fig.update_layout(
        title_text='ESG Performance Analysis',
        height=500, width=1000
    )
    
    fig.update_xaxes(title_text='', tickangle=45, row=1, col=1)
    fig.update_xaxes(title_text='Industry', tickangle=45, row=1, col=2)
    fig.update_yaxes(title_text='ESG Score', row=1, col=1)
    fig.update_yaxes(title_text='Average ESG Score', row=1, col=2)
    
    return fig, high_esg_companies, esg_by_tier

# Analyze ESG performance
esg_fig, high_esg_companies, esg_by_tier = analyze_esg_performance(df_final)

# Function to simulate running the analysis
def run_retirement_fund_partnership_analysis():
    print("\n==== RETIREMENT FUND PARTNERSHIP ANALYSIS ====")
    print("\nAnalyzing 50 potential partner companies...")
    print("Generating company features and metrics...")
    print("Clustering companies based on key characteristics...")
    print("Calculating partnership scores and integration metrics...")
    print("Creating partnership tiers and recommendations...")
    print("Generating visualizations and executive summary...")
    print("\nAnalysis complete! Results below:\n")
    
    # Print key statistics
    print(f"Total companies analyzed: {len(df_final)}")
    print("\nPartnership Tier Distribution:")
    for tier, count in recommendations['tier_counts'].items():
        print(f"  {tier}: {count} companies")
    
    print("\nTop 5 Partnership Candidates:")
    for i, (_, company) in enumerate(df_final.nlargest(5, 'overall_partnership_score').iterrows(), 1):
        print(f"  {i}. {company['name']} ({company['industry']})")
        print(f"     Score: {company['overall_partnership_score']:.1f}/100, Value: ${company['potential_annual_value']:.1f}K")
        print(f"     Impl. Time: {company['estimated_implementation_months']:.1f} months, Complexity: {company['integration_complexity']:.1f}/10")
    
    print("\nKey Industry Insights:")
    top_industries = df_final.groupby('industry')['overall_partnership_score'].mean().nlargest(3)
    for industry, score in top_industries.items():
        print(f"  {industry}: Avg Score {score:.1f}/100")
    
    print("\nImplementation Roadmap Summary:")
    print(f"  Phase 1: {len(roadmap_df[roadmap_df['Phase'] == 'Phase 1'])} companies, " +
          f"${roadmap_df[roadmap_df['Phase'] == 'Phase 1']['Value'].sum():.0f}K potential value")
    print(f"  Phase 2: {len(roadmap_df[roadmap_df['Phase'] == 'Phase 2'])} companies, " +
          f"${roadmap_df[roadmap_df['Phase'] == 'Phase 2']['Value'].sum():.0f}K potential value")
    print(f"  Phase 3: {len(roadmap_df[roadmap_df['Phase'] == 'Phase 3'])} companies, " +
          f"${roadmap_df[roadmap_df['Phase'] == 'Phase 3']['Value'].sum():.0f}K potential value")
    
    print("\nESG Performance Summary:")
    print(f"  Average ESG Score: {df_final['esg_score'].mean():.1f}/100")
    print(f"  Tier 1 Companies Avg ESG: {esg_by_tier.loc['Tier 1 (Priority)', 'mean']:.1f}/100")
    print(f"  Top ESG Industry: {esg_by_industry.index[0]} ({esg_by_industry.iloc[0]:.1f}/100)")
    
    print("\nNext Steps:")
    print("  1. Review the detailed company profiles for top candidates")
    print("  2. Begin outreach to Phase 1 companies")
    print("  3. Develop customized pitch materials for each industry sector")
    print("  4. Prepare integration plans for high-priority partnerships")
    print("  5. Conduct quarterly reviews to refine the partnership strategy")

# Run the analysis
run_retirement_fund_partnership_analysis()

# Save all visualizations and data for further reference
# In a real scenario, you would save these files to disk
# visualizations_to_save = {
#     **visualizations,
#     **final_visualizations,
#     'roadmap': roadmap_fig,
#     'industry_strategy': industry_strategy_fig,
#     'esg_analysis': esg_fig
# }

# Function to evaluate a new potential partner company
def evaluate_new_partner(company_data):
    """
    Evaluate a new potential partner based on our existing model
    """
    # Convert the company data to a DataFrame
    new_company = pd.DataFrame([company_data])
    
    # Calculate integration metrics
    new_company = calculate_integration_scores(new_company)
    
    # Calculate partnership scores
    new_company = calculate_partnership_scores(new_company, criteria)
    
    # Assign partnership tier
    new_company = create_partnership_tiers(new_company)
    
    # Compare to existing companies
    percentile = (df_final['overall_partnership_score'] < new_company['overall_partnership_score'].iloc[0]).mean() * 100
    
    result = {
        'company_name': company_data['name'],
        'overall_score': new_company['overall_partnership_score'].iloc[0],
        'partnership_tier': new_company['partnership_tier'].iloc[0],
        'percentile': percentile,
        'recommendation': 'Pursue' if percentile > 70 else 'Consider' if percentile > 40 else 'Low Priority'
    }
    
    return result, new_company

# Example of how to evaluate a new company
new_company_data = {
    'name': 'QuantumVentures',
    'industry': 'Technology',
    'business_model': 'Software as a Service (SaaS)',
    'company_size': 'Medium',
    'region': 'North America',
    'annual_revenue_millions': 75.8,
    'profit_margin': 0.22,
    'revenue_growth_rate': 0.35,
    'debt_to_equity': 0.8,
    'employee_count': 450,
    'avg_employee_age': 33.5,
    'avg_salary_thousands': 95.0,
    'existing_retirement_plan': False,
    'retirement_contribution_match_pct': 0,
    'plan_participation_rate': 0,
    'esg_score': 82.5,
    'esg_commitment': 'High',
    'financial_stability_risk': 3,
    'regulatory_risk': 4,
    'market_volatility_risk': 5,
    'years_in_business': 7,
    'founding_year': 2018,
    'tech_adoption_score': 9.5
}

# Evaluate the new company
new_company_result, new_company_df = evaluate_new_partner(new_company_data)

def analyze_company(company_data):
    """
    Analyze a potential partner company based on provided metrics
    and return analysis results including partnership score, tier, etc.
    """
    try:
        # Validate required fields
        required_fields = ["name", "industry", "revenue", "employees", "profitMargin", "esgScore"]
        for field in required_fields:
            if field not in company_data:
                raise ValueError(f"Missing required field: {field}")
            
        # Calculate partnership score based on various weighted factors
        revenue_score = min(100, company_data["revenue"] / 2000000)
        employee_score = min(100, company_data["employees"] / 10)
        profit_score = min(100, company_data["profitMargin"] * 5)
        esg_score = company_data["esgScore"]
        
        # Calculate weighted partnership score
        partnership_score = (
            revenue_score * 0.25 +
            employee_score * 0.15 +
            profit_score * 0.30 +
            esg_score * 0.30
        )
        partnership_score = round(partnership_score)
        
        # Determine tier based on score
        tier = "C"
        if partnership_score >= 85:
            tier = "A"
        elif partnership_score >= 70:
            tier = "B"
            
        # Calculate other metrics
        integration_complexity_score = random.randint(50, 100)
        if integration_complexity_score >= 80:
            integration_complexity = "Low"
        elif integration_complexity_score >= 60:
            integration_complexity = "Medium"
        else:
            integration_complexity = "High"
            
        # Implementation time in months (based on company size and complexity)
        implementation_time = round(5 + (company_data["employees"] / 1000) * 10 + (100 - integration_complexity_score) / 10)
        
        # Potential value score
        potential_value = round(
            partnership_score * 0.4 +
            (100 - implementation_time * 2) * 0.3 +
            integration_complexity_score * 0.3
        )
        
        # Generate recommendations based on analysis
        recommendations = []
        if tier == "A":
            recommendations.append("High-priority partnership candidate with strong strategic alignment")
            recommendations.append("Expedited integration path recommended")
        elif tier == "B":
            recommendations.append("Solid partnership opportunity with good potential")
            recommendations.append("Standard integration approach with focused milestone tracking")
        else:
            recommendations.append("Potential partnership with notable challenges")
            recommendations.append("Phased approach with clear evaluation points recommended")
            
        if integration_complexity == "High":
            recommendations.append("Consider dedicated integration team due to complexity")
        
        if implementation_time > 12:
            recommendations.append("Extended implementation timeline requires robust project governance")
            
        # Return analysis result
        return {
            "partnershipScore": partnership_score,
            "tier": tier,
            "integrationComplexity": integration_complexity,
            "implementationTime": implementation_time,
            "potentialValue": potential_value,
            "recommendations": recommendations
        }
        
    except Exception as e:
        raise Exception(f"Error analyzing company data: {str(e)}")

# Function to get the list of companies
def get_companies():
    return COMPANIES

# Function to get industry analysis data
def get_industry_analysis():
    return INDUSTRY_ANALYSIS

# Function to get roadmap data
def get_roadmap():
    return ROADMAP

# Function to get partnership criteria
def get_partnership_criteria():
    return PARTNERSHIP_CRITERIA