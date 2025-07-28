import axios from "axios";
const Api_Url = "http://localhost:8000";

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token"); // adjust key if different
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const post_claimItem = async (data) => {
  const response = await axios.post(`${Api_Url}/claim/`, data, getAuthHeaders());
  return response.data;
};

export const get_claimItem = async () => {
  const response = await axios.get(`${Api_Url}/claim/`, getAuthHeaders());
  return response.data;
};

export const get_claimItemuser = async (id) => {
  const response = await axios.get(`${Api_Url}/claim/${id}`, getAuthHeaders());
  return response.data;
};


