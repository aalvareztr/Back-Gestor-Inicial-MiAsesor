//Archivo Representante.js

import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Cliente } from "./Cliente.js"; // Mueve la importación aquí

export const Representante = sequelize.define('Representante', {
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    fecha_alta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    clave:{
        type: DataTypes.STRING,
        allowNull: true
    },
    priority:{
        type: DataTypes.TINYINT,
        allowNull:true
    },
    id_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},{tableName:'representantes_legales'});

Representante.belongsTo(Cliente, { foreignKey: 'id_cliente' }); // Corrección aquí
