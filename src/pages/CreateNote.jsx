import { Box, Button, Paper, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'
import FormUI from '../utils/FormUI'
import { useNavigate } from 'react-router-dom';

const Createnotes = () => {
  
const navigate=useNavigate()

  return (
  
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
        CREATE NOTES
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
      <FormUI/>
    </Paper>
    </Box>
</Box>
       
  )
}

export default Createnotes