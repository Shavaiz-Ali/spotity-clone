import mongoose from "mongoose";


const albumSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    bgColor:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});


const album = mongoose.model.album || mongoose.model("Album", albumSchema);
export default album