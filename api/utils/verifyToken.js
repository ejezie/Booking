import jwt from "jsonwebtoken";
import { makeError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) next(makeError(401, "Sorry, you are not authenticated"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) next(makeError(403, "Invalid Token"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(makeError(403, "You are not authorised"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(makeError(403, "You are not an admin"));
    }
  });
};
