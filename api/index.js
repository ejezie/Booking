import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

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

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  return res.status(500).json("Error from handler")
})

app.listen(8800, () => {
  connectMongo();
  console.log("Listening on port 8800");
});
