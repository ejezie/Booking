import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save() ;
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
     try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}) 
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err)
    }
}

export const getHotelById = async (req, res, next) => {
     try{
        const hotel = await Hotel.findById(req.params.id) 
        res.status(200).json(hotel)
    }catch(err){
        next()
    }
}

export const getAllHotels = async (req, res, next) => {
     try{
        const hotels = await Hotel.find() 
        res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try{
        const result = await Hotel.findByIdAndDelete(req.params.id)
        if (result) ( res.status(200).json("Hotel deleted succesfully") )
        else res.send("Id not valid")
    }catch(err){
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city => (
            Hotel.countDocuments({city: city})
        ))) 
    }catch(err){
        next(err)
    }
}