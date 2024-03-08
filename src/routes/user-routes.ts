import {Router} from "express";


const userRoutes = Router();

userRoutes.use("/",(req,res,next)=>{
    res.send("User API")
} )

export default userRoutes
