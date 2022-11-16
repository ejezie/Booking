import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { makeError } from "../utils/error.js";

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotellId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try{
        await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
    }catch(err){
        next(err)
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateRoom)
    }catch(err){
        next(err)
    }
}

const getRoomById = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    }catch(err){
        next(err);
    }
}

const getAllRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch(err){
        next(err);
    }
}
