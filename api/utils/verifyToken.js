import { Jwt } from "jsonwebtoken";
import { makeError } from "./error";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) next(makeError('401', 'Sorry, ou are not authenticated'))
}