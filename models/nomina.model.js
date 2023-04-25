import Sequelize from "sequelize";
import DB from "../config/db.js";
import { Empleado } from "./empleado.model.js";

export const Nomina = DB.define('nomina', {
    id_nomina: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fecha_inicio: {
        type: Sequelize.DATEONLY
    },
    fecha_fin: {
        type: Sequelize.DATEONLY
    },
    salario_base: {
        type: Sequelize.FLOAT
    },
    salario_extra: {
        type: Sequelize.FLOAT
    },
    descuento: {
        type: Sequelize.FLOAT
    },
    bono: {
        type: Sequelize.FLOAT
    },
    total: {
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
    tableName: "nomina"
});

Nomina.belongsTo(Empleado, { foreignKey: 'id_empleado' });