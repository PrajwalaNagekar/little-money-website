import axios from 'axios';

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_LOCALHOST_API_URL;

// Main axios instance for general API calls
const api = axios.create({
  baseURL: VITE_BACKEND_LOCALHOST_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

//  Send OTP API (no token needed for this)
export const sendOtp = async (payload) => {
  try {
    const response = await api.post('/mobile-verification', payload);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, error: error.message };
  }
};

// OTP Verification API (for token generation)
export const verifyOtp = async (mobileNumber, enteredOtp) => {
  try {
    const response = await api.post('/otp-verify', {
      mobileNumber,
      otp: enteredOtp,
    });
    // console.log("JAY SHREE RAM", response)
    // console.log("OTP API Response:", response.data);

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      // console.log(response.data.leadId);

      return {
        success: true,
        message: "OTP verified successfully",
        userId: response.data.userId,
        leadId: response.data.leadId,
        status: response.data.status,
        createdAt: response.data.createdAt
      };
    } else {
      return {
        success: false,
        message: response.data.message || "OTP verification failed.",
      };
    }
  } catch (error) {
    console.error("OTP Verification error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong. Please try again.",
    };
  }
};

export const lead = async (payload) => {
  // console.log("🚀 ~ lead ~ payload:", payload)
  const token = localStorage.getItem("token");

  if (!token) {
    return { success: false, message: "No token found for authentication." };
  }

  try {
    const response = await api.post('/lead-api', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error("Lead API Error:", error.response?.data || error.message);
    return { success: false, message: "Lead submission failed" };
  }
};

//  Get Offers by Lead ID API (protected route)
export const getOffersByLeadId = async (leadId) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  // console.log(token);

  if (!token) {
    return { success: false, message: "No token found for authentication." };
  }
  // console.log("Sending token:", token);

  try {
    const response = await api.get(`/get-offers/${leadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching offers by leadId:", error);
    return { success: false, message: "Failed to fetch offers" };
  }
};

//  Get Summary by Lead ID API (protected route)
export const getSummaryByLeadId = async (leadId) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (!token) {
    return { success: false, message: "No token found for authentication." };
  }

  try {
    const response = await api.get(`/get-summary/${leadId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Manually add the Authorization header
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching summary by leadId:", error);
    return { success: false, message: "Failed to fetch summary" };
  }
};


export const appliedCustomers = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "No token found for authentication." };
  try {
    const response = await api.post('/applied-customers', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log("🚀 ~ appliedCustomers ~ response:", response)
    // console.log(response);
  } catch (error) {
    console.log(error);

  }
}

export const leadApiBusinessLoan = async (payload) => {
  console.log("🚀 ~ leadApiBusinessLoan ~ payload:", payload)
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "No token found for authentication." };
  try {
    const response = await api.post('/lead-api-business-loan', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    // console.log("🚀 SEE THIS RESPONSE", response)

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Backend Error Response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}


export const getBusinessDetailsByLeadId = async (leadId) => {
  // console.log("🚀 ~ getBusinessDetailsByLeadId ~ leadId:", leadId)
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "No token found for authentication." };
  try {
    const response = await api.get(`/business-loan/${leadId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Manually add the Authorization header
      }
    })
    console.log("🚀 ~ getBusinessDetailsByLeadId ~ response:", response)
    return response;

  } catch (error) {
    return { success: false, message: "Failed to fetch offers" };
  }
}


export const updateBusinessDetailsByLeadId = async (leadId, updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "No token found for authentication." };

  try {
    const response = await api.put(`/update-business-details/${leadId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error updating business details by leadId:", error.response?.data || error.message);
    return { success: false, message: "Failed to update business details" };
  }
};


export const getPersonalLoanDetailsByLeadId = async (leadId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: "No token found for authentication." };
  }

  try {
    const response = await api.get(`/get-personal-details-by-id/${leadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching personal loan details by leadId:", error);
    return { success: false, message: "Failed to fetch personal loan details" };
  }
};