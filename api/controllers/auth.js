import User from "../models/User.js"

export const register = async (req, res, next) => {
    try{
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        })

        await newUser.save();
        res.satus(200).send("New user created successfuly!")

    }catch(err){
        next(err);
    }
}