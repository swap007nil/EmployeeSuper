import axios from 'axios';

const BASE = 'http://localhost:5000/api';
const API = axios.create({ baseURL: `${BASE}/visitors` });
const AUTH = axios.create({ baseURL: `${BASE}/auth` });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// expired or missing token: log out
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export const login = (username, password) => AUTH.post('/login', { username, password });

export const getVisitors = (search = '') => API.get('/', { params: { search } });
export const getVisitor = (id) => API.get(`/${id}`);
export const createVisitor = (data) => API.post('/', data);
export const updateVisitor = (id, data) => API.put(`/${id}`, data);
export const deleteVisitor = (id) => API.delete(`/${id}`);