import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [category, setCategory] = useState("employees");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (category, searchQuery) => {
    let apiPath;
    switch (category) {
      case "employees":
        apiPath = `/api/employees/${searchQuery}`;
        break;
      case "locations":
        apiPath = `/api/employees/location/${searchQuery}`;
        break;
      case "job_roles":
        apiPath = `/api/employees/role/${searchQuery}`;
        break;
      case "salaries":
        apiPath = `/api/employees/salary/${searchQuery}`;
        break;
      default:
        apiPath = `/api/employees`;
    }

    const response = await axios.get(apiPath);
    let responseData = response.data;
    
    // If responseData isn't already an array, wrap it in one
    if (!Array.isArray(responseData)) {
      responseData = [responseData];
    }
    
    onSearch(responseData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(category, searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="employees">Employees</option>
        <option value="locations">Locations</option>
        <option value="job_roles">Job Roles</option>
        <option value="salaries">Salaries</option>
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SearchBar;
