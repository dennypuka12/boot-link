import {useEffect, useState} from "react";
import axios from 'axios';
import Table from "./Table.js"
import SearchBar from "./searchBar.js";
import "./App.css"


function App() {

  const [data, setData] = useState([]);
<<<<<<< HEAD
  const [searchResults, setSearchResults] = useState([])
  const [seen, setSeen] = useState(false)
=======
  const [searchResults, setSearchResults] = useState(null)
>>>>>>> 8134dda4b14c8c6bda347001978e47c93ab90a5a

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

  function tooglePop(){
    setSeen(!seen);
  }

  const handleSearch = (results) => {
    setSearchResults([results]);
  }

  const tableData = searchResults ? searchResults : data;

  return (
    <div className="App">
      <button onClick={tooglePop}>Login</button>
      {seen? <Login toggle={togglePop}/> :null} 
      <SearchBar onSearch={handleSearch}  />
      <Table data={tableData} />
    </div>
  );
}

export default App;
