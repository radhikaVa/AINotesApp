import React, { useEffect } from 'react'
import NoteCard from '../components/NoteCard'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar';
import { getNotes } from '../services/notesService';
import { Grid ,CircularProgress, Box} from '@mui/material';

const Dashboard = () => {
  const {searchValue,selectedTag,notes,loading}=useSelector((state)=>state.notes);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getNotes());
    },[dispatch])

    const filteredNotes=notes?.filter((item)=>{
        if(searchValue!==""){
           return (item.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
           item.content?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
           (Array.isArray(item.tag) ?
            item.tag?.some(tag =>
              tag.toLowerCase().includes(searchValue.toLowerCase())
            ):(item.tag?.toLowerCase()?.includes(searchValue.toLowerCase())))
        )
        }
        
        if (!searchValue && !selectedTag) return true;
        if (selectedTag) {
return Array.isArray(item.tag)
  ? item.tag.some(tag =>
      tag.toLowerCase().includes(selectedTag.toLowerCase())
    )
  : item.tag?.toLowerCase().includes(
      selectedTag.toLowerCase()
    )}
        return true;
    })

return (
    <>
    <Box sx={{ px: { xs: 2, md: 2 } ,mt: { xs: 11, md: 8 }}}>
  <SearchBar />
</Box>
    
    <Box textAlign={'center'}>
    {loading && <CircularProgress />}
    </Box>
    <Box sx={{ px: { xs:2, md: 2 },mb:{xs:2} }}>
    <Grid container spacing={2} >

                    {
        filteredNotes?.map((note)=>(
           <Grid  size={{ xs:12,md:4, lg:4}} key={note._id}>
         
            <NoteCard note={note}/>
            </Grid>
        ))}
        </Grid>
        </Box>
    </>
  )
}

export default Dashboard