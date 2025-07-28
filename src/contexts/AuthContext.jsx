import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import scoutApi from '@/services/scoutApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userData = await scoutApi.getUserData();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Falha ao buscar dados do usuário, limpando token:", error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    loadUserFromToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};