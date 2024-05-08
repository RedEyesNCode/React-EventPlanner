import apiService from "./apiService";

export const getallevents = async () => {
    try {
      const response = await apiService("megma/getallevents", "GET");
      return response;
    } catch (error) {
      throw error;
    }
};
  

  export const deleteEvent = async (eventId) => {
    try {
      // Construct the request body with userId
      const body = { eventId };
      const response = await apiService("megma/deleteevent", "POST", body);
      return response;
    } catch (error) {
      throw error;
    }
  }  

  export const addEvent = async (formData) => {
    try {
      const response = await apiService("megma/createevent", "POST", formData);
      return response;
    } catch (error) {
      throw error;
    }
  };