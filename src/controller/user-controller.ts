import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";

import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";

const getAllUser = async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const users = await User.find();

        return res.status(200).json({message: "OK", users});
    } catch (error) {
        return res.status(500).json({message: "ERROR", cause: error.message});
    }
}

//user sign up
const signup = async(req: Request, res: Response,next: NextFunction )=>{
    try {
        const { name, email, password} = req.body

        const isUser = await User.findOne({ email: email});

        // check user already exists
        if(isUser) {
            return res.status(401).json({message: "User already exists"});
        }

        const hashPassword = await hash(password, 10);
        const newUser = new User({  
            name,
            email,
            password: hashPassword
        })

        const user = await User.create(newUser);
        //create token and store cookie
        const cookieConfig = {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        }
        res.clearCookie(COOKIE_NAME,cookieConfig)

        const token =  createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token , {   
            ...cookieConfig,
            expires,    
        })

        res.status(200).json({message: "Ok", id: user._id.toString()})

    } catch (error) {
        res.status(500).json({message: "ERROR", cause: error.message})
    }
}

//user login
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email: email});
        if(!user) {
            return res.status(401).json({message: "Users don't exist"});
        }

        const isPasswordCorrect = await compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.status(401).json({message: "Email or password is incorrect"});
        }

        //create token and store cookie
        const cookieConfig = {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        }
        res.clearCookie(COOKIE_NAME,cookieConfig)

        const token =  createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token , {   
            ...cookieConfig,
            expires,    
        })
        res.status(200).json({message: "Ok", user , token})


    } catch (error) {
        res.status(500).json({message: "ERROR", cause: error.message})
    }
}


export default {
    getAllUser,
    signup,
    login
}