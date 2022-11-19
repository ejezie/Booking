import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cors from "cors"

dotenv.config();
const app = express();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connection to mongoDB successful!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDb has disconnected")
})

app.get("/", (req, res) => {
    res.send("Consistency is Key!")
})

// Middleware

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorMessage = err.message || "An error has occured";
  const errorStatus = err.status || "500";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connectMongo();
  console.log("Listening on port 8800");
});
