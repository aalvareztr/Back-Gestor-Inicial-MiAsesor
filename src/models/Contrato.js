import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Cliente } from "./Cliente.js";

export const Contrato = sequelize.define('Contrato', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},{tableName:'contratos'});
  
Contrato.belongsTo(Cliente,{foreignKey:'id_cliente'})
