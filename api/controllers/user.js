import User from "../models/User.js"

export const getAllUsers = async (req, res, next) =>  {
    try{
        const users = await User.find()
        res.status(200).send(users)
    }catch(err){
        next(err);
    }
}

import Hotel from "../models/Hotel.js";

export const createUser = async (req, res, next) => {
    const newHotel = new User(req.body);
    try{
        const savedHotel = await newHotel.save() ;
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
     try{
        const updatedHotel = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}) 
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
     try{
        const hotel = await User.findById(req.params.id) 
        res.status(200).json(hotel)
    }catch(err){
        next()
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel deleted succesfully")
    }catch(err){
        next(err)
    }
}