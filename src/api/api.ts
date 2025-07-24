import axios from 'axios';

export const API_URL = 'http://localhost:3000';

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const login = (email: string, password: string) =>
  axios.post(`${API_URL}/auth/login`, { email, password });

export const register = (email: string, password: string, name: string) =>
  axios.post(`${API_URL}/auth/register`, { email, password , name});


export const fetchCars = () => {
  return axios.get(`${API_URL}/cars`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createCar = (car: { make: string; model: string; year: number }) => {
  return axios.post(`${API_URL}/cars`, car, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

