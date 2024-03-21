import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
const app = express();
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser";
import authRoute from './Routes/AuthRoute.js'
const { MONGODB_URL, PORT } = process.env;

connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(json());

app.use("/", authRoute);