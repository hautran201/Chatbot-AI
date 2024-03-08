import {Router} from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";


const appRoutes = Router();

appRoutes.use("/users", userRoutes)
appRoutes.use("/chats", chatRoutes)

export default appRoutes
