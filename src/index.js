import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import BrowserRouter as Router and Route from react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
