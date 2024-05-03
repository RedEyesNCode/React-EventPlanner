// userApi.js
import apiService from "./apiService";

export const getAllUsers = async () => {
  try {
    const response = await apiService("megma/getAllUser", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    // Construct the request body with userId
    const body = { userId };
    console.log("Body:", body);
    const response = await apiService("megma/deleteuser", "POST", body);
    return response;
  } catch (error) {
    throw error;
  }
}
