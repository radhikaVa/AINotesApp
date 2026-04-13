import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormUI from '../utils/FormUI'
import { Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getNoteById } from '../services/notesService'

const NoteEditor = () => {
  const {selectedNote}=useSelector((state)=>state.notes)
    const {id}=useParams()
    const dispatch=useDispatch()
    useEffect(() => {
     
      if(id){
        dispatch(getNoteById(id))
      }
    }, [id,dispatch]);

  
    return (
        <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          maxWidth: 600,
          margin: "auto"
        }}
      >
        {
         (!selectedNote) ?
           <div>Loading note...</div>
          :(
            <FormUI/>
          )
        }
       
    </Paper>
  )
}

export default NoteEditor