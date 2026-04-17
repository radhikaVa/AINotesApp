import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../services/notesService';
import CommonButton from '../utils/CommonButton';



 const NoteCard=({note})=> {
    const navigate=useNavigate();
    const dispatch=useDispatch()

    const tags = Array.isArray(note.tag)
    ? note.tag
    : note.tag
    ? note.tag.split(",")
    : [];
    
  return (               
            <Card sx={{ width: "100%" }} onClick={()=>navigate(`/note/${note._id}`)}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {note.title}
              </Typography>
              <Typography variant="h5" component="div">
              <Typography variant="body2">
  {note.content.length > 80
    ? note.content.slice(0, 40) + "..."
    : note.content}
</Typography>
              </Typography>
             
<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
  {tags.slice(0, 2).map((tag, index) => (
    <Chip key={index} label={tag} size="small" />
  ))}

  {tags.length > 2 && (
    <Chip label={`+${tags.length - 2} more`} size="small" />
  )}
</Box>
            </CardContent>
            
                <CardActions>
                <Link to={`/note/${note._id}`}>
                <Button>Read more →</Button>
                </Link>

                {/* <Link to={`/edit/${note._id}`}>
              <Button size="small" onClick={(event)=>event.stopPropagation()}>Edit</Button>
              </Link> */}
                <Link to={`/edit/${note._id}`}>
  {/* <Button variant="outlined">Edit</Button> */}
    <CommonButton
label="Edit"
onClick={(event)=>event.stopPropagation()}
color="secondary"
/>
  </Link>
              {/* <Button size="small"  onClick={(event)=>{
                event.stopPropagation();handleDelete(note._id)}}>Delete</Button>
              */}
                <CommonButton
label="Delete"
 onClick={(event)=>{event.stopPropagation();dispatch(deleteNote(note._id))}}
color="error"
/>
              
            </CardActions>
             
           
            
          </Card>
        
  );
}
export default  NoteCard
