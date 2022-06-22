import { Sequelize, DataTypes } from 'sequelize'
import userModel from '../models/User'
import foodstuffModel from '../models/Foodstuff'
import userFoodStuffModel from '../models/User_foodstuff'
import recipeModel from '../models/Recipe'

const sequelize = new Sequelize('postgres://swuser:efrei2022*@51.75.251.166:5432/swBACKEND')

sequelize.authenticate()
    .then(_ => console.log('Connection has been established successfully.'))
    .catch(error => console.log(`Unable to connect to the database ${error}`))

const user = userModel(sequelize,DataTypes)
const foodstuff = foodstuffModel(sequelize,DataTypes)
const user_foodstuff = userFoodStuffModel(sequelize,DataTypes)
const recipe = recipeModel(sequelize,DataTypes)

/*
const initDb = async () => {
    try {
        return await sequelize.sync({force: true})
    } catch (error) {
        console.log('Unable to connect to the database:', error)
    }
}
*/

export {sequelize, user, foodstuff, user_foodstuff, recipe};