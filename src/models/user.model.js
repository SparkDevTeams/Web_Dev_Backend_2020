import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  name:{
    type:String,
    require:true,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique:true,
  },
  password: {
    type: String,
    default: 0
  },


});

export default mongoose.model("Users", SampleSchema);