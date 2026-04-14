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
 const summary= async(text,res) =>{
  
  if (!text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    const response = await axios.post(
    "https://router.huggingface.co/v1/chat/completions",
	
   {
     model: "MiniMaxAI/MiniMax-M2.7:novita",
    messages: [
        {
            role: "user",
            content: JSON.stringify(text),
        },
    ],
   


      }, {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
          timeout: 120000
      },
     
    );
console.log("response", response.data.choices[0].message.content);
    
res.status(200).json({
  success: true,
  generateSummary: response.data.choices[0].message.content
});
  }

app.post("/generate-summary", async (req, res) => {
  
console.log("Incoming summary text:", req.body.text);
  try {
//summary(req.body.text,res)
    if (!req.body.text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    const response = await axios.post(
   "https://router.huggingface.co/v1/chat/completions",
	
   {
     model: "HuggingFaceH4/zephyr-7b-beta:featherless-ai",
    messages: [
        {
            role: "user",
            content: JSON.stringify(req.body.text),
        },
    ],
   


      }, {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
          timeout: 200000
      },
     
    );
console.log("response", response.data.choices[0].message.content);
    
// res.status(200).json({
//   success: true,
//   generateSummary: response.data
// });
res.status(200).json({
  success: true,
  generateSummary:
    response.data.choices[0].message.content
});
 
 } catch (error) {

    console.error("HF ERROR:", error.message);
// if(error.message==="read ECONNRESET"){
// summary(req.body.text,res)
// }else{
 res.status(500).json({
  success: false,
  message: "Summary generation failed",
  data:[]
});
//}
   
   
  }

});

app.post("/generate-title", async (req, res) => {

    try {
  
      const response = await axios.post(
       "https://router.huggingface.co/v1/chat/completions",
        
      {
        model: "HuggingFaceH4/zephyr-7b-beta:featherless-ai",
        max_tokens: 15,
temperature: 0.4,
top_p: 0.9,
   messages: [
  {
    role: "system",
    content:
      "You generate titles only. Respond with ONE short title under 6 words. No explanation."
  },
  {
    role: "user",
    content: req.body.text.slice(0, 1200)
  }
]
      },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      //console.log(response.data,'titlelllllllllll',response.data.choices[0].message.content);
  
let title = response.data.choices[0].message.content.trim();

if (
  !title ||
  title.toLowerCase().includes("generate a short title")
) {
  title = "Untitled Note";
}

console.log(title, "titlelllllllllll");

       res.status(200).json({
  success: true,
  title:title
       })
  
    } catch (error) {
  
      console.error("HF ERROR:", error.response?.data || error.message);
  
      res.status(500).json({
        error: "Title generation failed"
      });
  
    }
  
  });
// app.post("/generate-title", async (req, res) => {

//     try {
  
//       const response = await axios.post(
//         "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
//         {
//           inputs: `Generate a short title:\n${req.body.text.substring(0, 600)}`
//       },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.HF_TOKEN}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
  
//       console.log(response.data,'titlelllllllllll');
  
//       res.json(response.data);
  
//     } catch (error) {
  
//       console.error("HF ERROR:", error.response?.data || error.message);
  
//       res.status(500).json({
//         error: "Title generation failed"
//       });
  
//     }
  
//   });


//   app.post("/generate-tags", async (req, res) => {
// console.log(req.body.text,'tags request')
//     try {
//   //"https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
//       const response = await axios.post(
//         "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
//        //"https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
//         {
//           inputs: `Extract keywords from this text:\n${req.body.text}`,
//           parameters: {
//             max_length: 20
//           }
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.HF_TOKEN}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
  
//       res.json(response.data);
//       console.log(response.data,'response.data------tags')
  
//     } catch (error) {
  
//       console.error("HF ERROR:", error.response?.data || error.message);
  
//       // res.status(500).json({
//       //   error: "Tag generation failed"
//       // });
//       res.json({
//         success: false,
//         message: "Tag generation failed",
//         data: []
//       });
  
//     }
  
//   });
  
// app.post("/generate-tags", async (req, res) => {

//   try {
//  console.log(req.body.text,'req.body.text');
//     const response = await axios.post(
//      // "https://router.huggingface.co/models/facebook/bart-large-mnli",
    
//       "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli",
//       {
//         inputs: req.body.text,

//         parameters: {
//           candidate_labels: [
//             "react",
//             "javascript",
//             "ai",
//             "notes",
//             "frontend",
//             "backend",
//             "learning",
//             "career",
//             "productivity"
//           ]
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_TOKEN}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );
//     const tags = response.data.slice(0, 6).map(item => item.label);

// console.log(tags,'response.data.labels-----')
//     res.json({
//       success: true,
//       data:tags
//       //data: response.data.labels.slice(0, 5)
//     });

//   } catch (error) {

//     console.error("HF ERROR:", error.response?.data || error.message);

//     res.json({
//       success: false,
//       message: "Tag generation failed",
//       data: []
//     });

//   }

// });

app.post("/generate-tags", async (req, res) => {

  try {

    if (!req.body.text) {
      return res.json({
        success: false,
        message: "Text required",
        data: []
      });
    }

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/ml6team/keyphrase-extraction-kbir-inspec",
      {
        inputs: JSON.stringify(req.body.text)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
console.log(response.data,'response.data-------------')
    const tags = response.data.map(item => item.word);

    res.json({
      success: true,
      data: tags
    });

  } catch (error) {

    console.error("HF ERROR:", error.response?.data || error.message);

    res.json({
      success: false,
      message: "Tag generation failed",
      data: []
    });

  }

});

app.post("/improve-writing", async (req, res) => {

    try {
  
      // const response = await axios.post(
      //   "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      //   {
      //     inputs: `Rewrite this text professionally and clearly:\n${req.body.text}`,
      //     parameters: {
      //       max_length: 120
      //     }
      //   },
       const response = await axios.post(
   "https://router.huggingface.co/v1/chat/completions",
	
   {
     model: "HuggingFaceH4/zephyr-7b-beta:featherless-ai",
    messages: [
        {
            role: "user",
            content: `Summarize this text professionally and clearly in 5 short sentences:\n${JSON.stringify(req.body.text)}` ,
        },
    ],
   }, 
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
  console.log(response.data,'improve')
      // res.json(response.data);
      res.status(200).json({
  success: true,
  improvedContent:
    response.data.choices[0].message.content
});
  
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