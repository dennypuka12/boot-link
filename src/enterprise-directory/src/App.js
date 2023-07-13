import {useEffect, useState} from "react";
import axios from 'axios';
import Table from "./Table.js"
import SearchBar from "./searchBar.js";
import "./App.css"



function App() {

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get('api/employees');
        setData(res.data.slice(0,5));
      }catch (error){
        console.error("Error fetching data from server:", error);
      }

    };
  if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  const onSearch= (searchTerm)=>{
     console.log('search', searchTerm);
  }

  return (
    <div className="App">
      
    {<SearchBar/>}  
    {<Table data = {data}/>}
    </div>
  );
}

export default App;
