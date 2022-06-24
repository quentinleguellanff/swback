import { Router } from "express";
import { Recipe, Category, Recipe_foodstuff } from "../../db/sequelize";

const api = Router();

api.post("/recipe", async (request, response) => {
    if(request.body.name && request.body.image && request.body.description && request.body.type && request.body.duration && request.body.ingredients){
        const recipe = await Recipe.findOne({ where: {name: request.body.name} })
        if(!recipe){
            recipe = await Recipe.create({
                name: request.body.name,
                image: request.body.image,
                type: request.body.type,
                description: request.body.description,
                duration_min: request.body.duration,
            })
        }
        const ingredientsToAdd = request.body.ingredients

        ingredientsToAdd.forEach(async ingredient => {
            
            let ingredientsToAdd = await Category.findOne({ where : {name: ingredient.name } })
            
            await recipe.addCategory(ingredientsToAdd, { through: { number: ingredient.number, quantity_g: ingredient.quantity_g} })
        });

        response.json("ok")
    }
    else{
        response.json("pas ok")
    }
})

export default api;
