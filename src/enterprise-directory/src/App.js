import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import { HomePage } from './HomePage';
import  AnalyticsPage  from './analytics';
import  Login from './login';
import 'simpledotcss';

const App = () => {
  return (
    <Router>
      <Header />
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </Router>
  );
};

export default App;
