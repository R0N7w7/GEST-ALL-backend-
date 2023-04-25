import Sequelize from "sequelize";
import DB from "../config/db.js";
import { Empleado } from "./empleado.model.js";

export const Asistencia = DB.define('asistencia', {
    id_asistencia: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    hora_entrada: {
        type: Sequelize.TIME
    }
    ,
    hora_salida: {
        type: Sequelize.TIME
    },
    fecha: {
        type: Sequelize.DATEONLY
    },
    horas_trabajadas: {
        type: Sequelize.FLOAT
    },
    horas_extras: {
        type: Sequelize.FLOAT
    },
    id_empleado: {
        type: Sequelize.INTEGER,
        references: {
            model: Empleado,
            key: 'id_empleado'
        }
    }
}, {
    tableName: "asistencia"
});

Asistencia.belongsTo(Empleado, { foreignKey: 'id_empleado' });