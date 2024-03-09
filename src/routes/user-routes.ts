import {Router} from "express";
import userController from "../controller/user-controller.js";
import  { validate, signupValidation, loginValidation } from "../utils/validators.js";


const userRoutes = Router();

userRoutes.get("/",userController.getAllUser)
userRoutes.post("/signup",validate(signupValidation),userController.signup)
userRoutes.post("/login",validate(loginValidation),userController.login)

export default userRoutes
