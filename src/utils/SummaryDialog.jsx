import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditNotes, setOpenSummaryDialog } from '../features/notes/notesSlice.js'
import {useGenerateSummary} from "../hooks/NoteHandlers.js"              

const SummaryDialog = () => {
 const {openSummaryDialog,editNotes}=useSelector((state)=>state.notes)
 const dispatch=useDispatch()
const {GenerateSummary}=useGenerateSummary();
  return (
    <>
    <Dialog open={openSummaryDialog}>
      <DialogTitle>{editNotes.title}</DialogTitle>
      <DialogContent>
        <Typography>Content :</Typography>
         <Typography>{editNotes.content}</Typography> 
        {/* <Typography>Length Of Summary Selected : {length} </Typography> */}
        <Typography variant='h5'>Generated Summary :</Typography>
        <Typography>{editNotes.summary}</Typography>
        <Typography variant='h5'>Improved Content :</Typography>
        <Typography>{editNotes.improvedContent}</Typography>
      </DialogContent>
      <DialogActions>

     <Button  onClick={()=>{
      const content=editNotes.summary;
    
      GenerateSummary('improved',content)}}>
      Regenerate
    </Button> 

    <Button onClick={() => navigator.clipboard.writeText(editNotes.summary)}>
      Copy
    </Button>

   <Button
  disabled={!editNotes.summary}
  onClick={() => {

    dispatch(
      setEditNotes({
        content: editNotes.summary
      })
    );

    dispatch(setOpenSummaryDialog(false));

  }}
>
  Replace With Summary
</Button>


<Button
  disabled={!editNotes.improvedContent}
  onClick={() => {

    dispatch(
      setEditNotes({
        content: editNotes.improvedContent
      })
    );

    dispatch(setOpenSummaryDialog(false));

  }}
>
  Replace With Improved Content
</Button>

    <Button onClick={() =>dispatch( setOpenSummaryDialog(false))}>
      Close
    </Button>

  </DialogActions>
    </Dialog>
    </>
  )
}

export default SummaryDialog