import axios from 'axios';

const logout = async (setAuthState, navigation) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/logout', {}, { withCredentials: true });
    if (response.data.success) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
      });
      navigation.navigate('Accueil'); 
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logout;
