import express from "express";
import { getAllHotels, getHotelById, updateHotel, createHotel, deleteHotel } from "../controllers/hotel.js";

const router = express.Router()

// CREATE
router.post("/", createHotel)

// UPDATE
router.put("/:id", updateHotel)

// DELETE
router.delete("/:id", deleteHotel)

// GET
router.get("/:id", getHotelById)

// GET ALL
router.get("/", getAllHotels)

export default router;