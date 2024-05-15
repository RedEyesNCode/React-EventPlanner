import apiService from "./apiService";

export const getAllVenue = async () => {
  try {
    const response = await apiService("megma/get-all-venue", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteVenue = async (venueId) => {
  try {
    const body = { venueId };
    const response = await apiService("megma/delete-venue", "POST", body);
    return response;
  } catch (error) {
    throw error;
  }
}

export const createVenue = async (formData) => {
  try {
    const response = await apiService("megma/create-venue", "POST", formData);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateVenue = async (formData) => {
  try {
    const response = await apiService("megma/update-venue", "POST", formData);
    return response;
  } catch (error) {
    throw error;
  }
};