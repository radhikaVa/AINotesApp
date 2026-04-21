import { useDispatch } from "react-redux";
import { generateSummary, generateTags, improveWriting, suggestTitle } from "../services/aiService";
import {  setLoading, setEditNotes, setOpenSummaryDialog, setSnackbar } from "../features/notes/notesSlice";

export  const useGenerateSummary = () => {
    const dispatch=useDispatch();

const GenerateSummary = async (content) => {
console.log(content,'reg');

      if (!content?.trim()) return;
  
      dispatch(setLoading(true));
  
      const result =await  generateSummary(content);
    console.log(result,'hhhhhhhhhhhhhhhhhhhhhhh');
      if (!result.success) {

  dispatch(
    setSnackbar({
      open: true,
      message: result.message,
      severity: "error"
    })
  );

  dispatch(setLoading(false));
  return;

}

if (!result.generateSummary) {

  dispatch(
    setSnackbar({
      open: true,
      message: "Summary not generated",
      severity: "info"
    })
  );

  dispatch(setLoading(false));
  return;

}
    if (result.success && result.generateSummary) {
  
        if (result.generateSummary?.length > 0) {
    
        
      
      dispatch(
        setEditNotes({
         summary: result.generateSummary
        })
      );
          dispatch(
            setSnackbar({
              open: true,
              message: "summary generated successfully",
              severity: "success"
            })
          );
          dispatch(setLoading(false));
  
          dispatch(setOpenSummaryDialog(true));
    
        } else {
    // return {
    //   success: false,
    //   message:
    //     error.response?.data?.message ||
    //     error.message ||
    //     "Something went wrong"
    // }
          dispatch(
            setSnackbar({
              open: true,
              message:`${result?.message}`|| "Not enough content to generate summary",
              severity: "info"
            })
          );
    
        }
    
      } else {
    
        dispatch(
          setSnackbar({
            open: true,
            message: result.message, // backend message shown here
            severity: "error"
          })
        );
    
      }
  
    
  
    };
    const handleSuggestTitle = async (content)=>{
     
         if (!content) return;
     
        dispatch(setLoading(true));
     
         const result = await suggestTitle(content);
         console.log(result,'tileooooooooooooooooo');
         
         if (result.success) {
     
           if (result.suggestTitle?.length > 0) {
       console.log('into sugge',result.suggestTitle);
       
              dispatch( setEditNotes({
                   
                   title: result.suggestTitle
                 }))
       
             dispatch(
               setSnackbar({
                 open: true,
                 message: "Title generation Successfully",
                 severity: "success"
               })
             );
             dispatch( setLoading(false))
           } else {
       
             dispatch(
               setSnackbar({
                 open: true,
                 message: "Not enough content to generate title",
                 severity: "info"
               })
             );
       
           }
       
         } else {
       
           dispatch(
             setSnackbar({
               open: true,
               message: result.message, // backend message shown here
               severity: "error"
             })
           );
       
         }
         
     
     
       };
  const handleGenerateTags = async (content) => {
  
      if (!content?.trim()) return;
    
      dispatch(setLoading(true));
    
      const result = await generateTags(content);
    
      console.log(result.tags.data,'result tag data');
    const tags=  result.tags.data
    
      if (result.success) {
    
        if (tags?.length > 0) {
    
         dispatch( setEditNotes({
            tag: tags
          }));
    
          dispatch(
            setSnackbar({
              open: true,
              message: "Tags generated successfully",
              severity: "success"
            })
          );
    dispatch(setLoading(false));
        } else {
    
          dispatch(
            setSnackbar({
              open: true,
              message: "Not enough content to generate tags",
              severity: "info"
            })
          );
    
        }
    
      } else {
    
        dispatch(
          setSnackbar({
            open: true,
            message: result.message, // backend message shown here
            severity: "error"
          })
        );
    
      }
    
      
    
    };

    const handleImproveWriting = async (content) => {
    
        if (!content) return;
    
       dispatch( setLoading(true));
    
        const result = await improveWriting(content);
        if (result.success) {
    
          if (result.improvedText?.length > 0) {
      
              dispatch(setEditNotes({
                  improvedContent: result.improvedText
                }));
      
            dispatch(
              setSnackbar({
                open: true,
                message: "improvedContent generated successfully",
                severity: "success"
              })
            );
             dispatch(setLoading(false));
        dispatch(setOpenSummaryDialog(true));
          } else {
      
            dispatch(
              setSnackbar({
                open: true,
                message: "Not enough content to generate improvedText",
                severity: "info"
              })
            );
      
          }
      
        } else {
      
          dispatch(
            setSnackbar({
              open: true,
              message: result.message, // backend message shown here
              severity: "error"
            })
          );
      
        }
    //console.log(improvedText,'iooooooooooo');
    
        
    
       
    
      
    
      };
    
    return {
        GenerateSummary,
         handleGenerateTags,
         handleImproveWriting,
         handleSuggestTitle
       };
}