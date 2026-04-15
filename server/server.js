require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const connectDB =require('./config/db')
const Note = require("./models/Note")
const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
connectDB ()
 async function generateTitle(noteText) {

	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${process.env.HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				model: "meta-llama/Llama-3.1-8B-Instruct:novita",

				max_tokens: 12,
				temperature: 0.3,

				messages: [
					{
						role: "system",
						content:
							"Generate ONLY a short title under 6 words describing the topic. No explanation. No prefixes. No questions."
					},
					{
						role: "user",
						content: noteText.slice(0, 800)
					}
				]
			}),
		}
	);

	const result = await response.json();
 

	let title =
		result?.choices?.[0]?.message?.content?.trim() ||
		"Untitled Note";
 console.log(title,'rrrrrrrrrrrr')
	// cleanup prefixes if model adds them
	title = title.replace(/^\[.*?\]\s*/, "");
	title = title.replace(/^assistant:\s*/i, "");

	return title;
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
      max_tokens: 150,
      temperature: 0.3,
    messages: [
      {
          role: "system",
          content:
            "Summarize the following text into a short paragraph. Return only the summary. No interviewer labels. No assistant labels. No dialogue."
        },
        {
            role: "user",
            content: JSON.stringify(req.body.text.slice(0, 2000)),
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
    
let summary =
  response?.data?.choices?.[0]?.message?.content?.trim() || "";

summary = summary.replace(/\[INTERVIEWER\].*/gi, "");
summary = summary.replace(/\[ASSISTANT\].*/gi, "");
summary = summary.replace(/\[USER\].*/gi, "");
res.status(200).json({
  success: true,
  generateSummary:summary
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

		if (!req.body.text?.trim()) {
			return res.status(400).json({
				success: false,
				message: "Text required"
			});
		}

		const title = await generateTitle(req.body.text);

		res.json({
			success: true,
			title:title
		});

	} catch (error) {

		console.error(error);

		res.status(500).json({
			success: false,
			message: "Title generation failed"
		});

	}

});
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
   
     // Step 1: extract words
    let tags = response.data.map(item => item.word);

    // Step 2: normalize (lowercase + trim)
    tags = tags.map(tag => tag.toLowerCase().trim());

    // Step 3: remove duplicates
    tags = [...new Set(tags)];

    // Step 4: optional limit (recommended)
   // tags = tags.slice(0, 6);
   tags = tags.filter(
  (tag, index, self) =>
    !self.some(
      other =>
        other !== tag &&
        other.includes(tag)
    )
);

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
// create new note
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
       
         { returnDocument: "after" , runValidators: true}
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});