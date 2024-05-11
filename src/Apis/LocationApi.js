import apiService from "./apiService";


export const getAllLocations = async () => {
    try {
      const response = await apiService("megma/getalllocation", "GET");
      return response;
    } catch (error) {
      throw error;
    }
};
  

export const deleteLocation = async (locationId) => {
  try {
    console.log(locationId);
    const response = await apiService("megma/deletelocation", "POST", {locationId:locationId});
    return response;
  } catch (error) {
    throw error;
  }
}



export const addLocation = async (formData) => {
  try {
    const response = await apiService("megma/createlocation", "POST", formData);
    return response;
  } catch (error) {
    throw error;
  }
};