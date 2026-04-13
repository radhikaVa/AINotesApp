const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    tag:{
        type:[String]
    },
    summary:{
        type:String
    },
    improvedContent:{
        type:String
    }

},{ timestamps: true })

module.exports=mongoose.model("Note",noteSchema)