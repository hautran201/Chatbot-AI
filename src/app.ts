import express from "express";
import {config} from "dotenv"
config()
import morgan from "morgan";
import appRoutes from "./routes/index.js";

const app = express();


///middleware
app.use(express.json());

//remove it is production server
app.use(morgan("dev"))


app.use("/api/v1/", appRoutes)


app.get("/", (req, res) => {
  return res.send("Welcome to AI Chatbot!")
})



export default app