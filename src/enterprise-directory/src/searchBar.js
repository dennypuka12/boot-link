import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState(["Employees", "Locations", "Job Role", "Salaries", "Phone numbers"]);

  const fetchData = async (category) => {
    try {
      let result;
      if (category === "Employees") {
        result = await axios.get(`/api/employees/${searchTerm}`);
      } else if (category === "Locations") {
        result = await axios.get(`/api/employees/location/${searchTerm}`);
      }
        else if (category === "Salaries") {
        result = await axios.get(`/api/employees/salary/${searchTerm}`);
      } else if (category === "Phone numbers") {
        result = await axios.get(`/api/employees/phoneNumber/${searchTerm}`);
      }
      props.onSearch(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data from server: ", error);
    }
  };



  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {searchTerm && 
          searchCategories.map((category, index) => (
            <div key={index} onClick={() => fetchData(category)}>
              {"Search for " + searchTerm + " in " + category}
            </div>
          ))
        }
      </div>
      {/* <div>
        {searchResults?.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div> */}
    </div>
  );
}

export default SearchBar;
