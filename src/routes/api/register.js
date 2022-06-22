import { Router } from "express";
import { user } from '../../db/sequelize'
import { Op } from "sequelize";

const api = Router();

api.post("/", async (request, response) => {
    const users = await user.findAll()
    if(request.body.email && request.body.password && request.body.passwordConfirm && request.body.pseudo){
        if(request.body.password !== request.body.passwordConfirm){
            response.status(400).json({
                message : "wrong parameters"
            })
        } else {
            const isUserExist = await user.findOne(
                {
                    where: {
                        [Op.or]: [
                            {email: request.body.email}, 
                            {pseudo: request.body.pseudo}
                        ]
                    }
                }
            )
            if (isUserExist) {
                response.status(400).json({
                    message : "user already exist"
                })
            }
            else {
                const newUser = await user.create({ email: request.body.email, pseudo: request.body.pseudo, password: request.body.password, image: request.body.image})
                response.status(201).json({
                    newUser
                  })
            }
        }
    }
    else{
        response.status(400).json({
            message : "wrong parameters"
        })
    }
  });
  
  
  
  export default api;
  