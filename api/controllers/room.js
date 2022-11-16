import Room from "../models/Room";
import { makeError } from "../utils/error";

const createRoom = async (req, res, next) => {
    try{
        const room = new Room(req.body);
    }catch(err){
        next(err)
    }
}