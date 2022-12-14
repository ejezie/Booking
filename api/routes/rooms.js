import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.get('/', getAllRooms );

router.get('/:id',getRoomById )

router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)

router.put('/:id', verifyAdmin, updateRoom)

router.post('/:hotelId', verifyAdmin,createRoom)


export default router;
