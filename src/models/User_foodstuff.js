export default (sequelize, DataTypes) => {
    return sequelize.define('User_foodstuff', {
      quantity_g: {
        type: DataTypes.INTEGER,
      },
      quantity_l: {
        type: DataTypes.INTEGER,
      },
      number: {
        type: DataTypes.INTEGER,
      }
    }, {

    })
  }