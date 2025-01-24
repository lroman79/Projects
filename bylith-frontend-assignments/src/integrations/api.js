import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fedtest.bylith.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = ''
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const apiRequest = async ({ method, url, data = {}, params = {} }) => {
  try {
    const config = {
      method, // The HTTP method (GET, POST, etc.)
      url, // The URL endpoint
      data, // The data to be sent (for POST/PUT)
      params, // Query parameters (for GET)
    }

    const response = await apiClient(config)
    return response.data
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error)
    throw error
  }
}

export default apiRequest
