import { Router } from "express";
import { Category, Foodstuff } from '../../db/sequelize'
import { User } from '../../db/sequelize'
import { User_foodstuff } from "../../db/sequelize";

const api = Router();

api.post("/ingredient", async (request, response) => {
    if(request.body.userId && request.body.product_name && request.body.image && request.body.categories){
        
        const loggedUser = await User.findOne({ where: {id: request.body.userId} })
        
        let foodStuffToAdd = await isFoodStuffExist(request.body.product_name)
        if(!foodStuffToAdd){
            foodStuffToAdd = await createFoodStuff(request.body.product_name, request.body.image, loggedUser)
        }

        await loggedUser.addFoodstuff(foodStuffToAdd, {through: User_foodstuff})

        const categoriesToAdd = request.body.categories

        categoriesToAdd.forEach(async category => {
            
            let categoryToAdd = await isCategoryExist(category)
            
            if(!categoryToAdd){
                categoryToAdd = await Category.create(category)
            }
            await foodStuffToAdd.addCategory(categoryToAdd, { through: 'foodstuffs_category' })
        });
        

        response.json({
            meesage: "created"
        })
    }
    else{
        response.status(400).json({
            message : "wrong parameters"
        })
    }
  });


api.get("/:userid/ingredients", async (request, response) => {
    const userId = request.params.userid;
    console.log(userId)

    const userFoodstuffs = await Foodstuff.findAll({
        attributes: ['id','name','image'],
        include: [
            {
                model: User,
                where: {
                    id: userId
                },
                attributes: []
            }
        ]
    })
    
    response.json({
        userFoodstuffs
    })
  });

const isFoodStuffExist = async (product_name) => {
    return await Foodstuff.findOne(
        {
            where: {
                name: product_name
            }
        }
    )
}

const isCategoryExist = async (category) => {
    return await Category.findOne(
        {
            where : category
        }
    )
}

const createFoodStuff = async (product_name,image) => {
    const newFoodStuff = await Foodstuff.create({ name: product_name, image: image})
    return newFoodStuff
}

  export default api;
  