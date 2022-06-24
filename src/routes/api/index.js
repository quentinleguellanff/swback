import { Router } from "express";
import register from "./register"
import login from "./login"
import foodstuff from "./ingredient";
import recipe from "./recipe"

const api = Router();

api.use("/", register)

api.use("/", login)

api.use("/", foodstuff)

api.use("/", recipe)

export default api;
