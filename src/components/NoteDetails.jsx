import { Box,Typography,Chip,Button, Accordion,AccordionSummary,AccordionDetails } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNoteById } from '../services/notesService';

const NoteDetails = () => {
   // const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const { id } = useParams();
    const {selectedNote}=useSelector((state)=>state.notes)
    console.log(selectedNote,'selectedNote---',id);
    const dispatch=useDispatch();

  useEffect(()=>{
    console.log('into useeffectooooooooooo');
    if (id) {
      dispatch(getNoteById(id));
    }
    },[id,dispatch])
//const note = notes.find((n) => n.id === Number(id));
const navigate=useNavigate()

  return (
    <>
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3,mt: { xs: 5} }} >

{/* Title */}
<Box display={'flex'} gap={2} sx={{cursor:'pointer'}}>
    <Button onClick={()=>navigate('/')}><ArrowBackIcon /></Button>
    <Typography variant="h4" gutterBottom>
  {selectedNote?.title}
</Typography>
</Box>


{/* Dates */}
<Typography variant="body2" color="text.secondary">
  Created: {selectedNote?.createdAt}
</Typography>

{selectedNote?.updatedAt && (
  <Typography variant="body2" color="text.secondary">
    Updated: {selectedNote?.updatedAt}
  </Typography>
)}



{/* Content */}
<Accordion sx={{ mt: 3 }}>
  <AccordionSummary>
    <Typography> Content</Typography>
  </AccordionSummary>

  <AccordionDetails>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
  {selectedNote?.content}
</Typography>
  </AccordionDetails>
</Accordion>

{/* Summary Accordion (PLACE HERE ✅) */}
<Accordion sx={{ mt: 3 }}>
  <AccordionSummary>
    <Typography>Generated Summary</Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Typography>
      {selectedNote?.summary || "No summary generated yet"}
    </Typography>
  </AccordionDetails>
</Accordion>

{/* Improved Writing Accordion */}

<Accordion sx={{ mt: 3 }}>
  <AccordionSummary>
    <Typography>Improved Content</Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Typography>
      {selectedNote?.improvedContent || "No improved version yet"}
    </Typography>
  </AccordionDetails>
</Accordion>

{/* Tags */}
<Box sx={{ mt: 2, mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
  {/* {note?.tag?.map((tag, index) => (
    <Chip key={index} label={tag} />
  ))} */}
{Array.isArray(selectedNote?.tag) ?
  selectedNote?.tag.map((tag, index) => (
    <Chip key={index} label={tag} sx={{ mr: 1 }} />
  )):(<Chip  label={selectedNote?.tag}  />)}
</Box>

{/* Action Buttons */}
<Box sx={{ mt: 4, display: "flex",flexWrap:'wrap', gap: 2 ,alignItems:'center'}}>
    <Link to={`/edit/${id}`}>
  <Button variant="outlined">Edit</Button></Link>
  
  <Button variant="outlined" color="error"
  onClick={()=>dispatch(deleteNote(id))}
  >Delete</Button>
  {/* <Button variant="outlined">Generate Summary</Button>
  <Button variant="outlined">Improve Writing</Button> */}
</Box>

</Box>
    </>
  )
}

export default NoteDetails