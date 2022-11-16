import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.get('/', getAllUsers)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.get('/:id', getUserById)

router.put('/:id', updateUser)

router.get ("/checkAuth", verifyToken, (req, res, next) => {
    res.send("hello")
});
router.get ("/checkUser", verifyUser, (req, res, next) => {
    res.send("hello, welcome, you can delete your account!")
});

export default router;
