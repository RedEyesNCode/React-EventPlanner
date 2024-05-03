// api Service js 

const BASE_URL="http://localhost:3000/";

// you can pass endpoint, method and data to this javascript function.

const apiService = async (endpoint, method = "GET", data = null) => {
    const url = BASE_URL + endpoint;
    // console.log(url);
    const headers = {
      "Content-Type": "application/json",
  
      // Add any other headers if needed
    };
  
    const options = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };
    console.log(options);
    try {
      const response = await fetch(url,options);
      console.log(response);
      const result = await response.json();
      return result;
  } catch (error) {
      console.error("API Error:", error);
      throw error;
  }
  };
  
  export default apiService;