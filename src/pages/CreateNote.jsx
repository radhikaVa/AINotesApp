import { Paper } from '@mui/material'
import React from 'react'
import FormUI from '../utils/FormUI'

const Createnotes = () => {

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
    {/* {formUI} */}
    <FormUI/>
           </Paper>
       
  )
}

export default Createnotes