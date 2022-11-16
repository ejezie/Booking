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
