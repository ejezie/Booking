import express from "express";
import { getAllRooms } from "../controllers/room";
import { verifyAdmin } from "../utils/verifyToken";

const router = express.Router()

router.get('/', verifyAdmin, getAllRooms)


export default router;
