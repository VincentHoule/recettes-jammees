import axios from "axios";


let axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_LARAVEL_API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})


axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(function (request) {
    return request;
  }, function (error) {
    if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.removeItem('token');
        window.location.href = "/";
    }
    return Promise.reject(error);
  });


export default axiosInstance;
