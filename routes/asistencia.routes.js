import Express from "express";
import { createAsistencia, deleteAsistencia, deleteAsistenciasEmpleado, getAsistencias, getAsistenciasByIdDate, updateAsistencia } from "../controllers/asistencia.controller.js";

const router = Express.Router();

//listar todas las asistencias de un dia
router.get('/:fecha', getAsistencias);

//listar todas las asistencias de un empleado entre un rango
router.get('/:id_empleado/:fecha_inicio/:fecha_fin',getAsistenciasByIdDate);

//Registra una nueva asistencia
router.post('/', createAsistencia);

//Actualiza una asistencia
router.put('/:id_asistencia', updateAsistencia);

//Elimina una asistencia
router.delete('/:id_asistencia', deleteAsistencia);

//Elmina las asistencias del empleado
router.delete('/empleado/:id_empleado', deleteAsistenciasEmpleado);

export default router;