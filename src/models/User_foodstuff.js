export default (sequelize, DataTypes) => {
    return sequelize.define('User_foodstuff', {
      quantity_g: {
        type: DataTypes.INTEGER,
      },
      quantity_cl: {
        type: DataTypes.INTEGER,
      },
      number: {
        type: DataTypes.INTEGER,
      }
    }, {

    })
  }