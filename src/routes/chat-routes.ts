import {Router} from "express";


const chatRoutes = Router();

chatRoutes.use("/",(req,res,next)=>{
    res.send("Chat API")
} )

export default chatRoutes
