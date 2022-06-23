import { Sequelize, DataTypes } from 'sequelize'
import userModel from '../models/User'
import foodstuffModel from '../models/Foodstuff'
import userFoodStuffModel from '../models/User_foodstuff'
import recipeModel from '../models/Recipe' 
import categoryModel from '../models/category'
import recipeFoodstuffModel from '../models/recipe_foodstuff'

const sequelize = new Sequelize('postgres://swuser:efrei2022*@51.75.251.166:5432/swBACKEND')

sequelize.authenticate()
    .then(_ => console.log('Connection has been established successfully.'))
    .catch(error => console.log(`Unable to connect to the database ${error}`))

const User = userModel(sequelize,DataTypes)
const Foodstuff = foodstuffModel(sequelize,DataTypes)
const User_foodstuff = userFoodStuffModel(sequelize,DataTypes)
const Recipe = recipeModel(sequelize,DataTypes)
const Category = categoryModel(sequelize,DataTypes)
const Recipe_foodstuff = recipeFoodstuffModel(sequelize,DataTypes)

User.hasMany(Recipe)
User.belongsToMany(Foodstuff, { through: User_foodstuff})
Foodstuff.belongsToMany(User, {through: User_foodstuff })
Foodstuff.belongsToMany(Category, { through: 'foodstuffs_category' })
Category.belongsToMany(Recipe, { through: Recipe_foodstuff })

const initDb = async () => {
    try {
        return await sequelize.sync({force: true})
    } catch (error) {
        console.log('Unable to connect to the database:', error)
    }
}

export {sequelize, User, Foodstuff, User_foodstuff, Recipe, Category, Recipe_foodstuff, initDb};