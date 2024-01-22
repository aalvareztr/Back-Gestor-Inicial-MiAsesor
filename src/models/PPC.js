import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Contrato } from "./Contrato.js";
import { Plan } from "./Plan.js";


export const PPC = sequelize.define('PPC', {
    id_contrato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_plan: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},{tableName:'planes_por_contrato'});
  

PPC.belongsTo(Contrato,{foreignKey:'id_contrato'});
PPC.belongsTo(Plan,{foreignKey:'id_plan'})
//PPC.belongsTo(Cliente,{foreignKey:'id_cliente'})

//Contrato.belongsTo(Cliente,{foreignKey:'id_cliente'})