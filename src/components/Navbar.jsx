
import * as React from 'react';
import {Typography,Toolbar,Box,AppBar, Divider, Avatar} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setChecked, setMode } from '../features/notes/notesSlice';



export default function Navbar() {
  const {checked,mode}=useSelector((state)=>state.notes);
  const dispatch=useDispatch();
  const handleChange=()=>{
    dispatch(setChecked(!checked));
  dispatch(setMode(mode==="light"?"dark":"light"));
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
     <AppBar
  position="fixed"
  sx={{
    background:
      "linear-gradient(90deg,#6366f1 0%,#22c55e 100%)"
  }}
>
        <Toolbar>
       
<Avatar
        alt="Remy Sharp"
        src="/notesLogo.png"
        sx={{ width: 70, height: 70,cursor:'pointer' }}
      />
            <Typography
  variant="h6"
  sx={{
    fontWeight: 600,
    letterSpacing: 0.5,
    mr: 3,
    cursor:'pointer'
  }}
>
  Smart AI Notes
</Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
           <Divider sx={{mx:2}} orientation="vertical" variant="middle"  flexItem />
     
          <Link
  to="/"
  style={{
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit"
  }}
>
  <DashboardIcon />
  <Typography sx={{ ml: 1 }}>
    Dashboard
  </Typography>
</Link></Box>
         <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Divider sx={{mx:2,color:'inherit'}} color='inherit' orientation="vertical" variant="middle"  flexItem />
       
         <Link
  to="/create"
  style={{
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit"
  }}
>
<NoteAddIcon/>
  <Typography sx={{ ml: 1 }}>
  Create Note
  </Typography>
</Link></Box>
          <Box sx={{ flexGrow: 1 }} />
          
            <Switch  checked={checked} 
            onChange={handleChange}
            // color="secondary"
            
            />
           
        
          
        </Toolbar>
      </AppBar>
     
      {/* <Toolbar/>
       */}
    </Box>
  );
}





