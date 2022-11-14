import User from "../models/User.js"
import bycrpt from "bcryptjs"

export const register = async (req, res, next) => {
    try{

        const salt = bycrpt.genSaltSync(10);
        const hash = bycrpt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: hash,
        })

        await newUser.save();
        res.status(200).send("New user created successfuly!")

    }catch(err){
        next(err);
    }
}