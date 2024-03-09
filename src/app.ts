import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {config} from "dotenv"
config()

import appRoutes from "./routes/index.js";

const app = express();


///middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))


//remove it is production server
app.use(morgan("dev"))


app.use("/api/v1/", appRoutes)


app.get("/", (req, res) => {
  return res.send("Welcome to AI Chatbot!")
})



export default app