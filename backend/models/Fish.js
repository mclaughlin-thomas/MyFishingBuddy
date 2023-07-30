import mongoose from "mongoose";
const {Schema} = mongoose;

const fishSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    stats: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true});

export default mongoose.model("Fish",fishSchema)
