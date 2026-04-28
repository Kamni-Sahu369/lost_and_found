import axios from "axios";
// const Api_Url = "https://lost-and-found-co21.onrender.com";
const Api_Url = process.env.REACT_APP_API_URL || "https://lost-and-found-co21.onrender.com";

// Registration post
export const Mp_reg_post = async (data) => {
  // alert("data");
  const response = await axios.post(`${Api_Url}/PracticeList/`, data);
  return response.data;
};

// otp varification
export const otp_varify= async (data) => {
  // alert("data");
  const response = await axios.post(`${Api_Url}/varify_otp/`, data);
  return response.data;
};

export const Mp_reg_delete = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${Api_Url}/PracticeList/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
};
export const Mp_reg_update = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${Api_Url}/PracticeList/${id}/`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
};


// Registration data get
export const getPracticeListAll = async () => {
  const token = localStorage.getItem("access_token")
  const response = await axios.get(`${Api_Url}/PracticeList/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getPracticeList = async (id) => {
  const token = localStorage.getItem("access_token")
  const response = await axios.get(`${Api_Url}/PracticeList/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getPracticeListadmin = async (id) => {
  const token = localStorage.getItem("access_token")
  const response = await axios.get(`${Api_Url}/PracticeList/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserPassword = async (id, data) => {
  const response = await axios.patch(`${Api_Url}/PracticeList/${id}/`, data);
  return response.data;
};


// ..............................................................................
// Lost Item post
export const Lost_post = async (values) => {
  const formData = new FormData();
  const user_id = localStorage.getItem("user_id");
  const token=localStorage.getItem('access_token')

  // Convert date and time to string
  formData.append("name", values.name);
  formData.append("category", values.category);
  formData.append("date", values.date.format("YYYY-MM-DD"));
  formData.append("time", values.time.format("HH:mm:ss"));
  formData.append("location", values.location);
  formData.append("description", values.description || "");
  formData.append("item_image", values.item_image); // 👈 Image fil
  formData.append("user",user_id)
  const response = await axios.post(
    `${Api_Url}/LostItemCreateView/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    }
  );

  return response.data;
};

// Lost Item Get
export const Lost_get = async (id) => {
  const user_id = localStorage.getItem("user_id");
  try {
    let response;
    if (id) {
      response = await axios.get(`${Api_Url}/LostItemCreateView/${id}/`);
    } else {
      response = await axios.get(`${Api_Url}/LostItemCreateView/?user=${user_id}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching lost item(s):", error);
    throw error;
  }
};
// Lost Item PATCH (update)
export const Lost_update = async (id, values) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.patch(
    `${Api_Url}/LostItemCreateView/${id}/`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Lost Item DELETE
export const Lost_delete = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.delete(
    `${Api_Url}/LostItemCreateView/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
// ...............................................................................
// Found Item post
export const Found_post = async (values) => {
  const formData = new FormData();
  const user_id = localStorage.getItem("user_id");
  const token=localStorage.getItem('access_token')

  // Convert date and time to string format
  formData.append("name", values.name);
  formData.append("category", values.category);
  formData.append("date", values.date.format("YYYY-MM-DD"));
  formData.append("time", values.time.format("HH:mm:ss"));
  formData.append("location", values.location);
  formData.append("description", values.description || "");
  formData.append("item_image", values.item_image); // Image file
  formData.append("user",user_id)
  const response = await axios.post(
    `${Api_Url}/FoundItemCreateView/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`

      },
    }
  );

  return response.data;
};


// found item get 
export const Found_get = async (id) => {
  try {
    let response;
    if (id) {
      response = await axios.get(`${Api_Url}/FoundItemCreateView/${id}/`);
    } else {
      response = await axios.get(`${Api_Url}/FoundItemCreateView/`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching Found item(s):", error);
    throw error;
  }
};

// Found Item PATCH (update)
export const Found_update = async (id, values) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.patch(
    `${Api_Url}/FoundItemCreateView/${id}/`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Found Item DELETE
export const Found_delete = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.delete(
    `${Api_Url}/FoundItemCreateView/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ...............................................................................
// create profile
export const updateProfile = async (values, profileId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Please login first");
  }

  const formData = new FormData();

  formData.append("alternate_phone", values.alternate_phone || "");
  formData.append("gender", values.gender || "");
  formData.append("dob", values.dob ? values.dob.format("YYYY-MM-DD") : "");
  formData.append("address", values.address || "");
  formData.append("city", values.city || "");
  formData.append("state", values.state || "");
  formData.append("pincode", values.pincode || "");
  formData.append("user_type", values.userType || "regular");
  formData.append("agreement", values.agreement ? "true" : "false");

  if (values.profile_pic && values.profile_pic.length > 0) {
  formData.append("profile_pic", values.profile_pic[0].originFileObj);
}


  const response = await axios.post(`${Api_Url}/CreateProfile/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile_get = async (id) => {
  const token = localStorage.getItem("access_token");

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    let response;

    if (id) {
      response = await axios.get(`${Api_Url}/CreateProfile/${id}/`, { headers });
    } else {
      response = await axios.get(`${Api_Url}/CreateProfile/`, { headers });
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching profile(s):", error);
    throw error;
  }
};




// Adjust these according to your actual API endpoints
// const BASE_URL = "https://lost-and-found-co21.onrender.com";

// export const deleteUserById = async (id) =>
//   await fetch(`${BASE_URL}/CreateProfile/${id}/`, { method: "DELETE" });

// export const updateUserById = async (id, data) =>
//   await fetch(`${BASE_URL}/CreateProfile/${id}/`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });



// ✅ Add token from localStorage to Authorization header

export const deleteUserById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${Api_Url}/CreateProfile/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Delete failed:", error);
    throw new Error("Delete failed");
  }
};

export const updateUserById = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${Api_Url}/CreateProfile/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Update failed:", error);
    throw new Error("Update failed");
  }

  return await res.json();
};


// ................................................................................
// Feedback
export const Feedback_post = async (data) => {
  const response = await axios.post(`${Api_Url}/FeedbackView/`, data);
  return response.data;
};

export const Feedback_get = async () => {
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const url =
    role === "admin"
      ? `${Api_Url}/FeedbackView/`                  // Admin = all feedback
      : `${Api_Url}/FeedbackView/?user_id=${userId}`; // User = own feedback only

  const response = await axios.get(url);
  return response.data;
};

export const Feedback_getById = async (id) => {
  const response = await axios.get(`${Api_Url}/FeedbackView/${id}/`);
  return response.data;
};

export const Feedback_put = async (id, data) => {
  const response = await axios.put(`${Api_Url}/FeedbackView/${id}/`, data);
  return response.data;
};

export const Feedback_patch = async (id, data) => {
  const response = await axios.patch(`${Api_Url}/FeedbackView/${id}/`, data);
  return response.data;
};

export const Feedback_delete = async (id) => {
  const response = await axios.delete(`${Api_Url}/FeedbackView/${id}/`);
  return response.data;
};


const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token"); // adjust if key is different
  // const user_id = localStorage.getItem("user_id");
  console.log("Token:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

//-------------------------------------------------------------------------
//suggestions

export const getSuggestions = async () => {
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const url =
    role === "admin"
      ? `${Api_Url}/suggestions/`                  // Admin = all feedback
      : `${Api_Url}/suggestions/?user_id=${userId}`; // User = own feedback only

  const response = await axios.get(url);
  return response.data;
};


export const postSuggestion = async (data) => {
  const response = await axios.post(`${Api_Url}/suggestions/`, data);  // ❌ No token
  return response.data;
};

export const deleteSuggestion = async (id) => {
  const user_id = localStorage.getItem("user_id");
  const response = await axios.delete(`${Api_Url}/suggestions/${id}/?user_id=${user_id}`);
  return response.data;
};



//..........................................................................
// Post a payment (with user token)
export const post_payment = async (data) => {
  const response = await axios.post(`${Api_Url}/payments/`, data, getAuthHeaders());
  return response.data;
};

// Get payments for the logged-in user
export const get_userPayments = async (id = null) => {
   const token = localStorage.getItem("token");
  try {
    let response;
    if (id) {
      response = await axios.get(`${Api_Url}/payments/${id}/`, getAuthHeaders());
    } else {
      response = await axios.get(`${Api_Url}/payments/`, getAuthHeaders());
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching payment(s):", error);
    throw error;
  }
};



// Payment data get

export const payment_receipts = async (id) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("Access token missing!");
    throw new Error("Unauthorized: Access token missing");
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // For GET requests, use JSON, not multipart
    };

    const url = id
      ? `${Api_Url}/api/my-payments/${id}`
      : `${Api_Url}/api/my-payments/`;

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment receipts:", error.response?.data || error.message);
    throw error;
  }
};

//Category..............................................
export const getCategories = () => axios.get(Api_Url);
export const postCategory = (data) => axios.post(Api_Url, data);
export const deleteCategory = (id) => axios.delete(`${Api_Url}${id}/`);



// razorpay...............................
// export const handlePayNow = async (item) => {
//   try {
//     const res = await axios.post(`${Api_Url}/payments/create/`, {
//       payer_id: item.payerId,       // ✅ Must be provided
//       receiver_id: item.receiverId, // ✅ Must be provided as per model
//       amount: item.amount,
//       method: 'Razorpay'            // If your serializer uses it
//     });

//     console.log("Payment Response:", res.data);

//     // ✅ Example: Show payment info
//     alert(`Payment created successfully!
// ID: ${res.data.payment_id}
// Amount: ₹${res.data.amount}
// Transaction: ${res.data.transaction_id}`);

//   } catch (error) {
//     console.error("Payment create error:", error.response || error);
//     alert("Payment creation failed.");
//   }
// };

export const handlePayNow = async (item) => {
  try {
    const res = await axios.post(`${Api_Url}/payments/create/`, {
      payer_id: item.payerId,
      receiver_id: item.receiverId,
      amount: item.amount,
      method: 'Razorpay'
    });

    console.log("Payment Response:", res.data);

    // ✅ Return data for Razorpay options
    return res.data;

  } catch (error) {
    console.error("Payment create error:", error.response || error);
    alert("Payment creation failed.");
    throw error;
  }
};

export const getPayments = async () => {
  try {
    const response = await axios.get(`${Api_Url}/payments/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

// ✅  for dashboard Lost item by ID
export const Lost_getById = async (id) => {
  try {
    const response = await axios.get(`${Api_Url}/LostItemCreateView/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lost item by ID:", error);
    throw error;
  }
};

// ✅ Found item by ID
export const Found_getById = async (id) => {
  try {
    const response = await axios.get(`${Api_Url}/FoundItemCreateView/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching found item by ID:", error);
    throw error;
  }
};

export const fatch_all_founditem = async () => {
  try {
    const token = localStorage.getItem("access_token")

    const response = await axios.get(`${Api_Url}/FoundItemCreateView/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Found item(s):", error.response?.data || error.message);
    throw error;
  }
};
export const fatch_all_lostitem = async () => {
  try {
    const response = await axios.get(`${Api_Url}/LostItemCreateView/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};export const getAllMatchedItems = async () => {
  try {
    const response = await axios.get(`${Api_Url}/api/all-matched-items/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matched items:', error);
    throw error;
  }
};