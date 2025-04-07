import React, { useState, useEffect } from 'react';
import './IdeaGenerator.css';

const IdeaGenerator = ({ onClose }) => {
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'results'
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [formData, setFormData] = useState({
    focus: '',
    primaryIndustry: '',
    subIndustry: '',
    technology: '',
    businessModel: '',
    targetAudience: '',
    marketSegment: ''
  });
  
  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  // Mock data for dropdowns
  const focusOptions = [
    'I am trying to solve a problem',
    'I want to create a new product',
    'I want to improve an existing service',
    'I want to disrupt an industry'
  ];

  const industryOptions = [
    'Agriculture',
    'Technology',
    'Healthcare',
    'Education',
    'Finance',
    'Retail'
  ];

  const subIndustryOptions = {
    'Agriculture': ['Agri-Business', 'Farming', 'Livestock', 'Crop Production'],
    'Technology': ['Software', 'Hardware', 'AI', 'Blockchain'],
    'Healthcare': ['Telemedicine', 'Medical Devices', 'Health IT', 'Pharmaceuticals'],
    'Education': ['EdTech', 'K-12', 'Higher Education', 'Professional Training'],
    'Finance': ['Banking', 'Insurance', 'Investment', 'Fintech'],
    'Retail': ['E-commerce', 'Brick and Mortar', 'Omnichannel', 'Direct-to-Consumer']
  };

  const technologyOptions = [
    'Machine Learning (ML)',
    'Artificial Intelligence (AI)',
    'Internet of Things (IoT)',
    'Blockchain',
    'Cloud Computing',
    'Mobile Apps'
  ];

  const businessModelOptions = [
    'Direct-to-Consumer (D2C)',
    'Business-to-Business (B2B)',
    'Software-as-a-Service (SaaS)',
    'Marketplace',
    'Subscription',
    'Freemium'
  ];

  const audienceOptions = [
    'Farmers',
    'Small Businesses',
    'Enterprises',
    'Consumers',
    'Students',
    'Healthcare Providers'
  ];

  const marketSegmentOptions = [
    'Regional',
    'National',
    'Global',
    'Urban',
    'Rural',
    'Suburban'
  ];

  // Mock problems based on agriculture industry
  const mockProblems = [
    'Inefficient Crop Monitoring',
    'Water Waste and Inefficient Irrigation',
    'Lack of Livestock Management and Tracking',
    'Degraded Soil Health and Fertility',
    'Crop Damage Due to Pests and Diseases'
  ];

  // Mock generated ideas
  const mockIdeas = [
    {
      title: 'AI-Driven Data Collection & Sensor Integration',
      description: 'Use IoT sensors in soil, weather stations, and crop health monitoring systems to collect real-time data on soil moisture, temperature, and weather conditions.',
      details: [
        'AI systems analyze this data to provide predictive insights on irrigation needs, ensuring that water is used efficiently based on actual crop requirements.',
        'Smart Irrigation Systems with AI Algorithms',
        'Implement AI-powered precision irrigation systems that automatically adjust water flow based on real-time data and predictions, reducing overwatering or underwatering.',
        'Machine learning algorithms learn from historical data and environmental factors to optimize irrigation schedules and water distribution in real-time.'
      ]
    },
    {
      title: 'AI-Based Crop and Soil Health Monitoring',
      description: 'Use computer vision and AI image recognition to monitor crop and soil health through drones or satellite imagery.',
      details: [
        'AI algorithms process images and environmental data to identify early signs of plant stress, enabling timely and accurate interventions in irrigation, fertilization, and pest control.',
        'Predictive Analytics for Weather & Water Use Optimization',
        'Integrate AI-powered predictive models to forecast weather patterns and water requirements for different crops and growth stages.',
        'These models can help farmers plan irrigation schedules days or weeks in advance, optimizing water usage while maintaining crop health.'
      ]
    }
  ];

  // Check if form is complete enough to generate ideas
  const isFormValid = () => {
    return formData.primaryIndustry && formData.technology;
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Reset sub-industry if primary industry changes
    if (field === 'primaryIndustry') {
      setFormData(prev => ({
        ...prev,
        subIndustry: ''
      }));
    }
  };

  const handleGenerateIdeas = (count) => {
    if (!isFormValid()) return;
    
    setIsGeneratingIdeas(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setGeneratedIdeas(mockIdeas);
      setCurrentView('results');
      setIsGeneratingIdeas(false);
    }, 1500);
  };

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };
  
  const handleBackToForm = () => {
    setCurrentView('form');
    setSelectedProblem(null);
  };
  
  const handleBackToProblems = () => {
    setSelectedProblem(null);
  };

  // Render just the form inputs without the ideas panel
  const renderFormInputs = () => (
    <div className="form-left-panel">
      <h3>What is your primary focus of your start-up idea?</h3>
      <div className="select-container">
        <select 
          value={formData.focus}
          onChange={(e) => handleInputChange('focus', e.target.value)}
        >
          <option value="" disabled>Select focus</option>
          {focusOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <span className="select-arrow">▼</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <h3>Select the Primary Industry</h3>
          <div className="select-container">
            <select 
              value={formData.primaryIndustry}
              onChange={(e) => handleInputChange('primaryIndustry', e.target.value)}
            >
              <option value="" disabled>Select industry</option>
              {industryOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>

        <div className="form-group">
          <h3>Select the Sub-Industry</h3>
          <div className="select-container">
            <select 
              value={formData.subIndustry}
              onChange={(e) => handleInputChange('subIndustry', e.target.value)}
              disabled={!formData.primaryIndustry}
            >
              <option value="" disabled>Select sub-industry</option>
              {formData.primaryIndustry && subIndustryOptions[formData.primaryIndustry]?.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <h3>Select the Technology</h3>
          <div className="select-container">
            <select 
              value={formData.technology}
              onChange={(e) => handleInputChange('technology', e.target.value)}
            >
              <option value="" disabled>Select technology</option>
              {technologyOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>

        <div className="form-group">
          <h3>Select the Business Model</h3>
          <div className="select-container">
            <select 
              value={formData.businessModel}
              onChange={(e) => handleInputChange('businessModel', e.target.value)}
            >
              <option value="" disabled>Select business model</option>
              {businessModelOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <h3>Select the Target Audience</h3>
          <div className="select-container">
            <select 
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            >
              <option value="" disabled>Select target audience</option>
              {audienceOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>

        <div className="form-group">
          <h3>Select the Market Segment</h3>
          <div className="select-container">
            <select 
              value={formData.marketSegment}
              onChange={(e) => handleInputChange('marketSegment', e.target.value)}
            >
              <option value="" disabled>Select market segment</option>
              {marketSegmentOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>
        </div>
      </div>

      <div className="generate-buttons">
        <button 
          className={`generate-btn ${!isFormValid() ? 'disabled' : ''}`}
          onClick={() => handleGenerateIdeas(5)}
          disabled={!isFormValid() || isGeneratingIdeas}
        >
          {isGeneratingIdeas ? 'Generating...' : 'Generate 5 Ideas'}
        </button>
        <button 
          className={`generate-btn ${!isFormValid() ? 'disabled' : ''}`}
          onClick={() => handleGenerateIdeas(10)}
          disabled={!isFormValid() || isGeneratingIdeas}
        >
          {isGeneratingIdeas ? 'Generating...' : 'Generate 10 Ideas'}
        </button>
      </div>
    </div>
  );
  
  // Render the complete form with empty state for initial view
  const renderForm = () => (
    <div className="idea-generator-form">
      {renderFormInputs()}
      <div className="ideas-panel">
        <div className="empty-state">
          <div className="empty-state-icon">💡</div>
          <h3>Ready to Generate Ideas</h3>
          <p>Fill out the form on the left and click "Generate Ideas" to see innovative solutions tailored to your needs.</p>
          <p>Our AI will analyze your inputs and suggest creative ideas to help you solve problems in your industry.</p>
        </div>
      </div>
    </div>
  );

  const renderProblemSelection = () => (
    <div className="problem-selection">
      <h2 className="selection-title">Choose one idea to generate a solution</h2>
      <div className="problems-list">
        {mockProblems.map((problem, index) => (
          <div 
            key={index} 
            className={`problem-item ${selectedProblem === problem ? 'selected' : ''}`}
            onClick={() => handleProblemSelect(problem)}
          >
            <div className="star-icon">★</div>
            <div className="problem-text">{problem}</div>
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="back-button" onClick={handleBackToForm}>
          <span className="button-text">Back</span>
        </button>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="idea-generator-results">
      <div className="results-container">
        <div className="form-panel">
          <div className="idea-generator-form">
            {renderFormInputs()}
          </div>
        </div>
        <div className="ideas-panel">
          {selectedProblem ? renderIdeasDetail() : renderProblemSelection()}
        </div>
      </div>
    </div>
  );

  const renderIdeasDetail = () => (
    <div className="idea-details">
      <h2>{selectedProblem}</h2>
      {generatedIdeas.map((idea, index) => (
        <div key={index} className="idea-detail-card">
          <h3>{index + 1}. {idea.title}</h3>
          <p>{idea.description}</p>
          <ul>
            {idea.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="action-buttons">
        <button className="back-button" onClick={handleBackToProblems}>
          Back to Problems
        </button>
      </div>
    </div>
  );

  return (
    <div className="idea-generator-container">
      <div className="idea-generator-header">
        <div className="logo">YAIIA <span className="logo-dot">•</span></div>
        <div className="auth-buttons">
          <button className="login-btn-hero">Login</button>
          <button className="signup-btn-hero">Signup</button>
        </div>
      </div>

      {currentView === 'form' ? (
        renderForm()
      ) : renderResults()}
    </div>
  );
};

export default IdeaGenerator;