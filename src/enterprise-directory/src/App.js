import {useState} from "react"

export default function App() {
  const [query, setQuery] = useState("");
  
  return (
    <div className="App">
      <label>Search</label>
      <input type ="text" onChange={e => setQuery(e.target.value)} />
    </div>
  );
}

