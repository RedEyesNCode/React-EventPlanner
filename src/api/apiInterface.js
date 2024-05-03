// userApi.js

import apiService from "./apiServices";

// export const getAllusers = async() =>{
//     try {
//         const response = await apiService("product/getAllBanners", "GET",);
//     return response;
//     } catch (error) {
        
//     }
// }


export const getAllCategory = async () => {
    try {
      const response = await apiService("megma/allcategories", "GET",);
      return response;
    } catch (error) {
      throw error;
    }
  }