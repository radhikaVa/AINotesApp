import { createSlice } from "@reduxjs/toolkit"
import { deleteNote, getNoteById, getNotes, updateNote } from "../../services/notesService";

const initialState={
    notes:[],
    editNotes: {
      title: "",
      content: "",
      summary: "",
      improvedContent: "",
      tag: []
    },
    checked:false,
    mode:"light",
    theme:"",
    loading:false,
    openSummaryDialog:false,
    snackbar: {
      open: false,
      message: "",
      severity: "info"
    },
selectedNote:null,
searchValue:"",
selectedTag:"",
aiSummaryPreview:"",
aiTitlePreview:"",
aiTagsPreview:[],
improvedContentPreview:"",
}

const noteSlice=createSlice({
    name:"notes",
    initialState,
    reducers:{
        // Handlers
        addNotes:(state,action)=>{
            state.notes.push(action.payload)
        },
        // updateNotes: (state, action) => {

        //     const index = state.notes.findIndex(
        //       (note) => note._id === action.payload._id
        //     );
          
        //     if (index !== -1) {
        //       state.notes[index] = action.payload;
        //     }
          
        //   },
        
        // States
        setNotes:(state,action)=>{
            state.notes=action.payload;
        },
        setEditNotes: (state, action) => {
//nsole.log('into set edit',action.payload);

          state.editNotes = {
            ...state.editNotes,
            ...action.payload
          };
        
        },
        setLoading:(state,action)=>{
          state.loading=action.payload
        },
        setOpenSummaryDialog: (state, action) => {
          state.openSummaryDialog = action.payload;
        },
        setTheme:(state,action)=>{
state.theme=action.payload
        },
        setChecked:(state,action)=>{
          state.checked=action.payload
        },
        setMode:(state,action)=>{
          state.mode=action.payload
        },
        setSnackbar: (state, action) => {

          state.snackbar = {
            open: action.payload.open,
            message: action.payload.message,
            severity: action.payload.severity
          };
        
        },
        setSearchValue:(state,action)=>{
            state.searchValue=action.payload
        },
        setSelectedTag:(state,action)=>{
            state.selectedTag=action.payload
        },
        setSummaryPreview:(state,action)=>{
            state.aiSummaryPreview=action.payload
        },
        setTitlePreview:(state,action)=>{
            state.aiTitlePreview=action.payload
        },
        setTagPreview:(state,action)=>{
            state.aiTagsPreview=action.payload
        },
        setImprovedContent:(state,action)=>{
            state.improvedContentPreview=action.payload
        },
    },
    extraReducers: (builder) => {

        builder
    
          .addCase(getNotes.pending, (state) => {
            state.loading = true;
          })
    
          .addCase(getNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = action.payload;
          })
    
          .addCase(getNotes.rejected, (state) => {
            state.loading = false;
          })
          .addCase(getNoteById.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedNote=action.payload;
          })
          .addCase(deleteNote.fulfilled, (state, action) => {

            state.notes = state.notes.filter(
              note => note._id !== action.payload
            );
        
          })
          .addCase(updateNote.fulfilled,(state,action)=>{
            const index=state.notes.findIndex((note)=>note._id===action.payload._id)
            if(index!==-1){
                state.notes[index]=action.payload
            }
          })
      }
})

export const {setNotes,addNotes,setSearchValue,setMode,setTheme,setSnackbar,
    setTagPreview,setImprovedContent,setSelectedTag,setTitlePreview,setEditNotes,
    setSummaryPreview,setChecked,setLoading,setOpenSummaryDialog
}=noteSlice.actions

export default noteSlice.reducer