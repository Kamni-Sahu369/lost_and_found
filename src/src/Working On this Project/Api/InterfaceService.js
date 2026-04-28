import axios from "axios";
const Api_Url = process.env.REACT_APP_API_URL || "https://lost-and-found-co21.onrender.com";

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

// >>>>>>>>>.approval payment>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const get_allPayments = async () => {
  const response = await axios.get("https://lost-and-found-co21.onrender.com/payments/");
  return response.data;
}