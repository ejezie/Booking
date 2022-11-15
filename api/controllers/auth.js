import User from "../models/User.js"
import bycrpt from "bcryptjs"
import { makeError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(makeError(404, "user not found"));

        const isPasswordCorect = await bycrpt.compare(req.body.password, user.password);
        if(!isPasswordCorect) return next(makeError(400, "`invalid password or username"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, isAdmin, ...others} = user._doc;

        res.cookies("access_token", token, {httpOnly: true,}).status(200).json({others});
    }catch(err){
        next(err)
    }
}