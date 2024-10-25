import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for using the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };