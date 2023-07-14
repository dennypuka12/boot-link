import React, { useState } from 'react';
import SearchBar from './searchBar';
import Table  from './Table';
import Login from './login';

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [userRole, setUserRole] = useState(null); // Add this line
  
  const handleSearch = (newData) => {
    setData(newData);
  };

  const handleQuery = (newQuery) => {
    setQuery(newQuery);
  };
  
  const handleLogin = (name, role) => {  // Add this function
    setUserRole(role);
  }

  return (
    <div className="App">
      <header className="App-header">
        Employee Directory
      </header>
      <header className="login">
        <div className='spacing'>
          <Login className='center' onLogin={handleLogin} />
          <SearchBar className='center' onSearch={handleSearch} onQuery={handleQuery} />
          <Table data={Array.isArray(data)  ?   data : []} query={query} role={userRole} />
        </div>
      </header>
    </div>
  );
};

export default HomePage;