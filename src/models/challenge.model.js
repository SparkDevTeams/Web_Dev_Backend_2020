import mongoose from "mongoose";

const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  creatorId: {
    type: String
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_updated: {
    type: Date,
    default: Date.now
  },
  attempt_count: {
    type: Number,
    default: 0
  },
  complete_count: {
    type: Number,
    default: 0  
  },
  categoryId: {
    type: [String]
  },
  reported: {
    type: Boolean
  }, 
  rank: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  average_rating: {
    type: Number,
    default: true
  }
});

export default mongoose.model("Challenge", challengeSchema);
