import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, OutlinedInput } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import {  setSearchValue } from '../features/notes/notesSlice';
import TagChip from './TagChip';



 const SearchBar=()=> {
   const {searchValue,selectedTag}=useSelector((state)=>state.notes)
    const dispatch=useDispatch()

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          
        <OutlinedInput
            placeholder='Search...'
          id="input-with-icon-adornment"
          name='searchValue'
         value={searchValue}
         sx={{ml:1}}
         onChange={(e)=>dispatch(setSearchValue(e.target.value))}
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon size="large" color='white'/>
            </InputAdornment>
          }
          
            
                endAdornment={
                    (searchValue!=="" || selectedTag!=="") &&(
                    <InputAdornment position='end'>
                        <ClearIcon size="large" color='white'
                        sx={{cursor:'pointer'}}
                        onClick={()=>dispatch(setSearchValue(""))}
                        />
                    </InputAdornment>)
                  }
            
        
         
        /> 
        </Grid>
        <Grid size={4}>
        
      <TagChip/>
        </Grid>
       
      </Grid>
    </Box>
    <br/>
    </>
  );
}
export default SearchBar
