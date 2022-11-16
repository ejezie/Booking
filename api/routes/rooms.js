import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.get('/', getAllRooms );

router.get('/:id',getRoomById )

router.delete('/:id', verifyAdmin, deleteRoom)

router.put('/:id', verifyAdmin, updateRoom)

router.post('/:id', verifyAdmin,createRoom)


export default router;
