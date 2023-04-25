import Sequelize from "sequelize";
import DB from "../config/db.js";

export const Empleado = DB.define('empleado', {
    id_empleado: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
    ,
    apellido_paterno: {
        type: Sequelize.STRING
    },
    apellido_materno: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    salario_hora: {
        type: Sequelize.FLOAT
    },
    salario_hora_extra: {
        type: Sequelize.FLOAT
    }
}, {
    tableName: "empleado"
})