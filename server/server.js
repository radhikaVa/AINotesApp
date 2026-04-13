require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const connectDB =require('./config/db')
const Note = require("./models/Note")
const app = express();

app.use(cors());
app.use(express.json());
connectDB ()
// app.post("/generate-summary", async (req, res) => {
// //console.log(req.body.text,'request summary')
//   try {

//     const response = await axios.post(
//         "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
//       {
//         inputs: req.body.text
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_TOKEN}`
//         }
//       }
//     );

//     res.json(response.data);

//   } catch (error) {

//     console.error(error.response?.data || error.message);

//     res.status(500).json({
//       error: "Summary generation failed"
//     });

//   }

// });
app.post("/generate-summary", async (req, res) => {
  
console.log("Incoming summary text:", req.body.text);
  try {

    if (!req.body.text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      {
        inputs: req.body.text.slice(0, 800)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 60000
      }
    );
console.log("response", response.data);
    // res.json(response.data);
res.status(200).json({
  success: true,
  generateSummary: response.data
});
  } catch (error) {

    console.error("HF ERROR:", error.message);

    // res.status(500).json({
    //   error: "Summary generation failed"
    // });
    res.status(500).json({
  success: false,
  message: "Summary generation failed",
  data:[]
});
    //  res.json({
    //     success: false,
    //     message: "Summary generation failed",
    //     data: []
    //   });

  }

});

app.post("/generate-title", async (req, res) => {

    try {
  
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
        {
          inputs: `Generate a very short title (max 6 words): ${req.body.text}`
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log(response.data,'titlelllllllllll');
  
      res.json(response.data);
  
    } catch (error) {
  
      console.error("HF ERROR:", error.response?.data || error.message);
  
      res.status(500).json({
        error: "Title generation failed"
      });
  
    }
  
  });


  app.post("/generate-tags", async (req, res) => {
console.log(req.body.text,'tags request')
    try {
  
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
        {
          inputs: `Extract keywords from this text:\n${req.body.text}`,
          parameters: {
            max_length: 20
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      res.json(response.data);
  
    } catch (error) {
  
      console.error("HF ERROR:", error.response?.data || error.message);
  
      // res.status(500).json({
      //   error: "Tag generation failed"
      // });
      res.json({
        success: false,
        message: "Tag generation failed",
        data: []
      });
  
    }
  
  });
  app.post("/improve-writing", async (req, res) => {

    try {
  
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
        {
          inputs: `Rewrite this text professionally and clearly:\n${req.body.text}`,
          parameters: {
            max_length: 120
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
  console.log(response.data,'improve')
      res.json(response.data);
  
    } catch (error) {
  
      console.error("HF ERROR:", error.response?.data || error.message);
  
      // res.status(500).json({
      //   error: "Writing improvement failed"
      // });
      res.json({
        success: false,
        message: "Writing improvement failed",
        data: []
      });
    }
  
  });

  // routes

  app.post("/notes", async (req, res) => {
console.log(req.body,'notes for add')
    try {
  
      const note =await new Note(req.body);
    
  
      const savedNote = await note.save();
  console.log(savedNote,'saving ')
      res.json(savedNote);
  
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });

      // res.status(500).json({
      //   error: "Failed to create note",
      //   message:error.message
      // });
  
    }
  
  });

  //  get all notes
  app.get("/notes", async (req, res) => {

    try {
  
      const notes = await Note.find().sort({ createdAt: -1 });
  
      res.json(notes);
  
    } catch (error) {
  
      res.status(500).json({
        error: "Failed to fetch notes"
      });
  
    }
  
  });
  // get notes by Id
  app.get("/notes/:id",async(req,res)=>{
    try {
      const note=await Note.findById(req.params.id)
      if (!note) {
        return res.status(404).json({
          error: "Note not found"
        });
      }
      console.log(note,'serviceeee')
      res.json(note);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch notes by Id"
      });
    }
  })
  // update notes
  app.put("/notes/:id", async (req, res) => {
// console.log(req.params.id,'update',req.body)
    try {
  
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.json(updatedNote);
  
    } catch (error) {
  
      res.status(500).json({
        error: "Update failed"
      });
  
    }
  
  });
  // delete notes
  app.delete("/notes/:id", async (req, res) => {

    try {
  
      await Note.findByIdAndDelete(req.params.id);
  
      res.json({
        message: "Note deleted successfully"
      });
  
    } catch (error) {
  
      res.status(500).json({
        error: "Delete failed"
      });
  
    }
  
  });
app.listen(5000, () =>
  console.log("Server running on port 5000")
);