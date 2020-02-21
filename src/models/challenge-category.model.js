import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChallengeCategorySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: ""
  },
  picture: {
    type: String,
    default: "",
  },
  blob: {
    type: String,
    default: ""
  },
});

export default mongoose.model("ChallengeCategory", ChallengeCategorySchema);

