import { Router } from "express";
import { User } from '../../db/sequelize'

const api = Router();

api.post("/login", async (request, response) => {
    if(request.body.email  && request.body.password){
        const userId = await User.findOne(
            {
                attributes: ['id'],
                where: {
                    email: request.body.email,
                    password: request.body.password
                }
            }
        )
        if (!userId) {
            response.status(400).json({
                message : "user not exist"
            })
        }
        else {
            console.log(userId)
            response.status(200).json({
                userId
            })
        }
    }
    else{
        response.status(400).json({
            message : "wrong parameters"
        })
    }
  });
  
  
  
  export default api;
  