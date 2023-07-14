import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const Header = () => {
  return (
    <nav>
      <div className='nav-link'>
        <Link to="/" style={{color: 'white', textDecoration:'none'}} className='button-link'>Home</Link>
        <Link to="/analytics" style={{color: 'white', textDecoration:'none'}} className='button-link'>Analytics</Link>
        <Link to="/login" style={{color: 'white', textDecoration:'none'}} className='button-link'>Login</Link>
      </div>    
    </nav>
  );
};

export default Header;