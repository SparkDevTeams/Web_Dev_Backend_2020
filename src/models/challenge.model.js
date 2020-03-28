import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    creatorId: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
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
    reported: {
        type: Boolean,
        default: false
    },
    rank: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    averagerRating: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Challenge", ChallengeSchema);