import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
// import { AuthProvider } from './context/AuthContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <Router> {/* Wrap the App component with Router */}
        <App />
      </Router>
    
  </StrictMode>,
);
