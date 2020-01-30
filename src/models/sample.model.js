import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  // String array field, with validation.
  authors: {
    type: [
      {
        type: String,
        default: ""
      }
    ],
    default: []
  }
});

export default mongoose.model("Sample", SampleSchema);
