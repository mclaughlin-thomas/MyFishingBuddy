import mongoose from "mongoose";
const {Schema} = mongoose;

const fishSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    stats: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true});

export default mongoose.model("Fish",fishSchema)
