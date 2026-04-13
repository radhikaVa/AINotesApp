import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSnackbar } from '../features/notes/notesSlice'

const AppSnakeBar = () => {
  const {snackbar}=useSelector((state)=>state.notes);
  const dispatch=useDispatch()
  const handleClose = () => {

    dispatch(
      setSnackbar({
        open: false,
        message: "",
        severity: "info"
      })
    );

  };
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >

      <Alert
        severity={snackbar.severity}
        onClose={handleClose}
      >
        {snackbar.message}
      </Alert>

    </Snackbar>
  )
}

export default AppSnakeBar