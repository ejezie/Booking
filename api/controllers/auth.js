import User from "../models/User.js"
import bycrpt from "bcryptjs"
import { makeError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try{

        const salt = bycrpt.genSaltSync(10);
        const hash = bycrpt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
        })

        await newUser.save();
        res.status(200).send("New user created successfuly!")

    }catch(err){
        next(err);
    }
}

export const login = async (req, res, next) => {
    try{
        const user = User.findOne(req.body.username)
        if(!user) return next(makeError(404, "user not found"));

        const isPasswordCorect = await bycrpt.compare(req.body.password, user.password);
        if(!isPasswordCorect) return next(makeError(400, "`invalid password or username"))

        res.status(200).json(user);
    }catch(err){
        next(err)
    }
}