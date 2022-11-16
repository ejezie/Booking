import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.get('/', getAllUsers)

// router.post('/', createUser)

router.delete('/:id', deleteUser)

router.get('/:id', verifyUser, getUserById)

router.put('/:id', verifyUser, updateUser)

// router.get("/checkAuth", verifyToken, (req, res, next) => {
//     res.send("hello")
// });
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//     res.send("hello, welcome, you can delete your account!")
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello, welcome, you are an admin!")
// });

export default router;
