import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Birth Records
  registerBirth: (data) => axios.post(`${API_BASE_URL}/births`, data),
  getBirths: () => axios.get(`${API_BASE_URL}/births`),
  getBirthStats: () => axios.get(`${API_BASE_URL}/births/stats`),
  
  // Reports
  getMonthlyReports: () => axios.get(`${API_BASE_URL}/reports/monthly`),
  getSummaryStats: () => axios.get(`${API_BASE_URL}/reports/summary`)
};