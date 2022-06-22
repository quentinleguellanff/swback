import { Router } from "express";
import users from "./users";
import register from "./register"

const api = Router();

api.use("/register", register)

export default api;
