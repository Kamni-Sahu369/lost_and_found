import axios from "axios";
const Api_Url = "http://localhost:8000";

// Registration post
export const Mp_reg_post = async (data) => {
  alert("data");
  const response = await axios.post(`${Api_Url}/PracticeList/`, data);
  return response.data;
};

export const otp_varify= async (data) => {
  alert("data");
  const response = await axios.post(`${Api_Url}/varify_otp/`, data);
  return response.data;
};

export const getPracticeList = async () => {
  const response = await axios.get(`${Api_Url}/PracticeList/`);
  return response.data;
};

export const updateUserPassword = async (id, data) => {
  const response = await axios.patch(`${Api_Url}/PracticeList/${id}/`, data);
  return response.data;
};

// Lost Item post
export const Lost_post = async (values) => {
  const formData = new FormData();

  // Convert date and time to string
  formData.append("name", values.name);
  formData.append("category", values.category);
  formData.append("date", values.date.format("YYYY-MM-DD"));
  formData.append("time", values.time.format("HH:mm:ss"));
  formData.append("location", values.location);
  formData.append("description", values.description || "");
  formData.append("item_image", values.item_image); // 👈 Image file

  const response = await axios.post(
    `${Api_Url}/LostItemCreateView/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const Lost_get = async () => {
  try {
    const response = await axios.get(`${Api_Url}/LostItemCreateView/`);
    return response.data; // returns an array of lost items
  } catch (error) {
    console.error("Error fetching lost items:", error);
    throw error;
  }
};

// Found Item post
export const Found_post = async (values) => {
  const formData = new FormData();

  // Convert date and time to string format
  formData.append("name", values.name);
  formData.append("category", values.category);
  formData.append("date", values.date.format("YYYY-MM-DD"));
  formData.append("time", values.time.format("HH:mm:ss"));
  formData.append("location", values.location);
  formData.append("description", values.description || "");
  formData.append("item_image", values.item_image); // Image file

  const response = await axios.post(
    `${Api_Url}/FoundItemCreateView/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const Found_get = async () => {
  try {
    const response = await axios.get(`${Api_Url}/FoundItemCreateView/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lost items:", error);
    throw error;
  }
};

// create profile
export const updateProfile = async (values, profileId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Please login first");
  }

  const formData = new FormData();

  formData.append("alternate_phone", values.alternatePhone || "");
  formData.append("gender", values.gender || "");
  formData.append("dob", values.dob ? values.dob.format("YYYY-MM-DD") : "");
  formData.append("address", values.address || "");
  formData.append("city", values.city || "");
  formData.append("state", values.state || "");
  formData.append("pincode", values.pincode || "");
  formData.append("user_type", values.userType || "regular");
  formData.append("agreement", values.agreement ? "true" : "false");

  if (values.profilePic && values.profilePic.fileList.length > 0) {
    formData.append("profile_pic", values.profilePic.file.originFileObj);
  }

  const response = await axios.post(`${Api_Url}/CraeteProfile/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // <== Add this!
    },
  });
  return response.data;
};

export const updateProfile_get = async () => {
  try {
    const response = await axios.get(`${Api_Url}/CraeteProfile/`);
    return response.data; // returns an array of lost items
  } catch (error) {
    console.error("Error fetching lost items:", error);
    throw error;
  }
};

// Feedback
export const Feedback_post = async (data) => {
  const response = await axios.post(`${Api_Url}/FeedbackView/`, data);
  return response.data;
};
