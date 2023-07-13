import {useEffect, useState} from "react";
import axios from 'axios';
import Table from "./Table.js"
import SearchBar from "./searchBar.js";
import "./App.css"


function App() {

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get('api/employees');
        setData(res.data.slice(0,5));
      }catch (error){
        console.error("Error fetching data from server:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  }

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch}  />
      <Table data={searchResults.length > 0 ? searchResults : data} />
    </div>
  );
}

export default App;
