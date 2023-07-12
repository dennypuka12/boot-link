import {useState, useEffect} from "react";
import users from "./fakeEmployees.json";


function App() {
  const [data, setData] = useState(users);

  const loadUsersData = () => {
     fetch('./fakeEmployees.json')
    .then((response) => setData(response.data))
    .catch((err) => console.log(err));
  };

  
  useEffect(() => {
    loadUsersData();
  }, []);

  
  console.log("data", data);

  return (
    <div className="App">
      <h2>Hello</h2>
    </div>
  );
}

export default App;
