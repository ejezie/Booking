import mongoose from "mongoose";

const {Schema, model} = mongoose;

const RoomSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    price : {
        type: Number ,
        required: true,
    }, 
    desc: {
        type: String,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}],
    photos: {
        type: [String],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
})

export default model("Room", RoomSchema);