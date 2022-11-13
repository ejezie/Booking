import Hotel from "../models/Hotel"

export const register = (req, res, next) => {
    try{
        const newUser = new Hotel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        })
    }catch(err){
        next(err);
    }
}