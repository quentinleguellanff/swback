import { Router } from "express";
import { User } from '../../db/sequelize'
import { Op } from "sequelize";

const api = Router();

api.post("/register", async (request, response) => {
    if(request.body.email && request.body.password && request.body.passwordConfirm && request.body.pseudo){
        if(request.body.password !== request.body.passwordConfirm){
            response.status(400).json({
                message : "wrong parameters"
            })
        } else {
            const isUserExist = await User.findOne(
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
                const newUser = await User.create({ email: request.body.email, pseudo: request.body.pseudo, password: request.body.password, image: request.body.image})
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
  