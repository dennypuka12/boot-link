import React, { useState } from 'react';
import axios from 'axios';

const AnalyticsPage = () => {
  const [jobRole, setJobRole] = useState('Company-wide');
  const [location, setLocation] = useState('Company-wide');
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    // Call the backend API with selected job role and location
    const response = await axios.post('/api/analyze', { jobRole, location });
    setResults(response.data);
  };

  return (
    <div className='App'>
      <h1 className='App-header'>Salary Analysis</h1>
      <select className='center-analytics' value={jobRole} onChange={e => setJobRole(e.target.value)}>
        <option value="Company-wide">Company-wide</option>
        {/* Add more options as needed */}
      </select>

      <select className='center-analytics' value={location} onChange={e => setLocation(e.target.value)}>
        <option value="Company-wide">Company-wide</option>
        {/* Add more options as needed */}
      </select>

      <button className='center-analytics' onClick={handleAnalyze}>Analyze</button>

      {results && (
        <div>
          <h2>Results</h2>
          <p>Mean Absolute Error (MAE): {results.mae}</p>
          <p>Mean Squared Error (MSE): {results.mse}</p>
          <p>Root Mean Squared Error (RMSE): {results.rmse}</p>
          <p>
            These metrics give us an idea about the accuracy of our predictive model. 
            Lower values for these metrics indicate a more accurate model.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
