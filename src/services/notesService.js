import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/notes";



// export const getNotes = async () => {

//   const response = await axios.get(BASE_URL);

//   return response.data;

// };
export const getNotes = createAsyncThunk(
    "notes/getNotes",
    async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    }
  );

export const createNote = async (note) => {
   
    

  const response = await axios.post(BASE_URL, note);
 console.log(response,'create');
  return response.data;

};


export const updateNote =createAsyncThunk("notes/updateNote", 
    async ({id, note}) => {
console.log(id,'params',note,'body');

  const response = await axios.put(
    `${BASE_URL}/${id}`,
    note
  );

  return response.data;

});
export const getNoteById = createAsyncThunk(
    "notes/getNoteById",
    async (id) => {
       
      const response = await axios.get(
        `${BASE_URL}/${id}`
      );
      console.log(response.data,'res---notebyid');
      
      return response.data;
    }
  );

export const deleteNote = createAsyncThunk ("notes/deleteNote",async(id) => {

  await axios.delete(
    `${BASE_URL}/${id}`
  )

  return id;

});