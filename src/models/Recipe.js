export default (sequelize, DataTypes) => {
    return sequelize.define('Recipe', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      type: {
        type: DataTypes.STRING
      },
      duration_min: {
        type: DataTypes.INTEGER
      },
    }, {

    })
  }