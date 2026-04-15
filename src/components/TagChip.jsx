import { Tab, Tabs } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTag } from '../features/notes/notesSlice'

const TagChip = () => {
    const {selectedTag,notes}=useSelector((state)=>state.notes)
    const dispatch=useDispatch()
    //  const tagsData = notes?.flatMap(
    //       (item) => item.tag || []
    //     );
    const tagsData = [
        ...new Set(
          notes.flatMap(note =>
            Array.isArray(note.tag)
              ? note.tag
              : note.tag
              ? note.tag.split(",")
              : []
          ).map(tag => tag.trim())
        )
      ];
        const handleChange = (event,newValue) => {
         
          dispatch(setSelectedTag(newValue))
        };
  return (
    <div>
        <Tabs
        value={selectedTag}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        // scrollButtons="auto"
        scrollButtons
  allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        <Tab label="All" value="" />
        {
            tagsData.map((tag)=>(
                <Tab  key={tag} label={tag} value={tag}/>
            ))
        }
        
      </Tabs>
    </div>
  )
}

export default TagChip