import {Router} from "express";
import userController from "../controller/user-controller.js";
import  { validate, signupValidation, loginValidation } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";


const userRoutes = Router();

userRoutes.get("/",userController.getAllUser)
userRoutes.post("/signup",validate(signupValidation),userController.signup)
userRoutes.post("/login",validate(loginValidation),userController.login)
userRoutes.post("/auth-status",verifyToken,userController.verifyUser )

export default userRoutes
