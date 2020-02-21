import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: ""
  },
  updatedBy: {
    type: String,
    default: "",
  },
  challengeId: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: -1
  },
});

export default mongoose.model("Rating", RatingSchema);

