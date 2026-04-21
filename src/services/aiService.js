import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL

export const generateSummary =
//createAsyncThunk("notes/generateSummary",
 async (text) => {
 
   try {
    const response = await axios.post(
      `${BASE_URL}/generate-summary`,
      {
        text
      }
    );
   console.log('into ene summary',response.data?.generateSummary)
    return {
      success: true,
      generateSummary: response.data?.generateSummary
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.response?.data?.message ||
       "Summary generation failed"
    }; 
  }
}
//);

export const suggestTitle = async (text) => {
  console.log(text,'suggggggggg');
  

  try {
      const response = await axios.post(
         `${BASE_URL}/generate-title`,
        { text }
      );
    
      const summary = response.data.title || "";
      return {
        success: true,
       // suggestTitle: title.charAt(0).toUpperCase() + title.slice(1)
      suggestTitle: summary
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Title generation failed"
      }; 
    }
  
  };

  // export const generateTags = async (text) => {

  //   const response = await axios.post(
  //     "http://localhost:5000/generate-tags",
  //     { text }
  //   );
  
  //   const summary = response.data[0]?.summary_text || "";
  
  //   const stopWords = [
  //     "the","are","and","for","with","this","that",
  //     "from","into","have","has","had","was","were",
  //     "a","an","of","to","in","on","is"
  //   ];
  
  //   const tags = summary
  //     .toLowerCase()
  //     .replace(/[.,:/]/g, "")
  //     .split(" ")
  //     .filter(word => word.length > 3)
  //     .filter(word => !stopWords.includes(word));
  
  //   return [...new Set(tags)].slice(0,5);
  // };
 
  export const generateTags = async (text) => {

    try {
  
      const response = await axios.post(
        `${BASE_URL}/generate-tags`,
        { text }
      );
  
      // const summary = response.data[0]?.summary_text || "";
  
      // const stopWords = [
      //   "the","are","and","for","with","this","that",
      //   "from","into","have","has","had","was","were",
      //   "a","an","of","to","in","on","is"
      // ];
  
      // const tags = summary
      //   .toLowerCase()
      //   .replace(/[.,:/]/g, "")
      //   .split(/\s+/)
      //   .filter(word => word.length > 3)
      //   .filter(word => !stopWords.includes(word));
  
      return {
        success: true,
        // tags: [...new Set(tags)].slice(0,5)
        tags:response.data
      };
  
    } catch (error) {
  
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Tag generation failed"
      };
  
    }
  
  };
  
  export const improveWriting = async (text) => {

    // const response = await axios.post(
    //   "http://localhost:5000/improve-writing",
    //   { text }
    // );
  
    // return response.data[0]?.summary_text || "";
    try {
      const response = await axios.post(
        `${BASE_URL}/improve-writing`,
        { text }
      );
    
      //return response.data[0]?.summary_text || "";
      return {
        success: true,
        improvedText: response.data?.improvedContent
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Writing improvement failed"
      }; 
    }
  
  };

