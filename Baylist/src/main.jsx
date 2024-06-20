import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import NavBar from "./components/NavBar";

import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <React.StrictMode>
      <div className="app-wrapper">
        <NavBar />
        <App />
      </div>
   
  </React.StrictMode>
  </Router>
)
