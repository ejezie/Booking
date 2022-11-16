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
    roomNumber: [{number: Number, unavailableDates: {type: [Date]}}],
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    room: {
        type: String,
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    }
})

export default model("Room", RoomSchema);