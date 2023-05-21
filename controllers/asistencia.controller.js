import { Op, where } from "sequelize";
import { Empleado } from "../models/empleado.model.js";
import { Asistencia } from "../models/asistencia.model.js";


//Listar todas las asistencias
export const listarAsistencias = async (req, res, next) => {
  try {
    const fecha = (req.params.fecha.substring(0, 10));
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;

    if (regexFecha.test(fecha)) {
      const asistencias = await Asistencia.findAll({
        where: { fecha: fecha },
        include: { model: Empleado, attributes: ['nombre', 'apellido_paterno'] },
        order: [['id_empleado', 'ASC']]
      });
      res.json(asistencias);
    } else {
      return res.status(400).json({ message: "Formato de fecha no válido para consultar" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar las asistencias" });
  }
};

//Traer todas las asistencias de un empleado en un rango de fechas
export const getAsistenciasByIdDate = async (req, res, next) => {
  try {
    const { id_empleado, fecha_inicio, fecha_fin } = req.params;
    const empleadoExistente = await Empleado.findByPk(id_empleado);
    if (!empleadoExistente) {
      return res.status(404).json({ message: 'No se encontró el empleado' });
    }

    const asistencias = await Asistencia.findAll({
      where: {
        id_empleado,
        fecha: {
          [Op.between]: [fecha_inicio, fecha_fin],
        },
      },
    });

    res.json(asistencias);
  } catch (error) {
    return res.status(500).json({ message: 'Error al listar asistencias' });
  }
}

// Crear una nueva asistencia
export const crearAsistencia = async (req, res, next) => {
  const { hora_entrada, hora_salida, fecha, horas_trabajadas, horas_extras, id_empleado } = req.body;

  try {
    // Validar que el empleado existe
    const empleadoExistente = await Empleado.findByPk(id_empleado);
    if (!empleadoExistente) {
      return res.status(404).json({ message: "El empleado especificado no existe" });
    }

    // Crear la asistencia en la base de datos
    const asistenciaCreada = await Asistencia.create({
      hora_entrada,
      hora_salida,
      fecha,
      horas_trabajadas,
      horas_extras,
      id_empleado
    });
    //

    res.status(201).json(asistenciaCreada).json({ message: "La asistencia fue registrada" });
  } catch (error) {
    next(error);
  }
};

// Actualizar una asistencia existente
export const actualizarAsistencia = async (req, res, next) => {
  const { id_asistencia } = req.params;
  const { hora_entrada, hora_salida, fecha, horas_trabajadas, horas_extras, id_empleado } = req.body;

  try {
    const asistenciaExistente = await Asistencia.findByPk(id_asistencia);
    if (!asistenciaExistente) {
      return res.status(404).json({ message: 'No se encontró la asistencia' });
    }

    // Actualizar la asistencia en la base de datos
    const asistenciaActualizada = await asistenciaExistente.update({
      hora_entrada,
      hora_salida,
      fecha,
      horas_trabajadas,
      horas_extras,
      id_empleado
    });

    res.json(asistenciaActualizada);
  } catch (error) {
    return res.status(500).json({ message: 'Error al editar la asistencia' });
  }
};

//elimina una asistencia
export const eliminarAsistencia = async (req, res) => {
  const { id_asistencia } = req.params;

  try {
    const asistenciaExistente = await Asistencia.findByPk(id_asistencia);
    if (!asistenciaExistente) {
      return res.status(404).json({ message: 'No se encontró la asistencia' });
    }

    await asistenciaExistente.destroy();

    res.json({ message: "Asistencia eliminada" });

  } catch (error) {
    return res.status(500).json({ message: "La asistencia no se pudo eliminar" })
  }
}

//Elmina todas las asistencias de un empleado
export const eliminarAsistenciasEmpleado = async (req, res) => {
  const { id_empleado } = req.params;

  try {
    const empleadoExistente = await Empleado.findByPk(id_empleado);
    if (!empleadoExistente) {
      return res.status(404).json({ message: 'No se encontró el empleado' });
    }

    await Asistencia.destroy({ where: { id_empleado } });

    res.json({ message: "Asistencias eliminadas" });

  } catch (error) {
    return res.status(500).json({ message: "Las asistencias no se pudieron eliminar" })
  }
}
