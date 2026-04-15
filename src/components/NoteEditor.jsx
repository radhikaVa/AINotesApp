import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormUI from '../utils/FormUI'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getNoteById } from '../services/notesService'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NoteEditor = () => {
  const {selectedNote}=useSelector((state)=>state.notes)
    const {id}=useParams()
    const dispatch=useDispatch()
    useEffect(() => {
     
      if(id){
        dispatch(getNoteById(id))
      }
    }, [id,dispatch]);
const navigate=useNavigate()
  
    return (
      <>
      
    <Box sx={{ mt: { xs: 6, md: 10 } }}>
  <Box
    sx={{
      maxWidth: 600,
      mx: "auto"
    }}
  >
    <Box
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer" ,mb:2}}
    >
      <Button onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </Button>

      <Typography variant="h5">
        EDIT NOTES
      </Typography>
    </Box>

    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3
      }}
    >
      {!selectedNote ? (
        <div>Loading note...</div>
      ) : (
        <FormUI />
      )}
    </Paper>
  </Box>
</Box>
     </>
  )
}

export default NoteEditor