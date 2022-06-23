import { Router } from "express";
import register from "./register"
import login from "./login"
import foodstuff from "./ingredient";

const api = Router();

api.use("/", register)

api.use("/", login)

api.use("/", foodstuff)

export default api;
