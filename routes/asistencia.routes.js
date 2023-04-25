import Express from "express";
import { actualizarAsistencia, crearAsistencia, eliminarAsistencia, listarAsistencias } from "../controllers/asistencia.controller.js";

const router = Express.Router();

//listar todas las asistencias de un dia
router.get('/:fecha', listarAsistencias);

//Registra una nueva asistencia
router.post('/', crearAsistencia);

//Actualiza una asistencia
router.put('/:id_asistencia', actualizarAsistencia);

//Elimina una asistencia
router.delete('/:id_asistencia', eliminarAsistencia);

export default router;