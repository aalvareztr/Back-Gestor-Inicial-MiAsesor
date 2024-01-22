import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Plan = sequelize.define('Plan', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mes_de_gracia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{tableName:'planes'});
  