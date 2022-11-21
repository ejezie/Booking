import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next();
  }
};

export const getAllHotels = async (req, res, next) => {

  const { min, max, ...others} = req.query();

  try {
    const hotels = await Hotel.find({...others, cheapestPrice}).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const result = await Hotel.findByIdAndDelete(req.params.id);
    if (result) res.status(200).json("Hotel deleted succesfully");
    else res.send("Id not valid");
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city: city }))
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
   
  try {
    const hotelCount = await Hotel.countDocuments({type: "hotel"})
    const appartmentCount = await Hotel.countDocuments({type: "appartment"})
    const resortCount = await Hotel.countDocuments({type: "resort"})
    const villaCount = await Hotel.countDocuments({type: "villa"})
    const cabinCount = await Hotel.countDocuments({type: "cabin"})
    res.status(200).json([
        {type: 'hotel', count: hotelCount},
        {type: 'appartment', count: appartmentCount},
        {type: 'resort', count: resortCount},
        {type: 'villa', count: villaCount},
        {type: 'cabin', count: cabinCount},
    ]);
  } catch (err) {
    next(err);
  }
};
