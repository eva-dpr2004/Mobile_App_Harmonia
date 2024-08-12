import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  });

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/auth', { withCredentials: true });
        if (response.data.error) {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            token: null,
          });
        } else {
          await AsyncStorage.setItem('authToken', response.data.token);
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: response.data,
            token: response.data.token,
          });
        }
      } catch {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          token: null,
        });
      }
    };

    fetchAuthState();
  }, []);

  return [authState, setAuthState];
};

export default useAuth;
