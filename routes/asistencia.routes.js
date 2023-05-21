import Express from "express";
import { actualizarAsistencia, crearAsistencia, eliminarAsistencia, listarAsistencias, eliminarAsistenciasEmpleado, getAsistenciasByIdDate} from "../controllers/asistencia.controller.js";

const router = Express.Router();

//listar todas las asistencias de un dia
router.get('/:fecha', listarAsistencias);

//listar todas las asistencias de un empleado entre un rango
router.get('/:id_empleado/:fecha_inicio/:fecha_fin',getAsistenciasByIdDate);

//Registra una nueva asistencia
router.post('/', crearAsistencia);

//Actualiza una asistencia
router.put('/:id_asistencia', actualizarAsistencia);

//Elimina una asistencia
router.delete('/:id_asistencia', eliminarAsistencia);

//Elmina las asistencias del empleado
router.delete('/empleado/:id_empleado', eliminarAsistenciasEmpleado);

export default router;