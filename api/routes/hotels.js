import express from "express";
import { getAllHotels, getHotelById, updateHotel, createHotel, deleteHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

// CREATE
router.post("/", verifyAdmin, createHotel)

// UPDATE
router.put("/:id", verifyAdmin, updateHotel)

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

// GET
router.get("/:id", getHotelById)

// GET ALL
router.get("/", getAllHotels)
router.get("/countByCity", getAllHotels)
router.get("/countByType", getAllHotels)

export default router;