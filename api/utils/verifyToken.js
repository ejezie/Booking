import jwt from "jsonwebtoken";
import { makeError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) (next(makeError(401, 'Sorry, you are not authenticated')))

    jwt.verify(token, process.env.JWT, (err, user) => {

        if(err) (next(makeError(403, 'Invalid Token')));
        req.user = user;
        next();

    })
    
}