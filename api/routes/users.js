import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get('/', getAllUsers)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.get('/:id', getUserById)

router.put('/id', updateUser)

export default router;
