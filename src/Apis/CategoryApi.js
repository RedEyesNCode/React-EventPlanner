import apiService from "./apiService";

export const getallcategories = async () => {
    try {
      const response = await apiService("megma/all-categories", "GET");
      return response;
    } catch (error) {
      throw error;
    }
};