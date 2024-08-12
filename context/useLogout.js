import axios from 'axios';

const logout = async (setAuthState) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
    if (response.data.success) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
      });
      window.location.href = '/';
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logout;
