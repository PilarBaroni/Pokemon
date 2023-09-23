const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // agregamos validaciones para que cumplan ciertos requisitos
        notEmpty: true,
        len: [1, 60],
      },
   },
    image:{
      type: DataTypes.STRING,
      allowNull:false
   },
   hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // agregamos validaciones para que cumplan ciertos requisitos
        notEmpty: true,
        min: 1, // Debe ser al menos 1
        max: 150, // No puede superar 150
      },
    },
   attack:{
    type: DataTypes.INTEGER,
    allowNull:false
   },
   defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // agregamos validaciones para que cumplan ciertos requisitos
        notEmpty: true,
        min: 1, // Debe ser al menos 1
        max: 150, // No puede superar 150
      },
   },
   speed:{
    type: DataTypes.INTEGER,
    allowNull:false
   },
   height:{
    type: DataTypes.FLOAT,
    allowNull:false
   },
  weight:{
    type: DataTypes.FLOAT,
    allowNull:false
  }
  }, { timestamps: false });
};
