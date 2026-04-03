import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './useAuthStore';

const useAuth = () => {
  const { user, token, login, logout, register } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return { user, token, isAuthenticated, login, logout, register };
};

export default useAuth;
