const mongoose  = require("mongoose")

const connectDB =async()=>{

    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB Connected ✅"))
      .catch(err => console.log("MongoDB connection failed ❌", err));   
}

module.exports=connectDB