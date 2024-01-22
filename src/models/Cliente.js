
//Archivo Cliente.js

import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Cliente = sequelize.define('Cliente', {
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    domicilio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    giro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    regimen_tributario: {
      type: DataTypes.STRING,
      allowNull: true,
    }
},{tableName:'clientes'});
  

