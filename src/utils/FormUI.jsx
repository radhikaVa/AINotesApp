import { Box, Button, FormControl,Grid,TextareaAutosize, MenuItem, Select, Stack,
     TextField, Autocomplete, 
     CircularProgress} from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryDialog from "./SummaryDialog";
import { useDispatch, useSelector } from "react-redux";
import { addNotes, setEditNotes} from "../features/notes/notesSlice";
import { createNote, updateNote } from "../services/notesService";
import { useGenerateSummary } from "../hooks/NoteHandlers.js";


const FormUI=({notes})=>{
   
    const [length,setLength]=useState("")
    const [tagInput, setTagInput] = useState("");
    const {id}=useParams()
    const {loading,openSummaryDialog,editNotes,selectedNote}=useSelector((state)=>state.notes)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const {GenerateSummary,handleImproveWriting,handleSuggestTitle,handleGenerateTags} =
     useGenerateSummary();
useEffect(() => {
  if (selectedNote) {
    dispatch(setEditNotes(selectedNote));
  }
}, [selectedNote,dispatch]);
   

    const handleSubmit=async(event)=>{
event.preventDefault();
if (id) {

  const updatedNoteData = {
    ...editNotes,
    title: editNotes.title,
    content: editNotes.content,
    summary: editNotes.summary,
    improvedContent:editNotes.improvedContent,
    tag: editNotes.tag
  };
  await dispatch(updateNote({id,note:updatedNoteData}));

}else{
     console.log(editNotes,'editnotes for adding ');
     
    const newnotes={
        title:editNotes.title,
        content:editNotes.content,
       summary: editNotes.summary || "",
  improvedContent: editNotes.improvedContent || "",
        tag:editNotes.tag||[],
       
    }
  
   const saveNote=await createNote(newnotes)
   dispatch(addNotes(saveNote))
   }

navigate('/')    
}
    return(
<>
{loading && <CircularProgress />}
    <Box
    alignItems={'center'}
        component='form'
        onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid size={8}>
                    <TextField
  label="Title"
  name="title"
  value={editNotes.title}
  onChange={(e) =>
    dispatch(setEditNotes({
      title: e.target.value
      }))}
  fullWidth
  required
/>
                    </Grid>
                   <Grid size={4}>
<Button variant='outlined' disabled={!editNotes.content}
onClick={()=>handleSuggestTitle(editNotes.content)}>suggest Title</Button>
                   </Grid>
                </Grid>
                

    <Grid container spacing={2}>
        <Grid size={8}>
        <TextareaAutosize
  name="content"
  minRows={3}
  value={editNotes.content}
  onChange={(e) =>
    dispatch(setEditNotes({
      content: e.target.value
      }))}
  placeholder="Minimum 3 rows"
  style={{ width: "100%" }}
/>
        
       
        </Grid>
        <Grid size={4}>
        <FormControl sx={{ m: 1, minWidth:120}} >
        <Select
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>length of summary</em>
          </MenuItem>
          <MenuItem value="small">small</MenuItem>
          <MenuItem value={"medium"}>medium</MenuItem>
          <MenuItem value={"large"}>large</MenuItem>
        </Select>
      </FormControl>
        </Grid>
       
    </Grid>
    {/* Generate Summary, Improve Writing Generate Tags Buttons*/}
    <Grid container spacing={2}>

    <Grid size={4}>
        <Button variant="outlined" disabled={!editNotes.content}
        // onClick={()=>handleGenerateSummary('generate')}>Generate Summary</Button>
        onClick={()=>GenerateSummary('generate',editNotes.content)}>Generate Summary</Button>

        </Grid>
        <Grid size={4}>
        <Button variant="outlined"
        disabled={!editNotes.content}
        onClick={()=>handleImproveWriting(editNotes.content)}
        >Improve Writing</Button><br/>
        </Grid>
       
        <Grid size={4}>
        <Button variant="outlined" disabled={!editNotes.content}
        onClick={()=>handleGenerateTags(editNotes.content)}>Generate Tags</Button>
        </Grid>
    </Grid>


<Autocomplete
  multiple
  freeSolo
  options={[]}

  value={
    Array.isArray(editNotes.tag)
      ? editNotes.tag
      : editNotes.tag
      ? [editNotes.tag]
      : []
  }

  inputValue={tagInput}

  onInputChange={(event, newInputValue) => {
    setTagInput(newInputValue);
  }}

  onChange={(event, newValue) => {
    dispatch(
      setEditNotes({
        tag: newValue
      })
    );
  }}

  renderInput={(params) => (
    <TextField
      {...params}
      label="Tags"

      onKeyDown={(event) => {

        if (event.key === ",") {

          event.preventDefault();

          const newTags = tagInput
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);

          dispatch(
            setEditNotes({
              tag: [
                ...new Set([
                  ...(editNotes.tag || []),
                  ...newTags
                ])
              ]
            })
          );

          setTagInput("");

        }

      }}
    />
  )}
/>   

     <Button type='submit' variant='outlined'
    size="medium" 
    color='secondary'>{id?"Save Notes":"ADD Notes"}</Button>
    </Stack>
   
    </Box>
{
    openSummaryDialog &&(
        <SummaryDialog 
        />
    )
}
</>
)}

export default FormUI