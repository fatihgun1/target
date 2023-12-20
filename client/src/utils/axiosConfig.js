import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`, // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user ? user.token : null}`, // Example authorization header
    },
    timeout: 2000, // Set request timeout in milliseconds
   // withCredentials: true, // Enable sending cookies for cross-origin requests (if needed)
});

axiosInstance.interceptors.response.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            config.headers.Authorization = `Bearer ${user ? user.token : null}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
  );
  
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add common request logic here, e.g., token refresh
      return config;
    },
    (error) => Promise.reject(error)
  );