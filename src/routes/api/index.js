import { Router } from "express";
import register from "./register"

const api = Router();

api.use("/register", register)

export default api;
