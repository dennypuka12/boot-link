import React from 'react';
import './App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/login/${username}`)
    .then(response => response.json())
    .then(data => { 
        onLogin(data.name, data.role);
    })
    .catch(error => {
        console.error('Error:', error)
    })
  };

  return (
    <div className='App'>
      <form className='spacing' onSubmit={handleSubmit}>
        <label >
          Username: 
          <input  type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label  >
          Password:
          <input  type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <input  type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
