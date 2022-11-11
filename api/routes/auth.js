import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("auth!")
})
router.get("/register", (req, res) => {
    res.send("auth register to it")
})

export default router;