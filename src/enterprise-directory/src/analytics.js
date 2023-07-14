import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsPage = () => {
  const [plotUrl, setPlotUrl] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch the unique job roles and locations when the component is mounted
    const fetchDropdownOptions = async () => {
      const jobRolesResponse = await axios.get('/api/jobRoles');
      const locationsResponse = await axios.get('/api/locations');
      setJobRoles(jobRolesResponse.data);
      setLocations(locationsResponse.data);
    };

    fetchDropdownOptions();
  }, []);

  const handleAnalyze = async () => {
    // Call the backend API with selected job role and location
    const response = await axios.get(`http://localhost:8000/api/predict/salary?jobRole=${jobRole}&workLocation=${location}`);
    setResults(response.data);
  
    // Update the URL of the plot (add a timestamp to force reload the image)
    setPlotUrl(`http://localhost:8000/api/get_plot`);
  };

  return (
    <div>
      <h1>Salary Analysis</h1>
      <select value={jobRole} onChange={e => setJobRole(e.target.value)}>
        <option value="">Select a Job Role</option>
        {jobRoles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      <select value={location} onChange={e => setLocation(e.target.value)}>
        <option value="">Select a Location</option>
        {locations.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <button onClick={handleAnalyze}>Analyze</button>

      {results && (
        <div>
          <h2>Results</h2>
          <p>Predicted Salary: ${results.predicted_salary.toFixed(2)}</p>
          <p>Mean Absolute Error (MAE): ${results.mae.toFixed(2)}</p>
          <p>Mean Squared Error (MSE): ${results.mse.toFixed(2)}</p>
          <p>
            These metrics give us an idea about the accuracy of our predictive model. 
            Lower values for these metrics indicate a more accurate model.
          </p>
          {plotUrl && <img src={plotUrl} alt="Scatter plot" />}
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
