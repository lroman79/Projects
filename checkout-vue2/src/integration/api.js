import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://du-mock-checkout-7d42d0a76fbf.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = "C4D5C577E9914C4B9C9BF46DF9914A28";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiRequest = async ({ method, url, data = {}, params = {} }) => {
  try {
    const config = {
      method, // The HTTP method (GET, POST, etc.)
      url, // The URL endpoint
      data, // The data to be sent (for POST/PUT)
      params, // Query parameters (for GET)
    };

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error;
  }
};

export default apiRequest;
