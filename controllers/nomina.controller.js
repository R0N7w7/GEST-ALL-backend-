import { Op, where } from "sequelize";
import { Empleado } from "../models/empleado.model.js";
import { Asistencia } from "../models/asistencia.model.js";
import { Nomina } from "../models/nomina.model.js";

//Crea una nueva Nomina con campos por defecto
export const createNomina = async (req, res) => {
    try {
        const { id_empleado } = req.params;
        const empleado = await Empleado.findByPk(id_empleado);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        const fecha = new Date();
        const fecha_fin = new Date(fecha);
        const fecha_inicio = new Date();
        fecha_inicio.setDate(fecha_fin.getDate() - 7);

        const asistencias = await Asistencia.findAll({
            where: {
                id_empleado: id_empleado,
                fecha: { [Op.between]: [fecha_inicio, fecha_fin] }
            }
        });

        const salario_base = asistencias.reduce((total, asistencia) => {
            const horas_trabajadas = asistencia.horas_trabajadas;
            const salario_hora = empleado.salario_hora;
            return total + (horas_trabajadas * salario_hora);
        }, 0);

        const salario_extra = asistencias.reduce((total, asistencia) => {
            const horas_extras = asistencia.horas_extras;
            const salario_hora_extra = empleado.salario_hora_extra;
            return total + (horas_extras * salario_hora_extra);
        }, 0);

        const descuento = 0;
        const bono = 0;
        const total = salario_base + salario_extra;

        const nomina = await Nomina.create({
            fecha_inicio,
            fecha_fin,
            salario_base,
            salario_extra,
            descuento,
            bono,
            total,
            id_empleado
        });

        return res.status(201).json({ message: 'Nomina creada exitosamente', nomina });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear la nomina' });
    }
};


// Obtener todas las nóminas
export const getNominas = async (req, res) => {
    try {
        const nominas = await Nomina.findAll({ include: { model: Empleado, attributes: ['nombre', 'apellido_paterno'] } });
        res.status(200).json({ data: nominas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las nóminas", error: error });
    }
};

//Obtener nominas por rango de fecha
export const getNominasRange = async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.params;
    try {
        const nominas = await Nomina.findAll({
            where: {
                fecha_inicio: {
                    [Op.eq]: fecha_inicio
                },
                fecha_fin: {
                    [Op.eq]: fecha_fin
                },
                include: {
                    model: Empleado, attributes: ['nombre', 'apellido_paterno']
                }
            }
        });
        res.status(200).json({ data: nominas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las nóminas", error: error });
    }
};


// Obtener una nómina por ID
export const getNominaById = async (req, res) => {
    try {
        const { id_nomina } = req.params;
        const nomina = await Nomina.findByPk(id_nomina);
        if (!nomina) {
            return res.status(404).json({ message: "Nomina no encontrada" });
        }
        res.status(200).json({ data: nomina });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener la nómina", error: error });
    }
};

// Actualizar una nómina
// Actualizar una nómina
export const updateNomina = async (req, res) => {
    try {
        const { id_nomina } = req.params;
        const nomina = await Nomina.findByPk(id_nomina);
        if (!nomina) {
            return res.status(404).json({ message: "Nomina no encontrada" });
        }

        const empleado = await Empleado.findByPk(nomina.id_empleado);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        const asistencias = await Asistencia.findAll({
            where: {
                id_empleado: empleado.id_empleado,
                fecha: { [Op.between]: [nomina.fecha_inicio, nomina.fecha_fin] }
            }
        });

        const salario_base = asistencias.reduce((total, asistencia) => {
            const horas_trabajadas = asistencia.horas_trabajadas;
            const salario_hora = empleado.salario_hora;
            return total + (horas_trabajadas * salario_hora);
        }, 0);

        const salario_extra = asistencias.reduce((total, asistencia) => {
            const horas_extras = asistencia.horas_extras;
            const salario_hora_extra = empleado.salario_hora_extra;
            return total + (horas_extras * salario_hora_extra);
        }, 0);

        const { descuento, bono } = req.body;
        const total = Number(salario_base) + Number(salario_extra) - Number(descuento) + Number(bono);

        const updatedNomina = await nomina.update({
            salario_base: salario_base,
            salario_extra: salario_extra,
            descuento: descuento,
            bono: bono,
            total: total,
        });
        res.status(200).json({ message: "Nomina actualizada exitosamente", data: updatedNomina });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la nomina", error: error });
    }
}


// Eliminar una nómina
export const deleteNomina = async (req, res) => {
    try {
        const { id_nomina } = req.params;
        const nomina = await Nomina.findByPk(id_nomina);
        if (!nomina) {
            return res.status(404).json({ message: "Nomina no encontrada" });
        }
        await nomina.destroy();
        res.status(200).json({ message: "Nomina eliminada exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la nomina", error: error });
    }
};