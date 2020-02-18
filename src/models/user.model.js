import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  name:{
    type:String,
    require:true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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
  role: {
    // determines what permissions the user has
    type: [String], // ["ROLE_USER", "ROLE_ADMIN"]
    default: ["ROLE_USER"]
  }


});

export default mongoose.model("Users", SampleSchema);