import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/auth";
import userRouters from "./routes/users";

config();

const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello World From Server!",
  });
});
app.use("/auth", authRoutes);
app.use("/users", userRouters);

const server = http.createServer(app);

const startServer = () => {
  try {
    mongoose.Promise = Promise;
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to Mongo"))
      .catch((error) => {
        console.error(`Failed to connect with MongoDB: ${error}`);
      });
    server.listen(8080, () => {
      console.log("Server running on http://localhost:8080/");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
