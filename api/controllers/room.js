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
  } catch (err) {
    next(err);
  }
};
