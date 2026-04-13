import React, { useEffect } from 'react'
import NoteCard from '../components/NoteCard'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar';
import { getNotes } from '../services/notesService';
import { Grid } from '@mui/material';

const Dashboard = () => {
  const {searchValue,selectedTag,notes}=useSelector((state)=>state.notes);
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
    <SearchBar/>
    <Grid container spacing={2}>
                    {
        filteredNotes?.map((note)=>(
          <Grid item xs={12} md={6} lg={4} key={note._id}>
            <NoteCard note={note}/>
            </Grid>
        ))}
        </Grid>
    </>
  )
}

export default Dashboard