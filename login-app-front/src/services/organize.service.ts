import axios from '../utils/axiosConfig';

const API_URL = "http://localhost:3000";

export const getOrganizeList = () => {
  return axios.get(`${API_URL}/getOrganizes`);
};
